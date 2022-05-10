import React, { FC } from 'react';
import { Form } from '../components/editor/form';
import { SubmitTitle } from '../components/editor/styles';
import { NavWrapper } from '../components/navigations.tsx';


const Submit: FC = () => {
  return (
    <>
      <NavWrapper>
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
      </NavWrapper>
    </>
  );
};

export default Submit;
