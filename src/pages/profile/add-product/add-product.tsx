import { PlusIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFieldArray, useForm } from 'react-hook-form';
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
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { addProductsAPI, productCategoriesAPI } from '@/services/products-api';
import { Loading } from '@/components/ui/loading';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Required } from '@/components/ui/required';

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
  product_image: z
    .any()
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  product_links: z.array(
    z.object({
      value: z
        .string()
        .nonempty({
          message: 'Please enter product URL.',
        })
        .url({ message: 'Please enter a valid URL.' }),
    })
  ),
});

export default function AddProduct() {
  const [open, setOpen] = useState<boolean>(false);

  // get categories
  const { data, isLoading } = useQuery(['product_categories'], () =>
    productCategoriesAPI()
  );

  const { mutate } = useMutation(addProductsAPI, {
    onSuccess: (response) => {
      if (response.status === 200) {
        console.log('hello');
      }
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: '',
      product_description: '',
      category: '',
      product_image: '',
      product_links: [{ value: '' }],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'product_links',
    control: form.control,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const product_name = values.product_name;
    const product_description = values.product_description;
    const category = values.category;
    const product_image = values.product_image;
    const product_links = values.product_links;

    mutate({
      product_name,
      product_description,
      category,
      product_image,
      product_links,
    });
    console.log(values);

    setOpen(false);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </SheetTrigger>
      <SheetContent className="flex">
        <ScrollArea className="h-[95vh] self-center">
          <div className="m-6 mt-0 pb-5">
            <SheetHeader>
              <SheetTitle>Add Product</SheetTitle>
              <SheetDescription>
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
                          <FormLabel>
                            Product Name
                            <Required />
                          </FormLabel>
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
                          <FormLabel>
                            Product Description
                            <Required />
                          </FormLabel>
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
                          <FormLabel>
                            Category
                            <Required />
                          </FormLabel>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent className="">
                              {data.data.map(
                                (value: {
                                  category_name: string;
                                  category_id: string;
                                }) => {
                                  return (
                                    <SelectItem
                                      key={value.category_id}
                                      value={value.category_id.toString()}
                                      className="hover:bg-primary/10"
                                    >
                                      {value.category_name}
                                    </SelectItem>
                                  );
                                }
                              )}
                            </SelectContent>
                            <FormMessage />
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="product_image"
                      render={({ field: { onChange } }) => (
                        <FormItem>
                          <FormLabel>
                            Product Image ( 1:1 ratio )
                            <Required />
                          </FormLabel>
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

                    <div className="flex flex-col gap-3">
                      <FormLabel>
                        Product Links
                        <Required />
                      </FormLabel>
                      {fields.map((field, index) => (
                        <div className="flex flex-row w-full gap-4">
                          <FormField
                            control={form.control}
                            key={field.id}
                            name={`product_links.${index}.value`}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {index !== 0 ? (
                            <Button
                              className="bg-primary  hover:bg-primary/80"
                              onClick={() => remove(index)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                className="w-5 h-5 stroke-primary-foreground"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </Button>
                          ) : null}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {fields.length === 4 ? (
                        <div className="flex flex-row items-center gap-2">
                          <Button
                            disabled
                            onClick={() => append({ value: '' })}
                          >
                            +
                          </Button>
                          <p className="text-primary">
                            Only 4 links are allowed.
                          </p>
                        </div>
                      ) : (
                        <Button onClick={() => append({ value: '' })}>+</Button>
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

                    <SheetFooter>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Add Product</Button>
                    </SheetFooter>
                  </form>
                </Form>
              </SheetDescription>
            </SheetHeader>
          </div>
        </ScrollArea>
        {/* <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction type="submit">Continue</AlertDialogAction>
        </AlertDialogFooter> */}
      </SheetContent>
    </Sheet>
  );
}
