import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AuthWrapper } from './authWrapper';
import { SubmitButton } from './submitButton';
import { LoginQueryVariables, useLoginLazyQuery } from '../../../generated/graphql';

import { DialogProps } from '../type';

import { AlertMessage, AuthButtonWrapper, FormInput } from '../styles';
import { useAppDispatch } from '../../../store/hooks';
import { setMe } from '../../../store/slices/me';


const nameValidateMessage = 'Username must be between 3 and 20 characters';

const schema = yup
  .object({
    login: yup.string().min(3, nameValidateMessage).max(20, nameValidateMessage).required(),
    password: yup.string().required(),
  })
  .required();

export const Login: FC<DialogProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<LoginQueryVariables>({
    resolver: yupResolver(schema),
  });
  const [login, { loading, data, error: loginError }] = useLoginLazyQuery();

  useEffect(() => {
    if (loginError) {
      setError(true);
    }

    if (!!data?.login && data?.login !== null ) {
      dispatch(setMe(data.login));
      onClose();
    }
  
  }, [data, loginError]);
  
  const onSubmit = (formData: LoginQueryVariables) => {
    login({ variables: { ...formData } });
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
