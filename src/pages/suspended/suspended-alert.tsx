import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { RootState } from '@/redux/store/store';
import { banReasonAPI } from '@/services/users-api';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function SuspendedAlert() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { data, isLoading } = useQuery(['ban_info', currentUser], () =>
    banReasonAPI()
  );

  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container mx-auto flex items-center justify-center pt-20 lg:pt-0 lg:h-[85vh]">
        <Card className="w-full lg:w-1/4">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Your account has been suspended.
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p>Reason: {data?.data.ban_reason}</p>
            {data?.data.ticket_status === null &&
            data?.data.ban_reason_id !== 14 ? (
              <p>
                If you believe we are mistaken, please fill and send us appeal
                form or contact loremipsum@loremipsum.lorem.
              </p>
            ) : data?.data.ticket_status !== null ? (
              <p>
                Appeal status:{' '}
                <Badge className="capitalize">{data?.data.ticket_status}</Badge>
              </p>
            ) : null}
          </CardContent>
          <CardFooter className="self-center gap-1">
            {data?.data.ticket_status === null &&
            data?.data.ban_reason_id !== 14 ? (
              <Button
                className="w-full"
                onClick={() => navigate('/appeal-form')}
              >
                Appeal
              </Button>
            ) : null}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
