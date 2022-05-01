import styled from 'styled-components';

export const StyledSort = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .buttons {
    display: flex;
  }
`;

export const StyledSortButton = styled.button`
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  background-color: inherit;
  color: #0079d3;
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