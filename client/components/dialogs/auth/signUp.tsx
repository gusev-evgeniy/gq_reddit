import React, { useState } from 'react';import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AuthWrapper } from './authWrapper';

import { FormButton, FormInput } from '../styles';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../../../api/auth';

const nameValidateMessage = 'Username must be between 3 and 20 characters';
const passwordValidateMessage = 'Password must be at least 6 characters long';

const schema = yup
  .object({
    email: yup.string().email('That email is invalid').required(),
    login: yup.string().min(3, nameValidateMessage).max(20, nameValidateMessage).required(),
    password: yup.string().min(6, passwordValidateMessage).required(),
  })
  .required();

export const SignUp = () => {
  const [error, setError] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [registr] = useMutation(SIGN_UP);

  const onSubmit = async (formData: object) => {
    try {
      const { data } = await registr({ variables: { ...formData } });
      console.log('data', data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const disabled = Object.keys(dirtyFields).length < 3;

  console.log('error', typeof error);

  return (
    <AuthWrapper>
      <>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput isError={errors.email?.message || error}>
            <input placeholder=' ' {...register('email')} />
            <label htmlFor='email'>EMAIL</label>
            <p>{errors.email?.message}</p>
          </FormInput>

          <FormInput isError={errors.login?.message || error}>
            <input placeholder=' ' {...register('login')} />
            <label htmlFor='login'>USERNAME</label>
            <p>{errors.login?.message}</p>
          </FormInput>

          <FormInput isError={errors.password?.message || error}>
            <input placeholder=' ' type='password' {...register('password')} />
            <label htmlFor='password'>PASSWORD</label>
            <p>{errors.password?.message}</p>
          </FormInput>

          {!!error && <p>{error}</p>}

          <FormButton type='submit' disabled={disabled} className='button' />
        </form>
      </>
    </AuthWrapper>
  );
};
