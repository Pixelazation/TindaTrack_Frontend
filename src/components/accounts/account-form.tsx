import { createAccount, editAccount } from '../../api/accounts';
import type { Account } from '../../types/account';
import { Button } from '../ui/button';
import { DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from "zod";

const accountFormSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a name.",
  }),
  address: z.string().min(1, {
    message: "Please enter an address.",
  }),
  barangayId: z.number().int().positive({
    message: "Please select a barangay.",
  }),
})

interface Props {
  closeForm: () => void;
  account: Account | null;
}

export default function AccountForm(props: Props) {
  const { closeForm, account } = props;

  const isEdit = account !== null;

  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: isEdit ? {
      ...account
    } : {
      name: '',
      address: '',
      barangayId: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof accountFormSchema>) {
    console.log("Form submitted with values:", values);

    try {
      if (isEdit)
        await editAccount(account.id, values);
      else
        await createAccount(values);
    } catch (error) {
      console.error("Failed to create account:", error);
    }

    closeForm();
  }

  return (
    <>
      <DialogTitle className="text-3xl font-bold text-primary mb-4">
        {isEdit ? 'Edit' : 'Create New'} Account
      </DialogTitle>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input placeholder="Juan's Sari-Sari Store" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Quezon Avenue" {...field} />
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