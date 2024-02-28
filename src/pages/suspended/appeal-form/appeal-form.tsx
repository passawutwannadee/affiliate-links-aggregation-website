import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
// import { Label } from "@/components/ui/label"
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useNavigate } from 'react-router-dom';
import { Required } from '@/components/ui/required';
import { useMutation, useQuery } from 'react-query';
import { SubmitButton } from '@/components/ui/submit-button';
import { toast } from 'sonner';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import { Textarea } from '@/components/ui/textarea';
import { banAppealAPI, banReasonAPI } from '@/services/users-api';
import { Loading } from '@/components/ui/loading';

const formSchema = z.object({
  appeal_information: z.string().min(2).max(255).nonempty({
    message: 'Please enter appeal information.',
  }),
});

export default function AppealForm() {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appeal_information: '',
    },
  });

  const { data, isLoading } = useQuery(
    ['ban_info', currentUser],
    () => banReasonAPI(),
    {
      onSuccess: (response) => {
        if (response.data.ticket_status) {
          navigate('/');
        }
        if (response.data.ban_reason_id === 14) {
          navigate('/');
        }
      },
    }
  );

  const { mutate, isLoading: isSending } = useMutation(banAppealAPI, {
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
              className="w-6 h-6 self-start justify-self-start"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p>Successfully sent ban appeal.</p>
          </>
        );
        navigate('/suspended');
      }
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      ban_id: data!.data.ban_id,
      appeal_information: values.appeal_information,
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto flex items-center justify-center mt-36 lg:mt-30 2xl:mt-0 lg:h-[85vh] ">
      <Card className="w-full lg:w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Ban Appeal Form
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input disabled value={currentUser!} />
                </FormControl>
              </FormItem>
              <FormField
                control={form.control}
                name="appeal_information"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Reason for appeal
                      <Required />
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="pt-2 pb-2">
                Note: Appeal form can only be sent once.
              </p>
              <SubmitButton isLoading={isSending}>
                Submit Appeal Form
              </SubmitButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
