import React, { FC } from 'react';
import { TextContent } from '../posts/styled';
import { StyledContent } from './styles';

type Props = {
  content: any[];
  isLarge?: boolean;
};

export const Content: FC<Props> = ({ content = [], isLarge }) => {
  return (
    <StyledContent isLarge={isLarge}>
      {content.map(({ data }, index: number) => {
        const htmlContent = { __html: data.text };

        return <p key={index} dangerouslySetInnerHTML={htmlContent} />;
      })}
    </StyledContent>
  );
};
