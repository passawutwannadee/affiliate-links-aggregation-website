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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Link } from 'react-router-dom';
import { Required } from '@/components/ui/required';
import { useMutation } from 'react-query';
import { registerAPI } from '@/services/register-api';
import { SubmitButton } from '@/components/ui/submit-button';

const formSchema = z
  .object({
    displayname: z.string(),
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    email: z.string().email({
      message: 'Invalid email address.',
    }),
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

export default function Register() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayname: '',
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
    },
  });

  const { mutate, isLoading } = useMutation(
    registerAPI
    // , {onSuccess: (response) => {}, }
  );

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const email = values.email;
    const password = values.password;
    const username = values.username;
    const display_name = values.displayname;

    mutate({ email, password, username, display_name });

    console.log(values);
  }

  return (
    <div className="container mx-auto flex items-center justify-center mt-36 lg:mt-30 2xl:mt-0 lg:h-[85vh] ">
      <Card className="w-full lg:w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Create an account
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
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

              <FormField
                control={form.control}
                name="displayname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="JohnDoe123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Username <Required />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="JohnDoe123" {...field} />
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

              <SubmitButton isLoading={isLoading}>Create Account</SubmitButton>
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
