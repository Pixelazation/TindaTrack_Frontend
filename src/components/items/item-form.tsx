import { createItem, editItem } from '../../api/items';
import type { Item } from '../../types/item';
import { Button } from '../ui/button';
import { DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from "zod";

const itemFormSchema = z.object({
  itemCode: z.string().min(6, {
    message: "Item code must be at least 6 characters.",
  }),
  name: z.string().min(2, {
    message: "Item name must be at least 2 characters.",
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
  description: z.string().max(200, {
    message: "Description must be at most 200 characters.",
  }).optional(),
})

interface Props {
  closeForm: () => void;
  item: Item | null;
}

export default function ItemForm(props: Props) {
  const { closeForm, item } = props;

  const isEdit = item !== null;

  const form = useForm<z.infer<typeof itemFormSchema>>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: isEdit ? {
      ...item
    } : {
      itemCode: '',
      name: '',
      unitPrice: 0,
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof itemFormSchema>) {
    console.log("Form submitted with values:", values);

    try {
      if (isEdit)
        await editItem(item.id, values);
      else
        await createItem(values);
    } catch (error) {
      console.error("Failed to create item:", error);
    }

    closeForm();
  }

  return (
    <>
      <DialogTitle className="text-3xl font-bold text-primary mb-4">
        {isEdit ? 'Edit' : 'Create New'} Item
      </DialogTitle>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Item Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row space-x-4">
            <FormField
              control={form.control}
              name="itemCode"
              render={({ field }) => (
                <FormItem className="grow flex flex-col justify-start">
                  <FormLabel>Item Code</FormLabel>
                  <FormControl>
                    <Input placeholder="ex. CODE001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unitPrice"
              render={({ field }) => (
                <FormItem className="w-1/3 flex flex-col justify-start">
                  <FormLabel>Unit Price (PHP)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the item type, size, etc."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
    
  )
}