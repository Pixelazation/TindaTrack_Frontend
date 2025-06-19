import { useState } from 'react';
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

interface Props {
  closeForm: () => void;
  order: Order | null;
}

export default function OrderForm(props: Props) {
  const { closeForm, order } = props;
  // const [purchases, setPurchases] = useState<Purchase[]>(order?.purchases || []);

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

  return (
    <>
      <DialogTitle className="text-3xl font-bold mb-4">
        {isEdit ? 'Edit' : 'Create New'} Order
      </DialogTitle>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">

          <div className="grow">
            <Label className='mb-2'>Account</Label>
            <div className='flex flex-row'>
              <ComboBox 
                options={[{value: 1, label: 'Account 1'}, {value: 2, label: 'Account 2'}]} // Replace with actual account options
                placeholder='Select Account'
                value={form.watch('accountId')}
                setValue={(value) => form.setValue('accountId', Number(value))}
                className="grow"
              />
            </div>
          </div>

          <div className="grow">
            <Label className='mb-2'>Salesman</Label>
            <div className='flex flex-row'>
              <ComboBox 
                options={[{value: 1, label: 'Salesman 1'}, {value: 2, label: 'Salesman 2'}]} // Replace with actual salemen options
                placeholder='Select Salesman'
                value={form.watch('salesmanId')}
                setValue={(value) => form.setValue('salesmanId', Number(value))}
                className="grow"
              />
            </div>
          </div>
          
          <div className="grow">
            <Label className='mb-2'>Date of Order</Label>
            <div className='flex flex-row'>
              <DatePicker className="grow" date={form.watch('date')} setDate={(date) => form.setValue('date', date)} />
            </div>
          </div>

          <div className="grow">
            <Label className='mb-2'>Purchases</Label>
          </div>
          
          <Button type="submit" variant="default">Submit</Button>
        </form>
      </Form>
    </>
    
  )
}