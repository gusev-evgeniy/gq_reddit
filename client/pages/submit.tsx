import React, { FC } from 'react';
import { Form } from '../components/editor/form';
import { SubmitTitle } from '../components/editor/styles';

const Submit: FC = () => {
  return (
    <div className='container'>
      <div className='main_page'>
        <div>
          <SubmitTitle>
            <h2>Create a post</h2>
          </SubmitTitle>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Submit;
