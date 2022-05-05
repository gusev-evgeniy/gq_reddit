import React, { useState } from 'react';import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AuthWrapper } from './authWrapper';

import { FormButton, FormInput } from '../styles';
import { useLazyQuery, useMutation } from '@apollo/client';
import { LOGIN, SIGN_UP } from '../../../api/auth';

const nameValidateMessage = 'Username must be between 3 and 20 characters';

const schema = yup
  .object({
    login: yup.string().min(3, nameValidateMessage).max(20, nameValidateMessage).required(),
    password: yup.string().required(),
  })
  .required();

export const Login = () => {
  const [error, setError] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [login] = useLazyQuery(LOGIN);

  const onSubmit = async (formData: object) => {
    console.log('formData', formData);
    try {
      await login({ variables: { ...formData } });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const disabled = Object.keys(dirtyFields).length < 2;

  return (
    <AuthWrapper>
      <>
        <h2>Log in</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

          <FormInput isError={errors.login?.message || error}>
            <input placeholder=' ' {...register('login')} />
            <label htmlFor='login'>USERNAME</label>
            <p>{errors.login?.message}</p>
          </FormInput>

          <FormInput isError={errors.password?.message || error}>
            <input placeholder=' ' type='password' {...register('password')} />
            <label htmlFor='password'>PASSWORD</label>
          </FormInput>

          {!!error && <p>{error}</p>}

          <FormButton type='submit' disabled={disabled} className='button' />
        </form>
      </>
    </AuthWrapper>
  );
};
