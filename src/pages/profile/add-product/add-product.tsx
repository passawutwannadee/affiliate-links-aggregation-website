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
import { useEffect, useState } from 'react';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z
  .object({
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
  })
  .and(
    z.discriminatedUnion('link_list', [
      z.object({
        link_list: z.literal(1),
        link_1: z.string().nonempty({
          message: 'Please enter link.',
        }),
        link_2: z.string().optional(),
        link_3: z.string().optional(),
        link_4: z.string().optional(),
      }),
      z.object({
        link_list: z.literal(2),
        link_1: z.string().nonempty({
          message: 'Please enter link.',
        }),
        link_2: z.string().nonempty({
          message: 'Please enter link.',
        }),
        link_3: z.string().optional(),
        link_4: z.string().optional(),
      }),
      z.object({
        link_list: z.literal(3),
        link_1: z.string().nonempty({
          message: 'Please enter link.',
        }),
        link_2: z.string().nonempty({
          message: 'Please enter link.',
        }),
        link_3: z.string().nonempty({
          message: 'Please enter link.',
        }),
        link_4: z.string().optional(),
      }),
      z.object({
        link_list: z.literal(4),
        link_1: z.string().nonempty({
          message: 'Please enter link.',
        }),
        link_2: z.string().nonempty({
          message: 'Please enter link.',
        }),
        link_3: z.string().nonempty({
          message: 'Please enter link.',
        }),
        link_4: z.string().nonempty({
          message: 'Please enter link.',
        }),
      }),
    ])
  );

export default function AddProduct() {
  const [linkList, setLinkList] = useState<number>(1);

  const handlePlus = () => {
    setLinkList(linkList + 1);
  };

  const handleMinus = () => {
    setLinkList(linkList - 1);
  };

  const renderLinks = () => {
    const links = [];
    for (let i = 1; i <= linkList; i++) {
      links.push(
        <FormField
          control={form.control}
          name={
            i === 1
              ? 'link_1'
              : i === 2
              ? 'link_2'
              : i === 3
              ? 'link_3'
              : 'link_4'
          }
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    return links;
  };

  // 1. Define your form.

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
        <div className="max-h-screen overflow-auto p-4">
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-1 pb-0.5">
                    <FormLabel>Product Links</FormLabel>
                  </div>
                  {renderLinks()}
                  <div className="flex gap-2">
                    {linkList === 4 ? (
                      <Button disabled onClick={handlePlus}>
                        +
                      </Button>
                    ) : (
                      <Button onClick={handlePlus}>+</Button>
                    )}
                    {linkList === 1 ? (
                      <Button
                        disabled
                        className="bg-primary-background text-primary hover:bg-primary-foreground"
                        onClick={handleMinus}
                      >
                        -
                      </Button>
                    ) : (
                      <Button
                        className="bg-primary-background text-primary hover:bg-primary-foreground"
                        onClick={handleMinus}
                      >
                        -
                      </Button>
                    )}
                  </div>
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
        </div>
        {/* <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction type="submit">Continue</AlertDialogAction>
        </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  );
}
