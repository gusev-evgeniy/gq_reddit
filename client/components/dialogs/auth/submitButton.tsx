import React, { FC } from 'react';
import { FormButton } from '../styles';

type Props = {
  disabled: boolean;
  loading: boolean;
};

export const SubmitButton: FC<Props> = ({ disabled, loading }) => {
  return (
    <FormButton>
      <button type='submit' disabled={disabled} className='button'>
        {loading ? (
          <svg className='spinner' viewBox='0 0 50 50'>
            <circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='5'></circle>
          </svg>
        ) : (
          'Submit'
        )}
      </button>
    </FormButton>
  );
};
