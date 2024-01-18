import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { sendEmailVerificationlAPI } from '@/services/verify-email-api';
import { Loader2 } from 'lucide-react';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

export default function VerifyEmailAlert() {
  const { mutate, isLoading } = useMutation(sendEmailVerificationlAPI, {
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
            <p>Successfully resend verification email.</p>
          </>
        );
      }
    },
  });

  const onSubmit = () => {
    mutate();
  };

  return (
    <>
      <div className="container mx-auto flex items-center justify-center pt-20 lg:pt-0 lg:h-[85vh]">
        <Card className="w-full lg:w-1/4">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Please verify your email address.
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p>
              You'll have limited access to this site's features until you
              verify your email address.
            </p>
          </CardContent>
          <CardFooter className="self-center gap-1">
            {isLoading ? (
              <Button type="submit" className="w-full" disabled>
                <Loader2 className="animate-spin stroke-primary-foreground w-5 h-5 mr-1 stroke-[2.5px]" />
                Resend verification email
              </Button>
            ) : (
              <Button onClick={onSubmit} type="submit" className="w-full">
                Resend verification email
              </Button>
            )}
            {/* //{' '}
            <Button onClick={() => console.log('hello')} type="submit">
              // Resend verification email //{' '}
            </Button> */}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
