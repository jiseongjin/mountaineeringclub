import styled from 'styled-components';
import { LiaMountainSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <StContainer>
      <StBox>
        <Link to="/">
          <LiaMountainSolid />
        </Link>
        <StNotice>Not Found</StNotice>
      </StBox>
    </StContainer>
  );
};

const StContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

const StBox = styled.div`
  width: 100%;
  text-align: center;

  & svg {
    width: 200px;
    height: 200px;
    color: var(--main-color);

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const StNotice = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #797979;
`;

export default NotFound;
