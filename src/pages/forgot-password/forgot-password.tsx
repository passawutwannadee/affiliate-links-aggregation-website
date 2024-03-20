import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Link, useNavigate } from 'react-router-dom';
import { Required } from '@/components/ui/required';
import { useMutation } from 'react-query';
import { SubmitButton } from '@/components/ui/submit-button';
import { toast } from 'sonner';
import { ErrorAlert } from '@/components/ui/error-alert';
import { forgotPasswordAPI } from '@/services/password-api';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
});

export default function ForgotPassword() {
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const { mutate, isLoading } = useMutation(forgotPasswordAPI, {
    onSuccess: (response) => {
      if (response.status === 201) {
        toast(
          <>
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
            <p>Please check your email for password reset link.</p>
          </>
        );
        navigate('/');
      }

      if (response.status === 204) {
        toast(
          <>
            <ErrorAlert>Email does not exist.</ErrorAlert>
          </>
        );
      }
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    mutate(values.email);

    console.log(values);
  }

  return (
    <div className="container mx-auto flex items-center justify-center mt-36 lg:mt-30 2xl:mt-0 lg:h-[85vh] ">
      <Card className="w-full lg:w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Forgot Password?
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <CardDescription>
            Enter your email address to reset your password.
          </CardDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <Required />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="JohnDoe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SubmitButton isLoading={isLoading}>Continue</SubmitButton>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="self-center gap-1">
          Already have an account?
          <Link
            to="/login"
            className="flex text-primary font-bold hover:text-primary/70"
          >
            {' '}
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
