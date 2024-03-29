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

export const MainInput = styled.input`
  font-size: 15px;
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
    background-color: #878a8c;
  }
`;

export const MainButton = styled.button<{ width?: string, height?: string }>`
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  text-align: center;
  border-radius: 25px;
  height:${({height}) => height || '32px'};
  margin-right: 5px;
  min-width: ${({width}) => width || '90px'};
  color: #fff;
  background-color: #0079d3;

  :hover {
    background-color: rgba(0, 121, 211, 0.9);
  }

  :disabled {
    background-color: #848484;
    color: #C1C1C1;
  }
`;

export const FooterButton = styled.button`
  display: flex;
  background-color: inherit;
  color: #878a8c;
  font-size: 12px;
  border-radius: 2px;
  margin-right: 4px;
  font-weight: 700;

  span {
    margin-left: 3px;
  }

  :hover {
    background-color: #f6f7f8;
  }

  :disabled {
    cursor: default;

    :hover {
      background-color: inherit;
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 3fr) 1fr;
  margin-top: 16px;
  gap: 24px;
`;