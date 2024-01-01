import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { sendEmailVerificationlAPI } from '@/services/verify-email-api';
import { useMutation } from 'react-query';

export default function VerifyEmailAlert() {
  const { mutate, isLoading } = useMutation(sendEmailVerificationlAPI, {});

  async function onSubmit() {
    mutate();
  }

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
              verify it
            </p>
          </CardContent>
          <CardFooter className="self-center gap-1">
            {isLoading ? (
              <Button disabled className="w-full" type="submit">
                <l-ring-2
                  size="15"
                  stroke="2"
                  stroke-length="0.25"
                  bg-opacity="0.1"
                  speed="0.8"
                  color="black"
                />
              </Button>
            ) : (
              <Button className="w-full" type="submit" onClick={onSubmit}>
                <p>Send verification email</p>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
