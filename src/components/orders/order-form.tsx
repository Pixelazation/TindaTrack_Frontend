import { useEffect, useState } from 'react';
import { createOrder, editOrder } from '../../api/orders';
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

const samplePurchases: Purchase[] = [
  {
    id: 1,
    orderId: 1001,
    item: {
      id: 1,
      itemCode: "ITEM001",
      name: "Ballpen (Blue)",
      description: "Smooth writing, 0.5mm tip",
      unitPrice: 12.5,
    },
    quantity: 10,
    unitPrice: 12.5,
    totalAmount: 125.0,
  },
  {
    id: 2,
    orderId: 1001,
    item: {
      id: 2,
      itemCode: "ITEM002",
      name: "Notebook",
      description: "Spiral bound, 100 pages",
      unitPrice: 45.0,
    },
    quantity: 3,
    unitPrice: 45.0,
    totalAmount: 135.0,
  },
  {
    id: 3,
    orderId: 1002,
    item: {
      id: 3,
      itemCode: "ITEM003",
      name: "Stapler",
      description: "Standard size",
      unitPrice: 85.75,
    },
    quantity: 1,
    unitPrice: 85.75,
    totalAmount: 85.75,
  },
  {
    id: 4,
    orderId: 1002,
    item: {
      id: 4,
      itemCode: "ITEM004",
      name: "Bond Paper (A4)",
      description: "500 sheets, 80gsm",
      unitPrice: 250.0,
    },
    quantity: 2,
    unitPrice: 250.0,
    totalAmount: 500.0,
  },
  {
    id: 5,
    orderId: 1003,
    item: {
      id: 5,
      itemCode: "ITEM005",
      name: "Highlighter (Yellow)",
      description: "Chisel tip",
      unitPrice: 20.0,
    },
    quantity: 4,
    unitPrice: 20.0,
    totalAmount: 80.0,
  },
];



export default function OrderForm(props: FormProps<Order>) {
  const { closeForm, item: order } = props;
  const [purchases, setPurchases] = useState<Purchase[]>(order?.purchases || samplePurchases);

  const [accountQuery, setAccountQuery] = useState<string>("");
  const [accountSuggestions, setAccountSuggestions] = useState<Account[]>([]);

  const [salesmanQuery, setSalesmanQuery] = useState<string>("");
  const [salesmanSuggestions, setSalesmanSuggestions] = useState<Salesman[]>([]);

  const isEdit = order !== null;

  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: isEdit ? {
      ...order
    } : {
      accountId: 0,
      salesmanId: 0,
      date: undefined,
    },
  });

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

    // const purchaseData = purchases.map(purchase => ({
    //   itemId: purchase.itemId,
    //   quantity: purchase.quantity,
    //   unitPrice: purchase.unitPrice,
    // }));

    try {
      if (isEdit)
        await editOrder(order.id, {purchases: [], ...values});
      else
        await createOrder({purchases: [], ...values});
    } catch (error) {
      console.error("Failed to create order:", error);
    }

    closeForm();
  }

  const totalAmount = samplePurchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0);

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

          <PurchaseForm />

          {purchases.map(purchase => <PurchaseItem purchase={purchase} />)}

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