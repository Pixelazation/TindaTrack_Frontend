// import { useState } from 'react';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from "zod";
// import { type Purchase } from '../../types/purchase';
import { ComboBox } from '../ui/combo-box';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const purchaseFormSchema = z.object({
  itemId: z.number().int().positive({
    message: "Please select an item.",
  }),
  unitPrice: z
    .number({
      required_error: "Unit price is required",
      invalid_type_error: "Unit price must be a number",
    })
    .positive("Price must be greater than 0")
    .max(999999999999.99, "Maximum allowed is 14 digits with 2 decimal places")
    .refine((val) => Number.isInteger(val * 100), {
      message: "Price must have at most 2 decimal places",
    }),
  quantity: z.number().int().positive({
    message: "Please set the item quantity.",
  }),
})

export default function PurchaseForm() {
  const form = useForm<z.infer<typeof purchaseFormSchema>>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: {
      itemId: 0,
      unitPrice: 0,
      quantity: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof purchaseFormSchema>) {
    console.log("Form submitted with values:", values);

    // const purchaseData = purchases.map(purchase => ({
    //   itemId: purchase.itemId,
    //   quantity: purchase.quantity,
    //   unitPrice: purchase.unitPrice,
    // }));

    // try {
    //   if (isEdit)
    //     await editOrder(order.id, {purchases: [], ...values});
    //   else
    //     await createOrder({purchases: [], ...values});
    // } catch (error) {
    //   console.error("Failed to create order:", error);
    // }

  }

  return (
    <div className="flex flex-col grow">
      <Label className='mb-2 w-fit self-center text-lg'>Purchases</Label>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          <div className="grow">
            <Label className='mb-2'>Item</Label>
            <div className='flex flex-row'>
              <ComboBox 
                options={[{value: 1, label: 'Item 1'}, {value: 2, label: 'Item 2'}]} // Replace with actual account options
                placeholder='Select Item'
                value={form.watch('itemId')}
                setValue={(value) => form.setValue('itemId', Number(value))}
                className="grow"
              />
            </div>
          </div>

          <div className="flex flex-row items-end space-x-4">
            <FormField
              control={form.control}
              name="unitPrice"
              render={({ field }) => (
                <FormItem className="grow flex flex-col justify-start">
                  <FormLabel>Unit Price (PHP)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="grow flex flex-col justify-start">
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" variant="secondary">Add Item</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}