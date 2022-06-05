import styled from 'styled-components';
import { StyledItem } from '../../styles';

export const ProfileWrapper = styled(StyledItem)`
  position: relative;
  height: 300px;

  .background_image {
    width: 100%;
    height: 94px;
    background-color: #33a8ff;
  }

  .user_image_wrapper {
    background-color: #fff;
    padding: 4px;
    position: absolute;
    border-radius: 4px;
    left: 10px;
    top: 40px;
  }

  .data {
    width: 100%;
    margin-top: 27px;
    padding: 13px;

    .name {
      font-weight: 600;
      margin-bottom: 10px;
    }

    .info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 50px;

      h6 {
        font-weight: 500;
        font-size: 14px;
        padding-bottom: 4px;
      }

      p {
        font-size: 12px;
        font-weight: 400;
        color: #7c7c7c;
      }

      .info_day {
        margin-right: 20px;
      }
    }
  }
`;

export const UserImage = styled(StyledItem)<{ backgroundImage: string }>`
  height: 80px;
  width: 80px;
  background-color: #ccc;
  position: relative;
  background-size: cover;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})` || ''};

  .upload {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: none;

    input {
      display: none;
    }
  }

  :hover {
    .upload {
      display: flex;
    }
  }
`;
