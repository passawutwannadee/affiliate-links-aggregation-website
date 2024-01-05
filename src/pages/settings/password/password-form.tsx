import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { changePasswordAPI } from '@/services/password-api';
import { useMutation } from 'react-query';
import { ErrorAlert } from '@/components/ui/error-alert';
import { toast } from 'sonner';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/components/ui/use-toast"

const passwordFormSchema = z
  .object({
    old_password: z.string().min(8, {
      message: 'Please enter your password.',
    }),
    new_password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message: 'Password does not meet the minimum requirements.',
        }
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Passwords does not match.',
    path: ['confirmpassword'],
  });

type ProfileFormValues = z.infer<typeof passwordFormSchema>;

// // This can come from your database or API.
// const defaultValues: Partial<ProfileFormValues> = {
//   bio: 'I own a computer.',
//   urls: [
//     { value: 'https://shadcn.com' },
//     { value: 'http://twitter.com/shadcn' },
//   ],
// };

export function PasswordForm() {
  const [wrongPassword, setWrongPassword] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(passwordFormSchema),
    mode: 'onChange',
  });

  const { mutate, isLoading } = useMutation(changePasswordAPI, {
    onSuccess: (response) => {
      if (response.data) {
        if (response.data.status === 400) {
          setWrongPassword(true);
        }
      }

      if (response.data) {
        if (response.data.status === 200) {
          toast(
            <>
              {' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                data-slot="icon"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <p>Password changed successfully.</p>
            </>
          );
        }
      }
    },
  });

  function onSubmit(values: ProfileFormValues) {
    setWrongPassword(false);

    const old_password = values.old_password;
    const new_password = values.new_password;

    mutate({
      old_password,
      new_password,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {wrongPassword ? <ErrorAlert>Incorrect password.</ErrorAlert> : null}
        <FormField
          control={form.control}
          name="old_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormDescription>
                Password must be at least 8 characters long and contain at least
                one number, one lowercase letter, one uppercase letter, and one
                symbol.
              </FormDescription>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button disabled type="submit">
            <l-ring-2
              size="15"
              stroke="2"
              stroke-length="0.25"
              bg-opacity="0.1"
              speed="0.8"
              color="black"
            />
          </Button>
        ) : (
          <Button type="submit">Update profile</Button>
        )}
      </form>
    </Form>
  );
}
