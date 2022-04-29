import styled from 'styled-components';

export const StyledNav = styled.nav`
  background-color: #fff;
  width: 100%;
  height: 49px;
  border-bottom: 1px solid #edefe1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo-wrapper {
    display: flex;
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
  
  input {
    font-size: 16px;
    line-height: 16px;
    color: #1c1c1c;
    height: 36px;
    width: 60%;
    border: 1px solid #EDEFF1;
    background-color: #F6F7F8;
    border-radius: 4px;
    margin: 0px 20px 0 40px;
    outline: none;
    padding: 5px 5px 5px 40px;
    
    :hover {
      background-color: #fff;
      border: 1px solid #0079D3;
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
    height: 32px;
    width: 50px;
    padding: 2px 0 2px 0;
    background-color: #fff;;
    border-radius: 4px;
    border: 0px;
    
    :hover {
      border: 1px solid #EDEFF1;
      transition: 0s;
    }
  }
`;

const Button = styled.button`
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  text-align: center;
  border-radius: 25px;
  `;

const NavButton = styled(Button)`
  height: 32px;
  margin-right: 5px;
`;

export const OutlineNavButton = styled(NavButton)`
  color: #0079D3;
  border: 1px solid #0079D3;
  background-color: #fff;
  width: 37%;

  :hover {
    background-color: rgba(0, 121, 211, 0.1);
  }
`;

export const PaintedNavButton = styled(NavButton)`
  color: #fff;
  width: 40%;
  background-color: #0079D3;
  border: 1px solid #0079D3;

  :hover {
    background-color: rgba(0, 121, 211, 0.9);
  }
`;