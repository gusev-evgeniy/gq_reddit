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
    background-color: #fff;
    border-radius: 4px;
    border: 0px;

    :hover {
      border: 1px solid #edeff1;
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
  min-width: 90px;
  width: 40%;
`;

export const OutlineNavButton = styled(NavButton)`
  color: #0079d3;
  border: 1px solid #0079d3;
  background-color: #fff;

  :hover {
    background-color: rgba(0, 121, 211, 0.1);
  }
`;

export const PaintedNavButton = styled(NavButton)`
  color: #fff;
  background-color: #0079d3;
  border: 1px solid #0079d3;

  :hover {
    background-color: rgba(0, 121, 211, 0.9);
  }
`;

export const NavigationSearch = styled.div`
  width: 60%;
  margin: 0px 20px 0 40px;
  position: relative;

  input {
    font-size: 16px;
    line-height: 16px;
    color: #1c1c1c;
    height: 36px;
    width: 100%;
    border: 1px solid #EDEFF1;
    background-color: #F6F7F8;
    border-radius: 4px;
    outline: none;
    padding: 5px 5px 5px 40px;
    
    :hover {
      background-color: #fff;
      border: 1px solid #0079D3;
    }
  }

  .search_icon {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    }
  }
`;
