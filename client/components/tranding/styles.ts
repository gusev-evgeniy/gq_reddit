import styled from 'styled-components';

export const StyledTrandItem = styled.div`
  border-radius: 8px;
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 160px;
  background-color: rgba(0,0,0,1);
  z-index: 10;
  cursor: pointer;

  :hover {
    img {
      transform: scale(1.05);
      transition: 5s;
    }
  }

.image_wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.8;
}

  img {
    width: 100%;
    position: absolute;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  .info {
    color: #fff;
    position: absolute;
    bottom: 0;
    padding: 10px;

    h6 {
      font-size: 18px;
      font-weight: 600;
      line-height: 22px;
    }

    .description {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 20px;
      max-height: 40px;
    }

    .author {
      font-size: 12px;
      font-weight: 400;
    }
  }
`;