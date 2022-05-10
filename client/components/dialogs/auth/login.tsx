import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AuthWrapper } from './authWrapper';

import { AlertMessage, FormInput } from '../styles';
import { useLazyQuery } from '@apollo/client';
import { LOGIN } from '../../../api/auth';
import { SubmitButton } from './submitButton';
import { DialogProps } from '../type';

const nameValidateMessage = 'Username must be between 3 and 20 characters';

const schema = yup
  .object({
    login: yup.string().min(3, nameValidateMessage).max(20, nameValidateMessage).required(),
    password: yup.string().required(),
  })
  .required();

export const Login: FC<DialogProps> = ({ onClose }) => {
  const [error, setError] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [login, { loading }] = useLazyQuery(LOGIN);

  const onSubmit = async (formData: object) => {
    try {
      console.log('formData', formData);
      await login({ variables: { ...formData } });
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const disabled = Object.keys(dirtyFields).length < Object.keys(schema.fields).length;

  return (
    <AuthWrapper>
      <>
        <h2>Log in</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <FormInput isError={errors.login?.message || error}>
            <input placeholder=' ' {...register('login')} />
            <label htmlFor='login'>USERNAME</label>
            <p>{errors.login?.message}</p>
          </FormInput>

          <FormInput isError={errors.password?.message || error}>
            <input placeholder=' ' type='password' {...register('password')} />
            <label htmlFor='password'>PASSWORD</label>
          </FormInput>

          <SubmitButton disabled={disabled} loading={loading}/>

          {!!error && <AlertMessage>{error}</AlertMessage>}
        </form>
      </>
    </AuthWrapper>
  );
};