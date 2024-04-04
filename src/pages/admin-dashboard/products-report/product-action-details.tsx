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
import { Select } from '@/components/ui/select';
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { reportCategoriesAPI } from '@/services/report-api';
import { Required } from '@/components/ui/required';
import { Loading } from '@/components/ui/loading';
import { toast } from 'sonner';
import { SubmitButton } from '@/components/ui/submit-button';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ticketAPI, warnAPI } from '@/services/admin-api';
import { ScrollArea } from '@/components/ui/scroll-area';

const warnSchema = z.object({
  warn: z.literal('warn'),
  description: z
    .string()
    .min(10, {
      message: 'Report detail must be at least 10 characters.',
    })
    .max(255, {
      message: 'Report detail must not be longer than 255 characters.',
    }),
  category: z.string().nonempty({
    message: 'Please enter product name.',
  }),
});

const rejectSchema = z.object({
  warn: z.literal('no'),
});

const formSchema = z.discriminatedUnion('warn', [warnSchema, rejectSchema]);

interface ChildProps {
  productId: number;
  closeSheet: () => void;
  reportId: number;
  reporterEmail: string;
  userId: number;
  reportedUser: string;
  reportReason: string;
  reportInformation: string;
  ticketStatusId: number;
  warnReason?: string;
  warnReasonDetail?: string;
  reportDate: string;
}

export default function ProductActionDetails({
  productId,
  closeSheet,
  reportId,
  reporterEmail,
  userId,
  reportedUser,
  reportReason,
  reportInformation,
  ticketStatusId,
  warnReason,
  warnReasonDetail,
  reportDate,
}: ChildProps) {
  // get categories
  const { data, isLoading } = useQuery(['product_report_categories'], () =>
    reportCategoriesAPI(2)
  );

  const queryClient = useQueryClient();

  const { mutate: sendWarn, isLoading: isSending } = useMutation(warnAPI, {
    onSuccess: (response) => {
      if (response.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ['product_reports'],
        });
        toast(
          <>
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
            <p>Successfully warned user and product removed.</p>
          </>
        );
      }
      closeSheet();
    },
  });

  const { mutate: sendRejection } = useMutation(ticketAPI, {
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ['product_reports'],
        });
        toast(
          <>
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
            <p>Successfully rejected ticket.</p>
          </>
        );
      }
      closeSheet();
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      category: '',
    },
    shouldUnregister: true,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('hello');
    if (values.warn === 'warn') {
      sendWarn({
        userId: userId,
        reportId: reportId,
        reportCategoryId: parseInt(values.category),
        warnReasonDetail: values.description,
        productId: productId,
      });
    }

    if (values.warn === 'no') {
      sendRejection({ reportId: reportId, ticketStatusId: 3 });
    }
  }

  const warn = form.watch('warn');

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Product report</SheetTitle>
      </SheetHeader>
      <SheetDescription className="flex flex-col gap-2 mt-2">
        <ScrollArea className="h-[90vh] self-center w-full pr-4">
          <div className="mx-1 flex flex-col gap-3">
            <div>
              <p className="font-bold">Report ID</p>
              <p>{reportId}</p>
            </div>
            <div>
              <p className="font-bold">Reporter's email</p>
              <p>{reporterEmail}</p>
            </div>
            <div>
              <p className="font-bold">Reported user</p>
              <p>{reportedUser}</p>
            </div>
            <div>
              <p className="font-bold">Report reason</p>
              <p>{reportReason}</p>
            </div>
            <div>
              <p className="font-bold">Report detail</p>
              <p>{reportInformation}</p>
            </div>
            <div>
              <p className="font-bold">Link</p>
              <a
                className="hover:text-primary underline"
                href={`${import.meta.env.VITE_WEB_URL}/product/${productId}`}
                target="_blank"
              >
                {`${import.meta.env.VITE_WEB_URL}/product/${productId}`}
              </a>
            </div>
            <div>
              <p className="font-bold">Report date</p>
              <p>{reportDate}</p>
            </div>

            <Separator className="mt-2 mb-2" />

            {ticketStatusId === 2 ? (
              <>
                <div>
                  <p className="font-bold">Warn reason</p>
                  <p>{warnReason}</p>
                </div>
                <div>
                  <p className="font-bold">Warn detail</p>
                  <p>{warnReasonDetail}</p>
                </div>
              </>
            ) : null}

            {ticketStatusId === 1 ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="warn"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>
                          Remove this product and issue warning? <Required />
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="warn" />
                              </FormControl>
                              <FormLabel className="font-normal">Yes</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">No</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {warn === 'warn' ? (
                    <>
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Reason
                              <Required />
                            </FormLabel>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                              <SelectContent className="">
                                {data!.data.map(
                                  (value: {
                                    report_category_name: string;
                                    report_category_id: string;
                                  }) => {
                                    return (
                                      <SelectItem
                                        key={value.report_category_id}
                                        value={value.report_category_id.toString()}
                                        className="hover:bg-primary/10"
                                      >
                                        {value.report_category_name}
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
                            <FormLabel>
                              Detail <Required />
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
                    </>
                  ) : null}

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
                    <SubmitButton isLoading={isSending} type="submit">
                      Close ticket
                    </SubmitButton>
                  </SheetFooter>
                </form>
              </Form>
            ) : (
              <SheetFooter>
                <SheetClose className="w-full">
                  <Button variant="secondary" type="button" className="w-full">
                    Cancel
                  </Button>
                </SheetClose>
              </SheetFooter>
            )}
          </div>
        </ScrollArea>
      </SheetDescription>
    </SheetContent>
  );
}
