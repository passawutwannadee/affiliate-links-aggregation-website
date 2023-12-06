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
import axiosInstance from '@/configs/axios-instance';
import { useState } from 'react';
import { Loading } from '@/components/ui/loading';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { loginAPI } from '@/services/login-api';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z.string().min(8, {
    message: 'Please enter your password.',
  }),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [loginFalse, setLoginFalse] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setLoginFalse(false);

    loginAPI(values.email, values.password).then((response) => {
      console.log(response);

      // login is successful
      if (response.status === 200 && response.data.login === true) {
        sessionStorage.setItem('token', response.data.token);
        window.location.reload();
      }

      // login is not successful wrong password or email
      if (response.status === 200 && response.data.login === false) {
        setLoginFalse(true);
      }
    });

    // try {
    //   setLoading(true);
    //   const response = await axiosInstance.post(
    //     `/auth/login`,
    //     {
    //       email: values.email,
    //       password: values.password,
    //     },
    //     { withCredentials: true }
    //   );

    //   console.log(response);

    //   // login is successful
    //   if (response.status === 200 && response.data.login === true) {
    //     sessionStorage.setItem('token', response.data.token);
    //     window.location.reload();
    //   }

    //   // login is not successful wrong password or email
    //   if (response.status === 200 && response.data.login === false) {
    //     setLoginFalse(true);
    //   }

    //   const getToken = document.cookie.replace(
    //     /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    //     '$1'
    //   );

    //   console.log(document.cookie);
    // } catch (err) {
    //   console.log(err);
    // }

    setLoading(false);
  }
  return (
    <>
      {loading ? <Loading /> : null}
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

                <Button className="w-full" type="submit">
                  Login
                </Button>
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
