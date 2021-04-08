import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import api from '../services/api'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { useClearCache } from 'react-clear-cache'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

import LogoImg from '../images/logo_esco.png'


function Login() {
  const history = useHistory()
  const { isLatestVersion, emptyCacheStorage } = useClearCache()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!isLatestVersion) {
      emptyCacheStorage()
    }
  }, [isLatestVersion, emptyCacheStorage])

  useEffect(() => {
    if (window && isLatestVersion) {
      try {
        const token = window.localStorage.getItem('esco_token')
        if (token) {
          history.push("/dashboard")
        }
      } catch (error) {
        
      }
    }
  }, [history, isLatestVersion])

  function handleSubmit(event) {
    event.preventDefault()
    if (email !== "" && senha !== "") {
      const data = {
        email,
        password: senha
      }
      api.post('/auth/login', data)
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
    } else {
      toast.info('Preencha os campos corretamente!', {
        autoClose: 5000
      })
    }
  }

  function handleSubmitRecover(event) {
    event.preventDefault()
    if (email !== "") {
      const data = {
        email
      }
      // axios.get(`https://app-esco.mageda.com.br/api/user/recover-password`)
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

            <button className="forget_password" onClick={handleClickOpen}>
              Esqueceu a senha?
            </button>
          </LoginCard>
        </div>
      </div>

      <CacheCleared>
        Aplicativo {isLatestVersion ? 'atualizado.' : 'desatualizado.'}
      </CacheCleared>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Recuperar Senha</DialogTitle>
        <DialogContent>
          <TextField 
            value={email} 
            type="email" 
            label="Digite seu e-mail Esco" 
            onChange={event => setEmail(event.target.value)} 
            autoFocus
            margin="dense"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <ModalButton className="cancelar" onClick={ handleClose }>
            Cancelar
          </ModalButton>
          <ModalButton className="confirmar" onClick={ handleSubmitRecover }>
            Confirmar
          </ModalButton>
        </DialogActions>
      </Dialog>

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

const ModalButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  margin: 8px 16px;
  cursor: pointer;
  font-weight: 600;
  outline: none;
  transition: background-color 0.3s;
  &.cancelar {
    color: #333;
    background-color: transparent;
    &:hover {
      background-color: #daa8a9;
    }
  }
  &.confirmar {
    color: #FFF;
    background-color: #DB1015;
    &:hover {
      background-color: #b90e13;
    }
  }
`

const CacheCleared = styled.p`
  position: fixed;
  bottom: 15px;
  left: 0;
  width: 100%;
  text-align: center;
  color: #e5e5e5;
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

export default Login;
