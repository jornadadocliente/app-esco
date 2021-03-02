import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Drawer from '../components/Drawer'
import Header from '../components/Header'

function Dashboard() {
  return (
    <div className="row">
      <Drawer />
      <Header />
        
      <Container className="container">
        <h1>Tela de Dashboard</h1>
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
`

export default Dashboard;
