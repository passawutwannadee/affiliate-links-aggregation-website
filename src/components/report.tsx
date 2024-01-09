import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { reportCategoriesAPI, submitReportsAPI } from '@/services/report-api';
import { Required } from './ui/required';
import { Loading } from './ui/loading';
import { toast } from 'sonner';

const formSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: 'Report detail must be at least 10 characters.',
    })
    .max(160, {
      message: 'Report detail must not be longer than 30 characters.',
    }),
  category: z.string().nonempty({
    message: 'Please enter product name.',
  }),
});

export default function Report({
  link,
  username,
}: {
  link: string;
  username: string;
}) {
  const [open, setOpen] = useState<boolean>(false);

  // get categories
  const { data, isLoading } = useQuery(['report_categories'], () =>
    reportCategoriesAPI()
  );

  const { mutate } = useMutation(submitReportsAPI, {
    onSuccess: (response) => {
      if (response.status === 201) {
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
      description: '',
      category: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const reportCategoryId = values.category;
    const reportInformation = values.description;

    mutate({
      reportCategoryId: reportCategoryId,
      reportInformation: reportInformation,
      reportLink: link,
      username: username,
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="w-full">
        <Button variant="ghost" className="w-full justify-start">
          Report
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Report</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Report Category
                      <Required />
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="">
                        {data!.data.map(
                          (value: {
                            report_catogory_name: string;
                            report_category_id: string;
                          }) => {
                            return (
                              <SelectItem
                                key={value.report_category_id}
                                value={value.report_category_id.toString()}
                                className="hover:bg-primary/10"
                              >
                                {value.report_catogory_name}
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Report Detail</FormLabel>
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
                <Button className="w-full" type="submit">
                  Report
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetDescription>
        {/* <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction type="submit">Continue</AlertDialogAction>
        </AlertDialogFooter> */}
      </SheetContent>
    </Sheet>
  );
}
