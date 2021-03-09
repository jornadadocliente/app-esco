import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import api from '../services/api'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

import LogoImg from '../images/logo_esco.png'


function Login() {
  const history = useHistory()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    if (email !== "" && senha !== "") {
      const data = {
        email,
        password: senha
      }
      api.post('/auth/login', data)
      .then(response => {
        window.localStorage.setItem('token', response.data.token)
        toast.info('Bem-Vindo!', {
          autoClose: 5000
        })
        history.push("/dashboard")
      })
      .catch(error => {
        console.log(error)
        toast.info('Erro ao se conectar com o servidor!', {
          autoClose: 5000
        })
      })
    } else {
      toast.info('Preencha os campos corretamente!', {
        autoClose: 5000
      })
    }
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
              Faça seu login.
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
              <label htmlFor="password">Senha</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Digite sua senha" 
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />

              <button type="submit" >
                ENTRAR
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

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`

export default Login;
