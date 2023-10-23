import { PlusIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Select } from '@radix-ui/react-select';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z.object({
  product_name: z.string().nonempty({
    message: 'Please enter product name.',
  }),
  product_description: z.string().nonempty({
    message: 'Please enter product name.',
  }),
  category: z.string().nonempty({
    message: 'Please enter product name.',
  }),
  product_picture: z
    .any()
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
});

export default function AddProduct() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: '',
      product_description: '',
      category: '',
      product_picture: '',
    },
    mode: 'onChange',
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Product</AlertDialogTitle>
          <AlertDialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="product_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="product_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Description</FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          // placeholder="Please include all information relevant to your issue."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue="2">
                        <SelectTrigger id="security-level" className="w-full">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="lorem"
                            className="hover:bg-primary/10"
                          >
                            Lorem
                          </SelectItem>
                          <SelectItem
                            value="ipsum"
                            className="hover:bg-primary/10"
                          >
                            Ipsum
                          </SelectItem>
                        </SelectContent>
                        <FormMessage />
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="product_picture"
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <FormLabel>Product Image</FormLabel>
                      <div className="flex flex-col md:flex-row gap-10">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Input
                            id="picture"
                            type="file"
                            onChange={(event) => {
                              if (
                                event.target.files &&
                                event.target.files.length > 0
                              ) {
                                onChange(event.target.files[0]);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="confirmpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Picture</FormLabel>
                      <Input
                        className="w-full"
                        id="picture"
                        type="file" 
                        onChange={(event) => {
                          onChange(event.target.files);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button className="w-full" type="submit">
                    Add product
                  </Button>
                </AlertDialogFooter>
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction type="submit">Continue</AlertDialogAction>
        </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  );
}
