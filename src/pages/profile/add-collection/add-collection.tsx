/* eslint-disable react-hooks/exhaustive-deps */
import { PlusIcon } from '@radix-ui/react-icons';
import { X } from 'lucide-react';

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

import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { useCallback, useEffect, useRef, useState } from 'react';

const formSchema = z.object({
  collection_name: z.string().nonempty({
    message: 'Please enter collection name.',
  }),
  collection_description: z.string().nonempty({
    message: 'Please enter collection description.',
  }),
  products: z.any().array().min(2, {
    message: 'Please select at least two products.',
  }),
});

type Products = Record<'value' | 'label', string>;

const PRODUCTS = [
  {
    value: 'product1',
    label: 'product1',
  },
  {
    value: 'product2',
    label: 'product2',
  },
  {
    value: 'product3',
    label: 'product3',
  },
  {
    value: 'product4',
    label: 'product4',
  },
  {
    value: 'product5',
    label: 'product5',
  },
  {
    value: 'product6',
    label: 'product6',
  },
  {
    value: 'product7',
    label: 'product7',
  },
  {
    value: 'product8',
    label: 'product8',
  },
] satisfies Products[];

export default function AddCollection() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Products[]>([]);
  const [inputValue, setInputValue] = useState('');

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
    console.log(values);
    console.log(selected);
  }

  const handleUnselect = useCallback((Products: Products) => {
    setSelected((prev) => prev.filter((s) => s.value !== Products.value));
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

  const selectables = PRODUCTS.filter(
    (Products) => !selected.includes(Products)
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Collection
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Collection</AlertDialogTitle>
          <AlertDialogDescription>
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
                        <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                          <div className="flex gap-1 flex-wrap">
                            {selected.map((Products) => {
                              return (
                                <Badge key={Products.value} variant="secondary">
                                  {Products.label}
                                  <button
                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        handleUnselect(Products);
                                      }
                                    }}
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(Products)}
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
                              onBlur={() => setOpen(false)}
                              onFocus={() => setOpen(true)}
                              placeholder="Select products..."
                              className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                            />
                          </div>
                        </div>
                        <div className="relative mt-2">
                          {open && selectables.length > 0 ? (
                            <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                              <CommandGroup className="h-full overflow-auto">
                                {selectables.map((Products) => {
                                  return (
                                    <CommandItem
                                      key={Products.value}
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                      }}
                                      onSelect={() => {
                                        setInputValue('');
                                        setSelected((prev) => [
                                          ...prev,
                                          Products,
                                        ]);
                                        form.setValue('products', selected);
                                      }}
                                      className={'cursor-pointer'}
                                    >
                                      {Products.label}
                                    </CommandItem>
                                  );
                                })}
                              </CommandGroup>
                            </div>
                          ) : null}
                        </div>
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

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button className="w-full" type="submit">
                    Create Collection
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
