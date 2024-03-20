import {
  Card,
  CardContent,
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
import { Link } from 'react-router-dom';
import { loginAPI } from '@/services/auth-api';
import { useMutation } from 'react-query';
import { ring2 } from 'ldrs';
import { SubmitButton } from '@/components/ui/submit-button';
import { toast } from 'sonner';
import { ErrorAlert } from '@/components/ui/error-alert';
import { Button } from '@/components/ui/button';

ring2.register();

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z.string().min(8, {
    message: 'Please enter your password.',
  }),
});

export default function Login() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isLoading } = useMutation(loginAPI, {
    onSuccess: (response) => {
      // login is successful
      if (response.status === 200 && response.data.login === true) {
        document.cookie = `session=true; expires=${new Date(
          Date.now() + 24 * 60 * 60 * 1000
        )}; path=/`;
        window.location.reload();
      }

      // login is not successful wrong password or email
      if (response.status === 200 && response.data.login === false) {
        toast(
          <>
            <ErrorAlert>Incorrect email or password.</ErrorAlert>
          </>
        );
      }
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const email = values.email;
    const password = values.password;

    mutate({ email, password });
  }
  return (
    <>
      <div className="container mx-auto flex items-center justify-center pt-20 lg:pt-0 lg:h-[85vh]">
        <Card className="w-full lg:w-1/4">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Login</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="JohnDoe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <SubmitButton isLoading={isLoading}>Login</SubmitButton>
              </form>
            </Form>
            <div className="flex items-center text-sm text-gray-800 before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-gray-600 dark:after:border-gray-600">
              Or
            </div>
            <Link to="/register" className="w-full">
              <Button className="w-full" variant={'secondary'}>
                Register
              </Button>
            </Link>
          </CardContent>

          <CardFooter className="self-center gap-1 flex flex-col">
            <Link
              to="/forgot-password"
              className="flex text-primary font-bold hover:text-primary/70"
            >
              Forgot Password?
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
