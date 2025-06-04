import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../supabaseConfig';

const Background = styled.div`
  background: linear-gradient(135deg, #1B8AF1, #B58DED);
  height: 100vh;
  width: 100%;
  text-align: center;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h4`
  font-family: 'Segoe UI', sans-serif;
  font-weight: bold;
  font-size: 35px;
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

const LoginBox = styled.div`
  display: inline-block;
  background: #FFFFFF;
  width: 434px;
  height: 700px;
  border-radius: 22px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2),
              0 6px 20px rgba(0, 0, 0, 0.19);
`;

const StyledForm = styled.form`
  display: inline-block;
  align-items: center;
  height: 270px;
  width: 350px;
  margin-bottom: 170px;
`;

const InputContainer = styled.div`
  align-content: center;
  border-radius: 22px;
  margin-bottom: 35px;
  width: 100%;
  height: 64px;
  background: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2),
              0 0 20px rgba(0, 0, 0, 0.19);
`;

const TextInput = styled.input`
  margin-top: 1.2rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  border: none;
  width: 80%;
  outline: none;
`;

const StyledButton = styled.button`
  margin-top: 28px;
  width: 165px;
  height: 60px;
  border-radius: 30px;
  background: #B58DED;
  border: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  color: #FFFFFF;
  box-shadow: 0 4px 8px rgba(181, 141, 237, 0.7),
              0 6px 20px rgba(181, 141, 237, 0.9);
  cursor: pointer;
`;

const LinkText = styled.a`
  color: #0E4579;
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  font-size: 18px;
  cursor: pointer;
  display: block;
  text-decoration: none;
  margin-top: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 5px 0;
  text-align: center;
`;

const Login = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    let result;
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }

    if (result.error) {
      setErrorMsg(result.error.message);
    } else {
      onAuthSuccess?.(result.data);
      if (isLogin && result.data.session?.access_token) {
        localStorage.setItem('access_token', result.data.session.access_token);
        window.location.reload();
      }
    }
  };

  return (
    <Background>
      <LoginBox>
        <Title>{isLogin ? 'Iniciar sesión' : 'Registro'}</Title>
        <StyledForm onSubmit={handleAuth}>
          <InputContainer>
            <TextInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
            />
          </InputContainer>
          <InputContainer>
            <TextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </InputContainer>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
          <StyledButton type="submit">
            {isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </StyledButton>
          <LinkText onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? '¿No tienes una cuenta? Regístrate'
              : '¿Ya tienes una cuenta? Inicia sesión'}
          </LinkText>
        </StyledForm>
      </LoginBox>
    </Background>
  );
};

export default Login;
