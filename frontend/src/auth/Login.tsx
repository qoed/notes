import React from 'react';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import AuthContext from '../store/auth-context';
import Button from '../UI/Button';

const FormField = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
  & label {
    display: block;
  }

  & input {
    background-color: var(--primary);
    border: none;
    border-bottom: 1px solid var(--primary-dark);
    border-radius: 0.2rem;
    padding: 0.4rem;
    font-family: inherit;
    font-size: inherit;
  }

  & input:focus {
    outline: none;
    background-color: var(--info);
  }
`;

const LoginBox = styled.div`
  border: 1px solid var(--primary);
  padding: 1rem;
  width: min-content;
  border-radius: 0.2rem;
`;

const Login: React.FC<{}> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authCtx = useContext(AuthContext);

  function handleEmailInput(e: React.FormEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value);
  }

  function handlePasswordInput(e: React.FormEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    await authCtx.login(email, password);
  }

  return (
    <LoginBox>
      <form onSubmit={handleSubmit}>
        <FormField>
          <label>Email</label>
          <input type='text' value={email} onInput={handleEmailInput} />
        </FormField>
        <FormField>
          <label>Password</label>
          <input type='password' value={password} onInput={handlePasswordInput} />
        </FormField>
        <Button darkOutline type='submit' className='mt-1'>
          Login
        </Button>
      </form>
    </LoginBox>
  );
};

export default Login;
