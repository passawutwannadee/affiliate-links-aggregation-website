/* eslint-disable react-hooks/exhaustive-deps */
import { PlusIcon } from '@radix-ui/react-icons';
import { X } from 'lucide-react';

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
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';

import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { useCallback, useEffect, useRef, useState } from 'react';
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
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { productsAPI } from '@/services/products-api';
import { createCollectionsAPI } from '@/services/collections-api';
import { toast } from 'sonner';
import { ErrorAlert } from '@/components/ui/error-alert';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { Loading } from '@/components/ui/loading';
import { SubmitButton } from '@/components/ui/submit-button';

const formSchema = z.object({
  collection_name: z
    .string()
    .nonempty({
      message: 'Please enter collection name.',
    })
    .min(1)
    .max(50, {
      message: 'Collection Name cannot be longer than 50 characters.',
    }),
  collection_description: z
    .string()
    .nonempty({
      message: 'Please enter collection description.',
    })
    .min(1)
    .max(255, {
      message: 'Collection description cannot be longer than 255 characters.',
    }),
  products: z.any().array().min(2, {
    message: 'Please select at least two products.',
  }),
});

type Products = Record<
  'product_id' | 'product_image' | 'product_name' | 'product_description',
  string
>;

export default function AddCollection() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [selected, setSelected] = useState<Products[]>([]);
  const [inputValue, setInputValue] = useState('');
  const username = useSelector((state: RootState) => state.user.currentUser);

  const { data, isLoading } = useQuery(['product_data', username], () =>
    productsAPI(username!)
  );

  const queryClient = useQueryClient();

  const { mutate, isLoading: isSending } = useMutation(createCollectionsAPI, {
    onSuccess: (response) => {
      if (response.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ['collection_data', username],
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
        setOpen(false);
      }
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collection_name: '',
      collection_description: '',
      products: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    form.setValue('products', selected);

    // const collectionName = values.collection_name;
    // const collectionDescription = values.collection_description;
    const products = [];

    for (let i = 0; i < selected.length; i++) {
      products.push(selected[i].product_id);
    }

    mutate({
      collectionName: values.collection_name,
      collectionDescription: values.collection_description,
      products: products,
    });
  }

  const handleUnselect = useCallback((Products: Products) => {
    setSelected((prev) =>
      prev.filter((s) => s.product_id !== Products.product_id)
    );
    form.setValue('products', selected);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    []
  );

  useEffect(() => {
    form.setValue('products', selected);
  }, [form, selected]);

  const selectables = data?.data?.filter(
    (Products: Products) => !selected.includes(Products)
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button
          type="button"
          onClick={() => {
            setOpen(true);
          }}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Collection
        </Button>
      </SheetTrigger>
      <SheetContent className="flex">
        <ScrollArea className="h-[95vh] self-center w-full">
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
                      name="collection_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Collection Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="collection_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Collection Description</FormLabel>
                          <FormControl>
                            <Textarea id="description" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="products"
                      render={() => (
                        <FormItem>
                          <FormLabel>Products</FormLabel>
                          <Command
                            onKeyDown={handleKeyDown}
                            className="overflow-visible bg-transparent"
                          >
                            {data!.data[0] ? (
                              <>
                                <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                  <div className="flex gap-1 flex-wrap">
                                    {selected.map((item: Products) => {
                                      return (
                                        <Badge
                                          key={item.product_id}
                                          variant="secondary"
                                        >
                                          {item.product_name}
                                          <button
                                            type="button"
                                            className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                            onKeyDown={(e) => {
                                              if (e.key === 'Enter') {
                                                handleUnselect(item);
                                              }
                                            }}
                                            onMouseDown={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                            }}
                                            onClick={() => handleUnselect(item)}
                                          >
                                            <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                          </button>
                                        </Badge>
                                      );
                                    })}
                                    {/* Avoid having the "Search" Icon */}
                                    <CommandPrimitive.Input
                                      ref={inputRef}
                                      value={inputValue}
                                      onValueChange={setInputValue}
                                      onBlur={() => setDropdown(false)}
                                      onFocus={() => setDropdown(true)}
                                      placeholder="Select products..."
                                      className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                                    />
                                  </div>
                                </div>
                                <div className="relative mt-2">
                                  {dropdown && selectables.length > 0 ? (
                                    <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                                      <CommandGroup className="h-full overflow-auto">
                                        {selectables.map((item: Products) => {
                                          return (
                                            <CommandItem
                                              key={item.product_id}
                                              onMouseDown={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                              }}
                                              onSelect={() => {
                                                setInputValue('');
                                                setSelected((prev) => [
                                                  ...prev,
                                                  item,
                                                ]);
                                                form.setValue(
                                                  'products',
                                                  selected
                                                );
                                              }}
                                              className={'cursor-pointer gap-2'}
                                            >
                                              <img
                                                className="w-12 h-12 aspect-square object-cover"
                                                src={item.product_image}
                                              />
                                              {item.product_name}
                                            </CommandItem>
                                          );
                                        })}
                                      </CommandGroup>
                                    </div>
                                  ) : null}
                                </div>
                              </>
                            ) : (
                              <ErrorAlert>
                                You currently do not have any product.
                              </ErrorAlert>
                            )}
                            <FormMessage />
                          </Command>
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

                    <SheetFooter>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <SubmitButton type="submit" isLoading={isSending}>
                        Add collection
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
    </Sheet>
  );
}
