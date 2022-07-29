import styled from 'styled-components';
import { MainButton, MainInput } from '../../styles';

export const StyledNav = styled.nav`
  background-color: #fff;
  width: 100%;
  height: 49px;
  border-bottom: 1px solid #edefe1;
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1;

  .logo-wrapper {
    display: flex;
    width: 110px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: inherit;
    cursor: pointer;

    .title {
      margin-left: 10px;
      font-weight: 600;
      font-size: 22px;
    }
  }

  .buttons {
    width: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: inherit;
  }

  .user-button {
    height: 36px;
    width: fit-content;
    padding: 5px;
    background-color: #fff;
    border-radius: 4px;
    border: 0px;
    display: flex;
    align-items: center;
    margin: 0 auto;

    .ava_wrapper{ 
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 2px;
    }

    :hover {
      border: 1px solid #edeff1;
      transition: 0s;
    }
  }
`;

export const OutlineNavButton = styled(MainButton)`
  color: #0079d3;
  border: 1px solid #0079d3;
  background-color: #fff;

  :hover {
    background-color: rgba(0, 121, 211, 0.1);
  }
`;

export const SearchWrapper = styled.div`
  width: 60%;
  max-width: 600px;
  margin: 0px 20px 0 40px;
  position: relative;

  .search_icon {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    }
`;

export const InputWithIcon = styled(MainInput)`
  padding: 5px 5px 5px 40px;
`;
