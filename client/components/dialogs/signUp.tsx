import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormButton, FormInput } from './styles';

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
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = data => console.log(data);

  const disabled = Object.keys(dirtyFields).length < 3;

  console.log('errors', errors);

  return (
    <div className='sign_up'>
      <div className='image_side'></div>
      <div className='form_side'>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput isError={errors.email?.message}>
            <input placeholder=' ' {...register('email')} />
            <label htmlFor='email'>EMAIL</label>
            <p>{errors.email?.message}</p>
          </FormInput>

          <FormInput isError={errors.login?.message}>
            <input placeholder=' ' {...register('login')} />
            <label htmlFor='login'>USERNAME</label>
            <p>{errors.login?.message}</p>
          </FormInput>

          <FormInput isError={errors.password?.message}>
            <input placeholder=' ' type='password' {...register('password')} />
            <label htmlFor='login'>USERNAME</label>
            <p>{errors.password?.message}</p>
          </FormInput>

          <FormButton type='submit' disabled={disabled} className='button' />
        </form>
      </div>
    </div>
  );
};
