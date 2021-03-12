import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import LogoAzul from '../images/logo_azul.png'

const Header = (props) => {

  return (
    <Container>
      <Link to="/dashboard">
        <img src={ LogoAzul } alt="" />
      </Link>
      <button disabled>
        ?
      </button>
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
    width: 25px;
    height: 25px;
    border: 2px solid #BC080D;
    border-radius: 50%;
    background: transparent;
    display: grid;
    align-content: center;
    color: #BC080D;
  }
`

export default Header;