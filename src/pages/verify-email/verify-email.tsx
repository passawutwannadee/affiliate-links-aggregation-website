/* eslint-disable react-hooks/exhaustive-deps */
import { verifyEmailAPI } from '@/services/verify-email-api';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function VerifyEmail() {
  const { email_verify_token } = useParams<string>();

  const navigate = useNavigate();
  const { mutate } = useMutation(['user_data'], verifyEmailAPI, {
    onSuccess: (response) => {
      navigate('/');
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
    },
  });

  useEffect(() => {
    mutate(email_verify_token!);
  }, []);

  return <></>;
}
