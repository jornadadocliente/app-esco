import styled from 'styled-components'

import LogoImg from '../images/logo_esco.png'

function Login() {
  return (
    <Body>
      <div className="container">
        <div className="row">
          <Logo>
            <img src={LogoImg} alt="Esco" />
          </Logo>
          <LoginCard>
            <h2>
              Faça seu login.
            </h2>
            <form>
              <label for="email">E-mail</label>
              <input type="email" id="email" name="email" placeholder="Digite seu e-mail Esco" />
              <label for="password">Senha</label>
              <input type="password" id="password" name="password" placeholder="Digite sua senha" />

              <button type="submit" >
                ENTRAR
              </button>
            </form>
          </LoginCard>
        </div>
      </div>
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
