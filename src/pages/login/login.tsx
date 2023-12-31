import { Button } from '@/components/ui/button';
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
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { loginAPI } from '@/services/auth-api';
import { useMutation } from 'react-query';
import { ring2 } from 'ldrs';

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
  const [loginFalse, setLoginFalse] = useState(false);

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
        setLoginFalse(true);
      }
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setLoginFalse(false);

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

                {loginFalse ? (
                  <Alert variant="destructive">
                    {/* <ExclamationTriangleIcon className="h-4 w-4" /> */}
                    <AlertDescription>
                      Incorrect email or password
                    </AlertDescription>
                  </Alert>
                ) : null}

                {isLoading ? (
                  <Button disabled className="w-full" type="submit">
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
                  <Button className="w-full" type="submit">
                    <p>Login</p>
                  </Button>
                )}
              </form>
            </Form>
          </CardContent>
          <CardFooter className="self-center gap-1">
            Don't have an account?
            <Link
              to="/register"
              className="flex text-primary font-bold hover:text-primary/70"
            >
              {' '}
              Register
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
