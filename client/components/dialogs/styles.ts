import styled from 'styled-components';export const DialogWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .dialog {
    min-width: 100px;
    max-width: 100vw;
    max-height: 100vh;
    min-height: 100px;
    background-color: #fff;
    border-radius: 4px;
    overflow-x: hidden;
    overflow-y: auto;
    position: absolute;
  }

  .sign_up {
    display: flex;
    max-width: 850px;
    width: 90vw;
    height: 450px;

    h2 {
      font-size: 18px;
      font-weight: 500;
      line-height: 22px;
    }

    .image_side {
      width: 156px;
      background-repeat: no-repeat;
      background-position: center;
      position: relative;
      background-image: url(https://www.redditstatic.com/accountmanager/bbb584033aa89e39bad69436c504c9bd.png);
    }

    .form_side {
      padding: 80px 24px 50px 15px;
    }
  }

  .error_message {
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    color: #ea0027;
    transition: all 0.2s ease-in-out;
    margin-top: 20px;
  }
`;

export const AlertMessage = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: #ea0027;
  transition: all 0.2s ease-in-out;
  margin-top: 20px;
`;

export const SuccessMessage = styled(AlertMessage)`
  color: #0079d3;
`;

export const CloseButton = styled.button`
  background-color: inherit;
  border-radius: 100%;
  position: absolute;
  top: 5px;
  right: 5px;

  :hover {
    background-color: #f6f7f8;
  }
`;

export const FormInput = styled.div<{ isError: boolean }>`
  position: relative;
  margin-top: 20px;
  transition: all 0.2s ease-in-out;

  input {
    height: 48px;
    width: 280px;
    padding: 22px 12px 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background-color: #fcfcfb;
    outline: none;
    border-color: ${({ isError }) => (isError ? '#ea0027' : 'rgba(0, 0, 0, 0.1)')};

    :hover ~ label,
    :not(:placeholder-shown) ~ label {
      background-color: inherit;
      font-size: 8px;
      top: 4px;
      /* label {
        font-size: 8px;
        top: 4px;
      } */
    }
  }

  label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.5px;
    line-height: 12px;
    position: absolute;
    display: inline-block;
    vertical-align: middle;
    top: 14px;
    left: 12px;
    color: #a5a4a4;
    transition: all 0.2s ease-in-out;
    pointer-events: none;
    line-height: 23px;
  }

  p {
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    margin-top: 4px;
    max-height: 1000px;
    opacity: 1;
    color: #ea0027;
    transition: all 0.2s ease-in-out;
  }
`;

export const FormButton = styled.div`
  cursor: pointer;
  position: relative;
  height: 100%;
  width: 100%;

  button {
    font-size: 14px;
    width: 100%;
    font-weight: 700;
    letter-spacing: unset;
    line-height: 18px;
    text-transform: unset;
    background: #0079d3;
    border-radius: 999px;
    color: #fff;
    height: 100%;
    padding: 0 16px;
    border: none;

    :hover {
      background-color: rgba(0, 121, 211, 0.9);
    }

    :disabled {
      background-color: #8e8e8e;
      color: rgba(255, 255, 255, 0.5);
      cursor: not-allowed;
    }
  }

  .spinner {
    z-index: 2000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25px;
    height: 25px;

    & .path {
      stroke: #fff;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export const AuthButtonWrapper = styled.div`
  margin-top: 20px;
  height: 40px;
  width: 120px;
`;
