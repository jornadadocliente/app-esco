import React, { useState } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import LanguageIcon from '@material-ui/icons/Language';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import LogoBranco from '../images/logo_branco.svg'
import PerfilFoto from '../images/perfil-imagem.png'
import ExitIcon from '../images/exit.svg'

const Accordion = withStyles({
  root: {
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},

})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(255, 255, 255)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const Drawer = (props) => {

  const history = useHistory()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  function logout() {
    window.localStorage.removeItem('token')
    history.push("/")
  }

  return (
    <Container className={ open ? "opened" : "" } >
      <Hamburger className={ open ? "opened" : "" } onClick={ () => setOpen(!open)} >
        <div className="dashs">
          <span></span>
        </div>
        <div className="logo">
          <img src={ LogoBranco } alt="Esco" width={87} height={16} />
        </div>
      </Hamburger>

      <Profile className={ open ? "opened" : "" } >
        <div className="row">
          <div className="profile__image">
            <img src={ PerfilFoto } width={ 65 } height={ 65 } alt="" />
          </div>
          <div className="profile__text">
            <p>Bem-vindo de volta.</p>
            <Link to="/dashboard" >
              Ver Perfil
            </Link>
          </div>
        </div>
      </Profile>

      <Menu className={ open ? "opened" : "" } >
        <NavLink exact to="/dashboard">
          <HomeRoundedIcon />
          Início
        </NavLink>
        <NavLink exact to="/">
          <AccountBalanceWalletOutlinedIcon />
          Orçamentos
        </NavLink>
        <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')} disabled={!open}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <LanguageIcon />
            Produtos
          </AccordionSummary>
          <AccordionDetails>
            <NavLink exact to="/">
              Kwik LOK
            </NavLink>
            <NavLink exact to="/">
              Báscula
            </NavLink>
            <NavLink exact to="/">
              GETS
            </NavLink>
            <NavLink exact to="/">
              Corte de Água
            </NavLink>
            <NavLink exact to="/">
              Chapa de Desgaste
            </NavLink>
          </AccordionDetails>
        </Accordion>
        <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')} disabled={!open}>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <SupervisorAccountIcon />
            Admin
          </AccordionSummary>
          <AccordionDetails>
            <NavLink exact to="/lista-de-usuario">
              Usuários
            </NavLink>
            <NavLink exact to="/cadastro-de-usuario">
              Cadastro de Usuário
            </NavLink>
          </AccordionDetails>
        </Accordion>
        <Exit className={ open ? "opened" : ""} onClick={() => logout()} >
          <img src={ ExitIcon } width={ 18 } height={ 16 } alt="" />
          Sair
        </Exit>
      </Menu>
    </Container>
  )
}

const Container = styled.div`
  position: sticky;
  left: 0;
  top: 0;
  height: 100vh;
  width: 72px;
  background: #FFF;
  box-shadow: -60px 0px 40px 40px #333;
  transition: width 0.5s;
  overflow-y: auto;
  padding-bottom: 72px;
  z-index: 999;

  &.opened {
    width: 200px;
  }

  @media screen and (max-width: 800px) {
    position: fixed;
  }
`

const Hamburger = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  background: #BC080D;
  overflow: hidden;
  display: flex;
  transition: width 0.5s;

  .dashs {
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 72px;
    width: 72px;
    background: #BC080D;
    cursor: pointer;
    border-right: 0.5px solid #fff;
    span {
      position: relative;
      width: 38px;
      height: 4px;
      background: #fff;
      border-radius: 16px;

      &:before {
        content: '';
        width: 38px;
        height: 4px;
        background: #fff;
        border-radius: 16px;
        position: absolute;
        top: -12px;
        left: 0;
      }
      &:after {
        content: '';
        width: 38px;
        height: 4px;
        background: #fff;
        border-radius: 16px;
        position: absolute;
        bottom: -12px;
        left: 0;
      }
    }
  }

  .logo {
    position: relative;
    left: -200px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(200px - 72px);
    transition: left 0.5s;
  }

  &.opened {
    width: 200px;

    .logo {
      left: 72px;
    }
  }
`

const Profile = styled.div`
  width: 100%;
  position: relative;

  &:after {
    content: "";
    width: 80%;
    height: 0.25px;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    margin: 0 auto;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    transition: all 0.5s;
  }

  .row {
    position: relative;
  }

  .profile {
    &__image {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 16px 8px;
      border-radius: 50%;
      border: 0.5px solid #C5CCE9;
      width: 52px;
      height: 52px;
      background: #FFF;
      transition: all 0.5s;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        transition: all 0.5s;
      }
    }

    &__text {
      position: absolute;
      display: flex;
      flex-direction: column;
      margin: auto 0;
      right: 200px;
      top: 0;
      bottom: 0;
      height: max-content;
      width: 100px;
      transition: all 0.5s;

      p {
        color: #043455;
        font-size: 14px;
        font-weight: bold;
        margin: 0 0 8px;
      }

      a {
        color: #043455;
        font-size: 14px;
      }
    }
  }

  &.opened {
    &:after {
      background: transparent;
    }
    .profile {
      &__image {
        width: 82px;
        height: 82px;
        img {
          width: 65px;
          height: 65px;
        }
      }

      &__text {
        right: 0;
      }
    }
  }
`

const Menu = styled.div`
  display: flex;
  flex-direction: column;

  a {
    padding: 8px 16px;
    border-bottom: 0.25px solid #C5CCE9;
    color: #043455;
    margin: 4px 14px;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    width: 44px;
    overflow: hidden;
    transition: all 0.5s;

    svg {
      color: #043455;
      margin-right: 8px;
      margin-left: -5px;
      transition: all 0.5s;
    }

    &.active {
      border-bottom: none;
      border-radius: 6px;
      background: #DB1015;
      color: #fff;
      svg {
        color: #fff;
      }
    }
  }

  .MuiAccordion-root {
    box-shadow: none;
    max-width: 200px;
    &.Mui-disabled {
      background-color: #fff;
      .MuiAccordionSummary-root {
        opacity: 1;
      }
    }

    svg {
      color: #043455;
    }

    .MuiAccordionSummary-root {
      padding: 0 15px;
    }
    .MuiAccordionSummary-content {
      overflow: hidden;
      font-size: 14px;
      font-weight: 600;
      color: #043455;
      width: 24px;
      align-items: center;
      margin: 12px 10px;
      svg {
        margin-right: 8px;
      }
    }

    .MuiAccordionDetails-root {
      flex-direction: column;
      height: 0;
      overflow: hidden;
      padding: 0;
      a {
        max-width: calc(100% - 30px);
      }
    }
  }

  &.opened {
    a {
      width: 172px;
      svg {
        margin-left: 0;
      }
    }
    .MuiAccordion-root {
      .MuiAccordionSummary-content {
        width: 200px;
      }
      .MuiAccordionDetails-root {
        height: max-content;
        padding: 16px;
      }
    }
  }
`

const Exit = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 10px;
  width: 52px;
  height: 72px;
  align-items: center;
  padding: 12px 14px;
  overflow: hidden;
  color: #7C8CA6;
  font-weight: 600;
  background: #FFF;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.5s;

  img {
    margin-right: 20px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  &.opened {
    width: 180px;
  }
`

export default Drawer;