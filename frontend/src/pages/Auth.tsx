import React from 'react';
import styled from 'styled-components';
import Passport from '../auth/Passport';

const Container = styled.div`
  align-self: center;
`;
const Spacer = styled.div`
  margin-top: 1rem;
`;

const Brand = styled.h1`
  font-family: 'Josefin Slab';
  margin-left: 1rem;
  color: white;
  font-weight: bold;
  font-size: 5rem;
  padding-bottom: 0.6rem;
  user-select: none;
`;

const Auth: React.FC = () => {
  return (
    <Container>
      <div className='flex flex-align-center'>
        <img src='/qoed_with_logo_white_48.png' alt='logo' height='45' />
        <Brand>notes</Brand>
      </div>
      <Spacer />
      <Passport />
    </Container>
  );
};

export default Auth;
