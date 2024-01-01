/* eslint-disable react-hooks/exhaustive-deps */
import { verifyEmailAPI } from '@/services/verify-email-api';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

export default function VerifyEmail() {
  const { email_verify_token } = useParams<string>();

  const navigate = useNavigate();
  const { mutate } = useMutation(['user_data'], verifyEmailAPI, {
    onSuccess: () => {
      navigate('/');
    },
  });

  useEffect(() => {
    mutate(email_verify_token!);
  }, []);

  return <></>;
}
