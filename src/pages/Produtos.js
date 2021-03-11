import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Drawer from '../components/Drawer'
import Header from '../components/Header'

import TuneIcon from '@material-ui/icons/Tune';

// Imagens
import ProdutoImage from '../images/gets.png'

function Produtos() {
  const { search } = useParams()
  return (
    <div className="row">
      <Drawer />
      <Header />
        
      <Container className="container">
        <NavTitle>
          <div>
            <h4>Você procurou por:</h4>
            <h3>{search}</h3>
          </div>
          <div>
            <Link to="/">
              <TuneIcon /> Filtro Avançado
            </Link>
          </div>
        </NavTitle>

        <Scroller>
          <ProdutoCard>
            <Link to="/">
              <img src={ProdutoImage} alt="Nemesys" />
              <div className="content">
                <p>Gets</p>
                <h5>Nemesys®</h5>
                <p>
                  Sistema de travamento integrado. Menor estresse e redução do peso. 
                  10% menos força ao penetrar.
                </p>
              </div>
            </Link>
          </ProdutoCard>
          <ProdutoCard>
            <Link to="/">
              <img src={ProdutoImage} alt="Nemesys" />
              <div className="content">
                <p>Gets</p>
                <h5>Ultralock</h5>
                <p>
                  Sistema de travamento integrado. Menor estresse e redução do peso. 
                  10% menos força ao penetrar.
                </p>
              </div>
            </Link>
          </ProdutoCard>
          <ProdutoCard>
            <Link to="/">
              <img src={ProdutoImage} alt="Nemesys" />
              <div className="content">
                <p>Gets</p>
                <h5>Perfis de Pontas</h5>
                <p>
                  Sistema de travamento integrado. Menor estresse e redução do peso. 
                  10% menos força ao penetrar.
                </p>
              </div>
            </Link>
          </ProdutoCard>
          <ProdutoCard>
            <Link to="/">
              <img src={ProdutoImage} alt="Nemesys" />
              <div className="content">
                <p>Gets</p>
                <h5>Sistema Antimarreta</h5>
                <p>
                  Sistema de travamento integrado. Menor estresse e redução do peso. 
                  10% menos força ao penetrar.
                </p>
              </div>
            </Link>
          </ProdutoCard>
        </Scroller>
      </Container>

      <ProdutoContent>

      </ProdutoContent>
    </div>
  );
}

const Container = styled.div`
  width: calc(100% - 250px);
  margin-top: 144px;
  position: relative;

  @media screen and (max-width: 800px) {
    width: calc(100% - 72px);
    max-width: calc(100% - 72px);
    margin-left: auto;
    margin-right: 0;
  }
`

const NavTitle = styled.div`
  position: fixed;
  z-index: 998;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  width: calc(50% - 36px);
  top: 72px;
  left: 72px;
  padding: 16px;
  background: #FFF;
  box-shadow: 0px 4px 4px rgba(229, 229, 229, 0.25);
  color: #043455;

  h4 {
    font-size: 16px;
  }

  h3 {
    font-size: 22px;
    text-transform: uppercase;
  }

  a {
    color: #043455;
    font-size: 14px;
    padding: 8px 16px;
    margin: 8px 0 8px 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.5s;

    &:hover {
      background-color: #04345526;
    }
  }
`

const ProdutoContent = styled.div`
  position: fixed;
  top: 72px;
  right: 0;
  width: calc(50% - 36px);
  border-left: 1px solid #C4C4C4;
  height: calc(100vh - 72px);
  background-color: #FFF;
`

const Scroller = styled.div`
  position: fixed;
  bottom: 0;
  left: 72px;
  height: calc(100vh - 144px);
  width: calc(50% - 36px);
  overflow: auto;
`

const ProdutoCard = styled.div`
  width: 500px;
  max-width: calc(100% - 30px);
  height: 140px;
  border-radius: 4px;
  background-color: #FFF;
  margin: 16px auto;
  display: flex;
  overflow: hidden;

  a {
    width: 100%;
    height: 100%;
    color: #043455;
    display: flex;
    text-decoration: none;

    img {
      width: 140px;
      height: 100%;
      object-fit: cover;
    }

    .content {
      padding: 18px;
      font-size: 14px;
      
      h5 {
        color: #222;
        font-weight: 700;
        font-size: 16px;
        margin: 4px 0;
      }
    }
  }
`

export default Produtos;
