import { verifyEmailAPI } from '@/services/verify-email-api';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export default function VerifyEmail() {
  let { email_verify_token } = useParams<string>();
  const navigate = useNavigate();
  const { mutate, isLoading, isError, error, data } = useMutation(
    ['user_data'],
    verifyEmailAPI,
    {
      onSuccess: () => {
        navigate('/');
      },
    }
  );

  useEffect(() => {
    mutate(email_verify_token!);
  }, []);

  return <></>;
}
