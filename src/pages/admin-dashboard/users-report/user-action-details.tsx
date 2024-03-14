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
import { banAPI, ticketAPI } from '@/services/admin-api';
import { ScrollArea } from '@/components/ui/scroll-area';

const banSchema = z.object({
  ban: z.literal('ban'),
  description: z
    .string()
    .min(10, {
      message: 'Detail must be at least 10 characters.',
    })
    .max(255, {
      message: 'Detail must not be longer than 255 characters.',
    }),
  category: z.string().nonempty({
    message: 'Please enter product name.',
  }),
});

const rejectSchema = z.object({
  ban: z.literal('no'),
});

const formSchema = z.discriminatedUnion('ban', [banSchema, rejectSchema]);

interface ChildProps {
  username: string;
  closeSheet: () => void;
  reportId: number;
  reporterEmail: string;
  userId: number;
  reportedUser: string;
  reportReason: string;
  reportInformation: string;
  ticketStatusId: number;
  banReason?: string;
  banReasonDetail?: string;
}

export default function UserActionDetails({
  username,
  closeSheet,
  reportId,
  reporterEmail,
  userId,
  reportedUser,
  reportReason,
  reportInformation,
  ticketStatusId,
  banReason,
  banReasonDetail,
}: ChildProps) {
  // get categories
  const { data, isLoading } = useQuery(['user_report_categories'], () =>
    reportCategoriesAPI(1)
  );

  const queryClient = useQueryClient();

  const { mutate: sendBan, isLoading: isSending } = useMutation(banAPI, {
    onSuccess: (response) => {
      if (response.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ['user_reports'],
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
            <p>User successfully banned.</p>
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
          queryKey: ['user_reports'],
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
    if (values.ban === 'ban') {
      sendBan({
        userId: userId,
        reportId: reportId,
        reportCategoryId: values.category,
        banReason: values.description,
      });
    }

    if (values.ban === 'no') {
      sendRejection({ reportId: reportId, ticketStatusId: 3 });
    }
  }

  const ban = form.watch('ban');

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Report</SheetTitle>
      </SheetHeader>
      <SheetDescription className="flex flex-col gap-2">
        <ScrollArea className="h-[90vh] self-center w-full pr-4">
          <div className="mx-1">
            <div>
              <p className="font-bold">Report ID</p>
              <p>{reportId}</p>
            </div>
            <div>
              <p className="font-bold">Reporter's Email</p>
              <p>{reporterEmail}</p>
            </div>
            <div>
              <p className="font-bold">Reported User</p>
              <p>{reportedUser}</p>
            </div>
            <div>
              <p className="font-bold">Report Reason</p>
              <p>{reportReason}</p>
            </div>
            <div>
              <p className="font-bold">Report Detail</p>
              <p>{reportInformation}</p>
            </div>
            <div>
              <p className="font-bold">Link</p>
              <a
                className="hover:text-primary underline"
                href={`${import.meta.env.VITE_WEB_URL}/profile/${username}`}
                target="_blank"
              >
                {`${import.meta.env.VITE_WEB_URL}/profile/${username}`}
              </a>
            </div>
            <Separator className="mt-6 mb-6" />

            {ticketStatusId === 2 ? (
              <>
                <div>
                  <p className="font-bold">Ban Reason</p>
                  <p>{banReason}</p>
                </div>
                <div>
                  <p className="font-bold">Ban Detail</p>
                  <p>{banReasonDetail}</p>
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
                    name="ban"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>
                          Ban this user? <Required />
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="ban" />
                              </FormControl>
                              <FormLabel className="font-normal">Ban</FormLabel>
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

                  {ban === 'ban' ? (
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
                        Cancel
                      </Button>
                    </SheetClose>
                    <SubmitButton isLoading={isSending} type="submit">
                      Close Ticket
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
