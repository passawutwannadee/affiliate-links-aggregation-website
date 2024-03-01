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
import { SelectTrigger, SelectValue } from '@/components/ui/select';
import { Select } from '@radix-ui/react-select';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { editProductsAPI, productAPI } from '@/services/products-api';
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Required } from '@/components/ui/required';
import Categories from './categories/categories';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { useEffect, useState } from 'react';
import { SubmitButton } from '@/components/ui/submit-button';
import { LoadingSmall } from '@/components/ui/loading-small';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const productNoImage = z.object({
  product_name: z.string().nonempty({
    message: 'Please enter product name.',
  }),
  product_description: z.string().nonempty({
    message: 'Please enter product name.',
  }),
  category: z.string().nonempty({
    message: 'Please enter product name.',
  }),
  product_image: z.void(),
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
  changeImage: z.literal(false),
});

const productWithImage = z.object({
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
  changeImage: z.literal(true),
});

const formSchema = z.discriminatedUnion('changeImage', [
  productNoImage,
  productWithImage,
]);

interface ChildProps {
  productId: number;
  closeSheet: () => void;
}

export default function EditProduct({ productId, closeSheet }: ChildProps) {
  const username = useSelector((state: RootState) => state.user.currentUser);

  const [linkValue, setlinkValue] = useState<{ value: string }[]>([]);
  const [categoryValue, setCategoryValue] = useState<string>('');

  const { data, isLoading } = useQuery(
    ['product_data', productId],
    () => productAPI(productId!),
    {
      onSuccess: (response) => {
        const links: { value: string }[] = [];
        for (let i = 0; i < response?.data[0].links.length; i++) {
          links.push({ value: response?.data[0].links[i] });
        }

        // form.reset({
        //   category: response?.data[0].category_id.toString(),
        //   changeImage: false,
        // });

        setCategoryValue(response?.data[0].category_id.toString());
        setlinkValue(links);
        form.setValue('changeImage', false);
      },
    }
  );

  const queryClient = useQueryClient();

  const { mutate, isLoading: isSending } = useMutation(editProductsAPI, {
    onSuccess: (response) => {
      if (response.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ['product_data', username],
        });
        queryClient.invalidateQueries({
          queryKey: ['product_data', productId],
        });
        queryClient.invalidateQueries({
          queryKey: ['collection_to_product', username],
        });
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
            <p>Report successfully submitted.</p>
          </>
        );
        closeSheet();
      }
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      changeImage: false,
      product_links: linkValue,
    },
    mode: 'onChange',
    shouldUnregister: true,
  });

  const { fields, append, remove } = useFieldArray({
    name: 'product_links',
    control: form.control,
  });

  useEffect(() => {
    form.reset({
      category: categoryValue,
      product_links: linkValue,
    });
    form.setValue('changeImage', false);
    form.setValue('category', categoryValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkValue, categoryValue]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const productName = values.product_name;
    const productDescription = values.product_description;
    const category = values.category;
    const productImage = values.product_image;
    const productLinks = values.product_links;

    mutate({
      productId,
      productName,
      productDescription,
      category,
      productImage,
      productLinks,
    });
    console.log(values);

    // setOpen(false);
  }

  if (isLoading) {
    return <LoadingSmall />;
  }

  return (
    <>
      <SheetContent className="flex">
        <ScrollArea className="h-[95vh] self-center w-full">
          <div className="m-6 mt-0 pb-5">
            <SheetHeader>
              <SheetTitle>Edit Product</SheetTitle>
              <SheetDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3"
                  >
                    <FormField
                      control={form.control}
                      name="product_name"
                      defaultValue={data?.data[0].product_name}
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
                      defaultValue={data?.data[0].product_description}
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
                          <Select
                            defaultValue={data?.data[0].category_id.toString()}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <Categories />
                            <FormMessage />
                          </Select>
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col gap-3">
                      <FormLabel>
                        Product Image ( 1:1 ratio )
                        <Required />
                      </FormLabel>
                      {form.watch('changeImage') ? (
                        <div className="flex flex-row gap-2">
                          <FormField
                            control={form.control}
                            name="product_image"
                            render={({ field: { onChange } }) => (
                              <FormItem>
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
                          <Button
                            type="button"
                            onClick={() => form.setValue('changeImage', false)}
                          >
                            X
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-row items-center gap-4">
                          <img
                            className="w-24 h-24 aspect-square object-cover rounded-lg border"
                            src={data?.data[0].product_image}
                          />
                          <Button
                            type="button"
                            onClick={() => form.setValue('changeImage', true)}
                          >
                            Change Image
                          </Button>
                        </div>
                      )}
                    </div>

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
                                stroke-width="1.5"
                                className="w-5 h-5 stroke-primary-foreground"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
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
                      <SheetClose>
                        <Button variant="secondary" type="button">
                          Close
                        </Button>
                      </SheetClose>
                      <SubmitButton type="submit" isLoading={isSending}>
                        Edit Product
                      </SubmitButton>
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
    </>
  );
}
