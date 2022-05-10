import styled from 'styled-components';

export const StyledItem = styled.div`
  background-color: #fff;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
  overflow: hidden;
`;

export const StyledPaddingItem = styled(StyledItem)`
  padding: 10px 12px;
`;

export const StyledTopicName = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #1a1a1b;
  padding-bottom: 10px;
`;

export const Ava = styled.div`
  border-radius: 100%;
  width: 100%;
  height: 100%;
  background-color: #ccc;
`;

export const MainInput = styled.input`
  font-size: 16px;
  line-height: 16px;
  color: #1c1c1c;
  height: 36px;
  width: 100%;
  border: 1px solid #edeff1;
  background-color: #f6f7f8;
  border-radius: 4px;
  outline: none;
  padding: 5px;

  :hover {
    background-color: #fff;
    border: 1px solid #0079d3;
  }
`;


export const ButtonIcon = styled.button`
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  background-color: inherit;
  color: #0079d3;
  border-radius: 4px;
  
  :hover {
    background-color: #f6f7f8;
  }

  :active {
    background-color:  #878A8C;
  }
`;