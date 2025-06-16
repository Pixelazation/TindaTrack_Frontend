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
    .string()
    .refine((val) => /^\d{1,16}(\.\d{1,2})?$/.test(val), {
      message: "Price must be a number with up to 2 decimal places and max 18 digits total",
    }),
  description: z.string().max(200, {
    message: "Description must be at most 200 characters.",
  }).optional(),
})

interface Props {
  closeForm: () => void;
}

export default function ItemForm(props: Props) {
  const { closeForm } = props;

  const form = useForm<z.infer<typeof itemFormSchema>>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      itemCode: '',
      name: '',
      unitPrice: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof itemFormSchema>) {
    console.log("Form submitted with values:", values);
    closeForm();
  }

  return (
    <>
      <DialogTitle className="text-3xl font-bold text-primary mb-4">
        Create New Item
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
                <FormItem className="grow">
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
                <FormItem className="w-1/3">
                  <FormLabel>Unit Price (PHP)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
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