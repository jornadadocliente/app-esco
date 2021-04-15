import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import db from '../database'
import { useLiveQuery } from 'dexie-react-hooks'

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

  const categories = useLiveQuery(
    () => db.categories.toArray()
  )
  const user = useLiveQuery(
    () => db.user.toArray()
  )

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  function logout() {
    window.localStorage.removeItem('esco_token')
    history.push("/")
  }

  return (
    <Container className={ open ? "opened" : "" } >
      <Hamburger className={ open ? "opened" : "" } onClick={ () => setOpen(!open)} >
        <div className="dashs">
          <span></span>
          <span></span>
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
            {/* <Link to="/dashboard" >
              Ver Perfil
            </Link> */}
          </div>
        </div>
      </Profile>

      <Menu className={ open ? "opened" : "" } >
        <NavLink exact to="/dashboard">
          <HomeRoundedIcon />
          Início
        </NavLink>
        <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')} disabled={!open} onClick={ () => setOpen(true)}>
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <AccountBalanceWalletOutlinedIcon />
            Orçamentos
          </AccordionSummary>
          <AccordionDetails>
            <NavLink exact to="/novo-orcamento" >
              Novo
            </NavLink>
            <NavLink exact to="/orcamentos" >
              Histórico
            </NavLink>
          </AccordionDetails>
        </Accordion>
        <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')} disabled={!open} onClick={ () => setOpen(true)}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <LanguageIcon />
            Produtos
          </AccordionSummary>
          <AccordionDetails>
            {categories?.map(item => (
              <NavLink exact to={`/produtos/${item.title}`}>
                {item.title}
              </NavLink>
            ))}
          </AccordionDetails>
        </Accordion>
        {user && user[0]?.type === "admin" ? (
          <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')} disabled={!open} onClick={ () => setOpen(true)}>
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
        ) : null}
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
  z-index: 998;

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
    flex-direction: column;
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
      transition: opacity 0.4s, transform 0.4s, top 0.4s, bottom 0.4s;

      &:first-child {
        width: 38px;
        height: 4px;
        background: #fff;
        border-radius: 16px;
        top: -10px;
        left: 0;
      }
      &:last-child {
        width: 38px;
        height: 4px;
        background: #fff;
        border-radius: 16px;
        bottom: -10px;
        left: 0;
      }
    }

  }
  &.opened {
    .dashs {
      span {
        &:first-child {
          top: 4px;
          transform: rotate(45deg);
        }
        &:nth-child(2) {
          opacity: 0;
        }
        &:last-child {
          bottom: 4px;
          transform: rotate(-45deg);
        }
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

  a, button {
    padding: 8px 16px;
    border: none;
    border-bottom: 0.25px solid #C5CCE9;
    background: #fff;
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
    a, button {
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
  position: fixed;
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
  border-top: 1px solid #E5E5E5;
  cursor: pointer;
  transition: all 0.5s;

  img {
    margin-right: 20px;
  }

  &:hover {
    background: #E5E5E5;
  }

  &.opened {
    width: 180px;
  }
`

export default Drawer;