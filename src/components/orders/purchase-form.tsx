import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from "zod";
// import { type Purchase } from '../../types/purchase';
import { ComboBox } from '../ui/combo-box';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import type { Item } from '../../types/item';
import { fetchItems } from '../../api/items';
import type { Purchase } from '../../types/purchase';

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

interface Props {
  onSubmit: (purchase: Purchase) => void;
}

export default function PurchaseForm(props: Props) {
  const { onSubmit } = props;

  const [itemQuery, setItemQuery] = useState<string>("");
  const [itemSuggestions, setItemSuggestions] = useState<Item[]>([]);

  const form = useForm<z.infer<typeof purchaseFormSchema>>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: {
      itemId: 0,
      unitPrice: 0,
      quantity: 0,
    },
  });

  async function handleSubmit(values: z.infer<typeof purchaseFormSchema>) {
    console.log("Form submitted with values:", values);

    const { itemId, unitPrice, quantity } = values;

    const newPurchase = {
      item: itemSuggestions.find(item => item.id == itemId)!,
      unitPrice: unitPrice,
      quantity: quantity,
      totalAmount: unitPrice * quantity,
    }

    onSubmit(newPurchase);
  }

  function updateItem(itemId: number) {
    form.setValue('itemId', Number(itemId));
    form.setValue('unitPrice', itemSuggestions.find(item => item.id == itemId)!.unitPrice);
  }

  useEffect(() => {
    async function loadItemSuggestions() {
      try {
        const data = await fetchItems(1, 5, itemQuery);
        setItemSuggestions(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    }
    loadItemSuggestions();
  }, [itemQuery])

  return (
    <div className="flex flex-col grow">
      <Label className='mb-2 w-fit self-center text-lg'>Purchases</Label>
      <Form {...form}>
        <div className="flex flex-col space-y-6">
          <div className="grow">
            <Label className='mb-2'>Item</Label>
            <div className='flex flex-row'>
              <ComboBox 
                options={itemSuggestions.map(({id, name}) => ({value: id, label: name}))} // Replace with actual item options
                placeholder='Select Item'
                value={form.watch('itemId')}
                setValue={(value) => updateItem(value as number)}
                className="grow"
                query={itemQuery}
                setQuery={setItemQuery}
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

            <Button type="submit" variant="secondary" onClick={form.handleSubmit(handleSubmit)}>Add Item</Button>
          </div>
        </div>
      </Form>
    </div>
  )
}