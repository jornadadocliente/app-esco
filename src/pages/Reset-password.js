import { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

import LogoImg from '../images/logo_esco.png'


function ResetPassword() {

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [repeatSenha, setRepeatSenha] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    
  }

  return (
    <Body>
      <div className="container">
        <div className="row">
          <Logo>
            <img src={LogoImg} alt="Esco" width={250} height={ 154 } />
          </Logo>
          <LoginCard>
            <h2>
              Recuperar Senha
            </h2>
            <form onSubmit={ event => handleSubmit(event) }>
              <label htmlFor="email">E-mail</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Digite seu e-mail Esco" 
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <label htmlFor="password">Nova senha</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Digite sua nova senha" 
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
              <label htmlFor="password">Repita a nova senha</label>
              <input 
                type="new_password" 
                id="new_password" 
                name="new_password" 
                placeholder="Digite sua nova senha novamente" 
                value={repeatSenha}
                onChange={(event) => setRepeatSenha(event.target.value)}
              />

              <button type="submit" >
                ENVIAR
              </button>
            </form>
          </LoginCard>
        </div>
      </div>

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        pauseOnHover
      />
    </Body>
  );
}

const Body = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #DB1015;

  .row {
    align-items: center;
  }
`

const Logo = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;

  img {
    width: 250px;
    height: auto;
    object-fit: contain;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`

const LoginCard = styled.div`
  background-color: #FFF;
  border-radius: 3px;
  width: 50%;
  padding: 24px 32px;
  margin: 16px 0;

  h2 {
    color: #043455;
    font-size: 24px;
    font-weight: bold;
    margin: 24px 0;
  }

  form {
    display: flex;
    flex-direction: column;
    
    label {
      color: #043455;
      font-size: 14px;
      font-weight: 500;
      margin: 16px 0 8px;
    }

    input {
      padding: 16px 24px;
      background-color: rgba(176,176,176,0.1);
      color: #B0B0B0;
      border-radius: 3px;
      border: none;
    }

    button {
      background: #BC080D;
      color: #FFF;
      font-size: 16px;
      padding: 16px 24px;
      margin: 24px 0;
      text-align: center;
      border: none;
      transition: background-color 0.4s;

      &:hover {
        background: #9e080c;
      }
    }
  }

  .forget_password {
    color: #999;
    display: flex;
    margin-left: auto;
    width: max-content;
    background: transparent;
    border: none;
    text-decoration: underline;
    cursor: pointer;
    padding: 8px 0;
    outline: none;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`

export default ResetPassword;
