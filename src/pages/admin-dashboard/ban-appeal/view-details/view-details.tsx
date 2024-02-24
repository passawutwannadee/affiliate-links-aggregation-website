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
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';
import { SubmitButton } from '@/components/ui/submit-button';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ticketAPI, unbanAPI } from '@/services/admin-api';

const unbanSchema = z.object({
  unban: z.literal('unban'),
  // description: z
  //   .string()
  //   .min(10, {
  //     message: 'Report detail must be at least 10 characters.',
  //   })
  //   .max(160, {
  //     message: 'Report detail must not be longer than 30 characters.',
  //   }),
  // category: z.string().nonempty({
  //   message: 'Please enter product name.',
  // }),
});

const rejectSchema = z.object({
  unban: z.literal('no'),
});

const formSchema = z.discriminatedUnion('unban', [unbanSchema, rejectSchema]);

interface ChildProps {
  closeSheet: () => void;
  appealId: number;
  userId: number;
  username: string;
  banId: number;
  banReason: string;
  banReasonDetail: string;
  appealInformation: string;
}

export default function TicketDetails({
  closeSheet,
  appealId,
  userId,
  username,
  banId,
  banReason,
  banReasonDetail,
  appealInformation,
}: ChildProps) {
  const queryClient = useQueryClient();

  const { mutate: sendUnban } = useMutation(unbanAPI, {
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ['ban_appeals'],
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
            <p>User successfully unbanned.</p>
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
          queryKey: ['ban_appeals'],
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
    shouldUnregister: true,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.unban === 'unban') {
      sendUnban({
        appealId: appealId,
        banId: banId,
        userId: userId,
      });
    }

    if (values.unban === 'no') {
      sendRejection({ appealId: appealId, ticketStatusId: 3 });
    }
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Report</SheetTitle>
      </SheetHeader>
      <SheetDescription className="flex flex-col gap-2">
        <div>
          <p className="font-bold">Username</p>
          <p>{username}</p>
        </div>
        <div>
          <p className="font-bold">Ban Reason</p>
          <p>{banReason}</p>
        </div>
        <div>
          <p className="font-bold">Ban Detail</p>
          <p>{banReasonDetail}</p>
        </div>

        <div>
          <p className="font-bold">Appeal Infomation</p>
          <p>{appealInformation}</p>
        </div>

        <Separator className="mt-6 mb-6" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="unban"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Unban this user?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="unban" />
                        </FormControl>
                        <FormLabel className="font-normal">Unban</FormLabel>
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

            {/* {warn === 'warn' ? (
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
                      <FormLabel>Detail</FormLabel>
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
            ) : null} */}

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
              <SubmitButton type="submit">Close Ticket</SubmitButton>
            </SheetFooter>
          </form>
        </Form>
      </SheetDescription>
    </SheetContent>
  );
}
