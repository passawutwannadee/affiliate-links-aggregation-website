/* eslint-disable react-hooks/exhaustive-deps */
import { ErrorAlert } from '@/components/ui/error-alert';
import { verifyEmailAPI } from '@/services/verify-email-api';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
// import { toast } from 'sonner';

export default function VerifyEmail() {
  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get('token');

  const navigate = useNavigate();
  // const { mutate } = useMutation(['user_data'], verifyEmailAPI, {
  //   onSuccess: (response) => {
  //     if (response.status === 200) {
  //       toast(
  //         <>
  //           {' '}
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke-width="1.5"
  //             stroke="currentColor"
  //             data-slot="icon"
  //             className="w-6 h-6"
  //           >
  //             <path
  //               stroke-linecap="round"
  //               stroke-linejoin="round"
  //               d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  //             />
  //           </svg>
  //           <p>Successfully verified email.</p>
  //         </>
  //       );
  //       navigate('/');
  //     }
  //   },
  // });

  const {} = useQuery(['product_categories'], () => verifyEmailAPI(token!), {
    retry: 0,
    onSuccess: (response) => {
      if (response.status === 200) {
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
            <p>Successfully verified email.</p>
          </>
        );
      }
      navigate('/');
    },
    onError: (response: any) => {
      if (response.status === 409) {
        console.log('hello');
        toast(
          <>
            <ErrorAlert>Your email is already verified.</ErrorAlert>
          </>
        );
      }
      navigate('/');
    },
  });

  // useEffect(() => {
  // }, []);

  return <></>;
}
