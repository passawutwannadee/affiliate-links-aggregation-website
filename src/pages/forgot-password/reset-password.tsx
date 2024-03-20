import {
  Card,
  CardContent,
  CardDescription,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
// import { Label } from "@/components/ui/label"
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useNavigate } from 'react-router-dom';
import { Required } from '@/components/ui/required';
import { useMutation } from 'react-query';
import { SubmitButton } from '@/components/ui/submit-button';
import { toast } from 'sonner';
import { ErrorAlert } from '@/components/ui/error-alert';
import { resetPasswordAPI } from '@/services/password-api';

const formSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message: 'Password does not meet the minimum requirements.',
        }
      ),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: 'Passwords does not match.',
    path: ['confirmpassword'],
  });

export default function ResetPassword() {
  const urlParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmpassword: '',
    },
  });

  const { mutate, isLoading } = useMutation(resetPasswordAPI, {
    onSuccess: (response) => {
      if (response.status === 200) {
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
              className="w-6 h-6 self-start justify-self-start"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p>
              Password reset successful. You can now login with your new
              password.
            </p>
          </>
        );
        navigate('/');
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (response: any) => {
      if (response.status === 406) {
        toast(
          <>
            <ErrorAlert>Token expired or invalid.</ErrorAlert>
          </>
        );
      }
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    mutate({
      new_password: values.password,
      reset_password_token: urlParams.get('token')!,
    });
  }

  return (
    <div className="container mx-auto flex items-center justify-center mt-36 lg:mt-30 2xl:mt-0 lg:h-[85vh] ">
      <Card className="w-full lg:w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <CardDescription>Please enter your new password.</CardDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password <Required />
                    </FormLabel>
                    <FormDescription>
                      Password must be at least 8 characters long and contain at
                      least one number, one lowercase letter, one uppercase
                      letter, and one symbol.
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
                name="confirmpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm Password <Required />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SubmitButton isLoading={isLoading}>Reset password</SubmitButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
