import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabaseConfig';

const FormContainer = styled.div`
  background-color: #d1bec4;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Toggle = styled.p`
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 5px 0;
  text-align: center;
`;

const Login = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

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
      console.log("uwu", result.data.session.access_token);
      if (isLogin && result.data.session?.access_token) {
        localStorage.setItem('access_token', result.data.session.access_token);
        navigate('/game');
      }
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleAuth}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        <Button type="submit">{isLogin ? 'Iniciar sesión' : 'Registrarse'}</Button>
        <Toggle onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? '¿No tienes una cuenta? Regístrate'
            : '¿Ya tienes una cuenta? Inicia sesión'}
        </Toggle>
      </form>
    </FormContainer>
  );
};

export default Login;
