import { useState, useEffect } from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

import LogoImg from '../images/logo_esco.png'


function ResetPassword() {
  const location = useLocation()
  const history = useHistory()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [repeatSenha, setRepeatSenha] = useState("")
  const [token, setToken] = useState(null)

  useEffect(() => {
    const params = location.search
    const token = params.split("=")[1]
    setToken(token ? token : null)
  }, [location])

  useEffect(() => {
    if (token) {
      axios.get(`https://app-esco.mageda.com.br/api/user/recover-password/${token}`)
      .then(response => {
        setEmail(response.data.data.email)
      })
      .catch(() => {
        toast.info('Token inválido, solicite um novo token!', {
          autoClose: 5000
        })
      })
    }
  }, [token])

  function handleSubmit(event) {
    event.preventDefault()
    if (senha === repeatSenha) {
      const data = {
        token: token,
        email: email,
        new_password: senha
      }
      axios.post('https://app-esco.mageda.com.br/api/user/recover-password', data)
      .then(response => {
        const dataLogin = {
          email: response.data.data.email,
          password: senha
        }
        axios.post('https://app-esco.mageda.com.br/api/auth/login', dataLogin)
        .then(response => {
          window.localStorage.setItem('esco_token', response.data.access_token)
          window.localStorage.setItem('esco_user_id', response.data.user.id)
          toast.info('Bem-Vindo!', {
            autoClose: 5000
          })
          history.push("/dashboard")
        })
        .catch(error => {
          if (error.response?.status === 401) {
            toast.info('Usuário ou senha incorreto!', {
              autoClose: 5000
            })
          } else {
            toast.info('Erro ao se conectar com o servidor!', {
              autoClose: 5000
            })
          }
        })
      })
      .catch(() => {
        toast.info("Erro ao se conectar com o servidor, verifique sua internet!", {
          autoClose: 5000
        })
      })
    } else {
      toast.info('As senhas estão divergentes, corrija e tente novamente!', {
        autoClose: 5000
      })
    }
  }

  return (
    <Body>
      <div className="container">
        <div className="row">
          <Logo>
            <Link to="/">
              <img src={LogoImg} alt="Esco" width={250} height={ 154 } />
            </Link>
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
                disabled
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
                type="password" 
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
      color: #333;
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
