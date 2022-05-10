import styled from 'styled-components';
import { ButtonIcon } from '../../styles';

export const StyledSort = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .buttons {
    display: flex;
  }
`;

export const StyledSortButton = styled(ButtonIcon)`
  margin-right: 8px;
  padding: 6px 8px;
  border-radius: 20px;

  :hover {
    background-color: #f6f7f8;
  }

  :active {
    background-color:  #878A8C;
  }
`;

