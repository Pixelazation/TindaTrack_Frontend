import { createSalesman, editSalesman } from '../../api/salesmen';
import type { FormProps } from '../../interfaces/form';
import type { Salesman } from '../../types/salesman';
import { Button } from '../ui/button';
import { DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from "zod";

const salesmanFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "Please enter a first name.",
  }),
  lastName: z.string().min(1, {
    message: "Please enter a last name.",
  }),
})

export default function SalesmanForm(props: FormProps<Salesman>) {
  const { closeForm, item: salesman } = props;

  const isEdit = salesman !== null;

  const form = useForm<z.infer<typeof salesmanFormSchema>>({
    resolver: zodResolver(salesmanFormSchema),
    defaultValues: isEdit ? {
      ...salesman
    } : {
      firstName: '',
      lastName: '',
    },
  });

  async function onSubmit(values: z.infer<typeof salesmanFormSchema>) {
    console.log("Form submitted with values:", values);

    try {
      if (isEdit)
        await editSalesman(salesman.id, values);
      else
        await createSalesman(values);
    } catch (error) {
      console.error("Failed to create salesman:", error);
    }

    closeForm();
  }

  return (
    <>
      <DialogTitle className="text-3xl font-bold text-primary mb-4">
        {isEdit ? 'Edit' : 'Create New'} Salesman
      </DialogTitle>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Juan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="dela Cruz" {...field} />
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