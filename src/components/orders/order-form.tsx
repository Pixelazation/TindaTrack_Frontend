import { useEffect, useState } from 'react';
import { createOrder, editOrder, fetchOrderPurchases } from '../../api/orders';
import type { Order } from '../../types/order';
import { Button } from '../ui/button';
import { DialogTitle } from '../ui/dialog';
import { Form } from '../ui/form';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { type Purchase } from '../../types/purchase';
import { ComboBox } from '../ui/combo-box';
import { DatePicker } from '../ui/date-picker';
import { Label } from '../ui/label';
import PurchaseForm from './purchase-form';
import PurchaseItem from './purchase-item';
import type { FormProps } from '../../interfaces/form';
import { type Account } from '../../types/account';
import type { Salesman } from '../../types/salesman';
import { fetchAccounts } from '../../api/accounts';
import { fetchSalesmen } from '../../api/salesmen';

const orderFormSchema = z.object({
  accountId: z.number().int().positive({
    message: "Please select an account.",
  }),
  salesmanId: z.number().int().positive({
    message: "Please select a salesman.",
  }),
  date: z.date().max(new Date(), {
    message: "Date cannot be in the future.",
  }),
})

export default function OrderForm(props: FormProps<Order>) {
  const { closeForm, item: order } = props;
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const [accountQuery, setAccountQuery] = useState<string>(order?.accountName || "");
  const [accountSuggestions, setAccountSuggestions] = useState<Account[]>([]);

  const [salesmanQuery, setSalesmanQuery] = useState<string>(order?.salesmanName || "");
  const [salesmanSuggestions, setSalesmanSuggestions] = useState<Salesman[]>([]);

  const isEdit = order !== null;

  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: isEdit ? {
      accountId: order.accountId,
      salesmanId: order.salesmanId,
      date: new Date(order.date),
    } : {
      accountId: 0,
      salesmanId: 0,
      date: undefined,
    },
  });

  useEffect(() => {
    async function retrievePurchases(id: number) {
      const purchaseList = await fetchOrderPurchases(id);
      if (purchaseList) setPurchases(purchaseList);
    }
    
    if (isEdit) retrievePurchases(order.id);
  }, [])

  useEffect(() => {
    async function loadAccountSuggestions() {
      try {
        const data = await fetchAccounts(1, 5, accountQuery, "name");
        setAccountSuggestions(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    }
    loadAccountSuggestions();
  }, [accountQuery])

  useEffect(() => {
    async function loadSalesmanSuggestions() {
      try {
        const data = await fetchSalesmen(1, 5, salesmanQuery);
        setSalesmanSuggestions(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    }
    loadSalesmanSuggestions();
  }, [salesmanQuery])

  async function onSubmit(values: z.infer<typeof orderFormSchema>) {
    console.log("Form submitted with values:", values);

    const purchaseData = purchases.map(purchase => ({
      itemId: purchase.item.id,
      quantity: purchase.quantity,
      unitPrice: purchase.unitPrice,
    }));

    try {
      if (isEdit)
        await editOrder(order.id, {purchases: purchaseData, ...values});
      else
        await createOrder({purchases: purchaseData, ...values});
    } catch (error) {
      console.error("Failed to create order:", error);
    }

    closeForm();
  }

  function removePurchase(purchase: Purchase) {
    setPurchases(purchases.filter(p => p != purchase))
  }

  const totalAmount = purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0);

  return (
    <>
      <DialogTitle className="text-3xl font-bold mb-4">
        {isEdit ? 'Edit' : 'Create New'} Order
      </DialogTitle>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-h-128 pr-4 flex flex-col space-y-6 overflow-y-scroll">

          <div className="grow">
            <Label className='mb-2'>Account</Label>
            <div className='flex flex-row'>
              <ComboBox 
                options={accountSuggestions.map(({id, name}) => ({value: id, label: name}))} // Replace with actual account options
                placeholder='Select Account'
                value={form.watch('accountId')}
                setValue={(value) => form.setValue('accountId', Number(value))}
                query={accountQuery}
                setQuery={setAccountQuery}
                className="grow"
              />
            </div>
          </div>

          <div className="grow">
            <Label className='mb-2'>Salesman</Label>
            <div className='flex flex-row'>
              <ComboBox 
                options={salesmanSuggestions.map(({id, firstName, lastName}) => ({value: id, label: `${firstName} ${lastName}`}))} // Replace with actual salemen options
                placeholder='Select Salesman'
                value={form.watch('salesmanId')}
                setValue={(value) => form.setValue('salesmanId', Number(value))}
                className="grow"
                query={salesmanQuery}
                setQuery={setSalesmanQuery}
              />
            </div>
          </div>
          
          <div className="grow">
            <Label className='mb-2'>Date of Order</Label>
            <div className='flex flex-row'>
              <DatePicker className="grow" date={form.watch('date')} setDate={(date) => form.setValue('date', date)} />
            </div>
          </div>

          <PurchaseForm onSubmit={(purchase) => setPurchases([...purchases, purchase])} />

          {purchases.map((purchase, index) => 
            <PurchaseItem
              key={index}
              purchase={purchase}
              onDelete={removePurchase}
            />
          )}

          <div className="text-right font-semibold text-lg">
            <span>Total: </span>
            <span className="font-normal underline">PHP {totalAmount.toFixed(2)}</span>
          </div>

          <Button type="submit" variant="default">Submit</Button>
        </form>
      </Form>
    </>
    
  )
}