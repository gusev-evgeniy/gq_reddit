import React, { FC } from 'react';
import { Form } from '../components/editor/form';
import { SubmitTitle } from '../components/editor/styles';
import { Grid } from '../styles';

const Submit: FC = () => {
  return (
      <Grid>
        <div>
          <SubmitTitle>
            <h2>Create a post</h2>
          </SubmitTitle>
          <Form />
        </div>
      </Grid>
  );
};

export default Submit;
