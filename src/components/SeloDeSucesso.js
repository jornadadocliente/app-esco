import React from 'react'
import styled from 'styled-components'

import Legal from '../images/legal.svg'

const SeloDeSucesso = (props) => {

  return (
    <Container>
      <img src={Legal} alt=" " />
      <p>Case de Sucesso</p>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #DB1015;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1em;

  img {
    width: 40%;
  }

  p {
    text-align: center;
    font-size: 1em;
    font-weight: bold;
  }
`

export default SeloDeSucesso;