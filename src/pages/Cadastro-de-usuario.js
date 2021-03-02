import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Drawer from '../components/Drawer'
import Header from '../components/Header'


function CadastroDeUsuario() {
  return (
    <div className="row">
      <Drawer />
      <Header />

      <Container className="container">
        <h1>Tela de Cadastro De Usuario</h1>
        <Link to="/dashboard">
          Go to Dashboard
        </Link>
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: calc(100% - 250px);
  margin-top: 72px;
`

export default CadastroDeUsuario;
