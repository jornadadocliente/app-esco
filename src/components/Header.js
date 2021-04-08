import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import LogoAzul from '../images/logo_azul.png'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Header = (props) => {

  const history = useHistory()

  return (
    <Container>
      <button onClick={history.goBack}>
        <ArrowBackIcon />
      </button>
      <Link to="/dashboard">
        <img src={ LogoAzul } alt="" />
      </Link>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 72px;
  width: calc(100% - 72px);
  padding: 15px 20px;
  background: #FFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #C4C4C4;
  z-index: 997;

  img {
    width: auto;
    height: 20px;
  }

  button {
    display: flex;
    align-items: center;
    font-size: 14px;
    width: max-content;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    background: transparent;
    color: #BC080D;
    transition: background-color 0.3s;
    &:hover {
      background: #fff0f0;
    }
  }
`

export default Header;