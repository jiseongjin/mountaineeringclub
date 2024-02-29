import styled from 'styled-components';
import { ImGithub } from 'react-icons/im';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <StFooterContainer>
      © 2024. React Five 🖐🏻 Co. all rights reserved.
      <StFooterLink to="https://github.com/jiseongjin/mountaineeringclub">
        <ImGithub />
      </StFooterLink>
    </StFooterContainer>
  );
}

export default Footer;

const StFooterContainer = styled.div`
  position: relative;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 50px;
  padding-bottom: 50px;
  user-select: none;

  & footer {
    font-weight: 500;
  }
`;

const StFooterLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    width: 25px;
    height: 25px;
  }
`;
