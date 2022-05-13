import React, { useState, FC, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AuthWrapper } from './authWrapper';

import { AlertMessage, FormInput, SuccessMessage } from '../styles';
import { DialogProps } from '../type';
import { SubmitButton } from './submitButton';
import { RegistrMutationVariables, useRegistrMutation } from '../../../generated/graphql';
import { UserContext } from '../../../context/user';

const nameValidateMessage = 'Username must be between 3 and 20 characters';
const passwordValidateMessage = 'Password must be at least 6 characters long';

const schema = yup
  .object({
    email: yup.string().email('That email is invalid').required(),
    login: yup.string().min(3, nameValidateMessage).max(20, nameValidateMessage).required(),
    password: yup.string().min(6, passwordValidateMessage).required(),
  })
  .required();

export const SignUp: FC<DialogProps> = ({ onClose }) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);

  const [, setUser] = useContext(UserContext)!;

  const [registr, { loading, data }] = useRegistrMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<RegistrMutationVariables>({
    resolver: yupResolver(schema),
  });

  
  const onSubmit = async (formData: RegistrMutationVariables) => {
    try {
      await registr({variables: {... formData}});
      setError(undefined);
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setUser && setUser(data?.registr);
        onClose();
      }, 3000);
    }

  }, [success, onClose, data, setUser]);
  

  const disabled = Object.keys(dirtyFields).length < Object.keys(schema.fields).length;

  return (
    <AuthWrapper>
      <>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <FormInput isError={Boolean(errors.email?.message || error)}>
            <input placeholder=' ' {...register('email')} />
            <label htmlFor='email'>EMAIL</label>
            <p>{errors.email?.message}</p>
          </FormInput>

          <FormInput isError={Boolean(errors.login?.message || error)}>
            <input placeholder=' ' {...register('login')} />
            <label htmlFor='login'>USERNAME</label>
            <p>{errors.login?.message}</p>
          </FormInput>

          <FormInput isError={Boolean(errors.password?.message || error)}>
            <input placeholder=' ' type='password' {...register('password')} />
            <label htmlFor='password'>PASSWORD</label>
            <p>{errors.password?.message}</p>
          </FormInput>

          <SubmitButton disabled={disabled} loading={loading}/>

          {!!error && <AlertMessage>{error}</AlertMessage>}
          {success && (
            <SuccessMessage>
              User created successful.
              <br />
              You will be directed to start page
            </SuccessMessage>
          )}
        </form>
      </>
    </AuthWrapper>
  );
};
