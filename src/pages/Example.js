import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Drawer from '../components/Drawer'
import Header from '../components/Header'

function Example() {
  return (
    <div className="row">
      <Drawer />
      <Header />
        
      <Container className="container">
        <h1>Tela de Example</h1>
        <Link to="/">
          Go to Login
        </Link>
      </Container>

    </div>
  );
}

const Container = styled.div`
  width: calc(100% - 250px);
  margin-top: 72px;

  @media screen and (max-width: 800px) {
    width: calc(100% - 72px);
    max-width: calc(100% - 72px);
    margin-left: auto;
    margin-right: 0;
  }
`

export default Example;
