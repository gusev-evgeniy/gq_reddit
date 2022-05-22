import React, { FC, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AuthWrapper } from './authWrapper';
import { SubmitButton } from './submitButton';
import { LoginQueryVariables, useLoginLazyQuery } from '../../../generated/graphql';
import { UserContext } from '../../../context/user';

import { DialogProps } from '../type';

import { AlertMessage, AuthButtonWrapper, FormInput } from '../styles';


const nameValidateMessage = 'Username must be between 3 and 20 characters';

const schema = yup
  .object({
    login: yup.string().min(3, nameValidateMessage).max(20, nameValidateMessage).required(),
    password: yup.string().required(),
  })
  .required();

export const Login: FC<DialogProps> = ({ onClose }) => {
  const [error, setError] = useState<string | undefined>();
  const [, setUser] = useContext(UserContext)!;
  console.log('error', error);
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<LoginQueryVariables>({
    resolver: yupResolver(schema),
  });
  const [login, { loading, data }] = useLoginLazyQuery();
  console.log('data222', data);
  const onSubmit = async (formData: LoginQueryVariables) => {
    try {
      await login({ variables: { ...formData } });
      console.log('2222222222', data);

      if (setUser && data?.login) {
        setUser && setUser(data?.login);
      }

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
          <FormInput isError={Boolean(errors.login?.message || error)}>
            <input placeholder=' ' {...register('login')} />
            <label htmlFor='login'>USERNAME</label>
            <p>{errors.login?.message}</p>
          </FormInput>

          <FormInput isError={Boolean(errors.password?.message || error)}>
            <input placeholder=' ' type='password' {...register('password')} />
            <label htmlFor='password'>PASSWORD</label>
          </FormInput>

          <AuthButtonWrapper>
            <SubmitButton disabled={disabled} loading={loading}/>
          </AuthButtonWrapper>

          {!!error && <AlertMessage>
            Wrong login or password
            </AlertMessage>}
        </form>
      </>
    </AuthWrapper>
  );
};
