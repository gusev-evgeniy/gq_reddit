import styled from 'styled-components';

export const StyledItem = styled.div`
  background-color: #fff;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const StyledPaddingItem = styled(StyledItem)`
  padding: 10px 12px;
`;

export const StyledTopicName = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #1A1A1B;
  padding-bottom: 10px;
`;