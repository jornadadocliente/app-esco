import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Drawer from '../components/Drawer'
import Header from '../components/Header'
import FilterAdvanced from '../components/FilterAdvanced'

// Imagens
import ProdutoImage from '../images/gets.png'
import EscavadeiraIcon from '../images/escavadeira-icon.svg'
import MinaIcon from '../images/mina-icon.svg'

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
          <div style={{ "position": "relative", "zIndex": 2 }}>
            <FilterAdvanced />
          </div>
        </NavTitle>

        <Scroller>
          <ProdutoCard>
            <div to="/">
              <img src={ProdutoImage} alt="Nemesys" />
              <div className="content">
                <p>Gets</p>
                <h5>Nemesys®</h5>
                <p>
                  Sistema de travamento integrado. Menor estresse e redução do peso. 
                  10% menos força ao penetrar.
                </p>
              </div>
            </div>
          </ProdutoCard>
          <ProdutoCard>
            <div to="/">
              <img src={ProdutoImage} alt="Nemesys" />
              <div className="content">
                <p>Gets</p>
                <h5>Ultralock</h5>
                <p>
                  Sistema de travamento integrado. Menor estresse e redução do peso. 
                  10% menos força ao penetrar.
                </p>
              </div>
            </div>
          </ProdutoCard>
          <ProdutoCard>
            <div to="/">
              <img src={ProdutoImage} alt="Nemesys" />
              <div className="content">
                <p>Gets</p>
                <h5>Perfis de Pontas</h5>
                <p>
                  Sistema de travamento integrado. Menor estresse e redução do peso. 
                  10% menos força ao penetrar.
                </p>
              </div>
            </div>
          </ProdutoCard>
          <ProdutoCard>
            <div to="/">
              <img src={ProdutoImage} alt="Nemesys" />
              <div className="content">
                <p>Gets</p>
                <h5>Sistema Antimarreta</h5>
                <p>
                  Sistema de travamento integrado. Menor estresse e redução do peso. 
                  10% menos força ao penetrar.
                </p>
              </div>
            </div>
          </ProdutoCard>
        </Scroller>
      </Container>

      <ProdutoContent>
        <div className="container">
          <img src={ProdutoImage} alt="Nemesys" />
          <h2>
            Sistema de Dentes Nemesys®
          </h2>
          <p>
            <strong>Conheça o novo Sistema de Dentes Nemesys ESCO.</strong>
          </p>
          <p>
            ESCO® oferece o comprovado sistema de dentes de mineração Nemisys como 
            uma atualização direta e substituição para o sistema SV2® e sistemas de 
            soldagem concorrentes para escavadeiras hidráulicas de placa. 
          </p>
          <div className="row">
            <div>
              <h6>Tipo de Máquina:</h6>
              <div>
                <img src={EscavadeiraIcon} alt="" />
              </div>
              <p>Escavadeira</p>
            </div>
            <div>
              <h6>Aplicação:</h6>
              <div>
                <img src={MinaIcon} alt="" />
              </div>
              <p>Escavação em Mina</p>
            </div>
          </div>
          <Link>
            Ver detalhes do produto
          </Link>
        </div>
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
  z-index: 997;
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

  @media screen and (max-width: 760px) {
    width: calc(100% - 72px);
    flex-wrap: wrap;
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
  padding: 24px;
  overflow: auto;

  .container {
    max-width: 500px;
    margin-left: 0;
  }

  img {
    width: 100%;
    height: 240px;
  }

  h2 {
    color: #222;
    font-size: 20px;
    font-weight: bold;
    margin: 18px 0;
  }

  p {
    color: #043455;
    font-size: 16px;
  }

  .row {
    margin: 18px 0;
    > div {
      width: 50%;
      h6 {
        font-size: 14px;
        color: #043455;
        font-weight: 600;
      }
      > div {
        width: 54px;
        height: 54px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: rgba(162, 175, 219, 0.1);
        margin: 12px 0;
        img {
          width: 30px;
          height: 30px;
          object-fit: contain;
        }
      }
      p {
        color: #0071BC;
        font-size: 12px;
        font-weight: bold;
      }
    }
  }

  a {
    width: 100%;
    padding: 16px;
    text-align: center;
    background: #BC080D;
    border-radius: 4px;
    color: #FFF;
    font-weight: bold;
    margin: 24px 0;
    text-decoration: none;
    transition: all 0.3s;

    &:hover {
      background: #860609;
    }
  }

  @media screen and (max-width: 760px) {
    right: -100%;
  }
`

const Scroller = styled.div`
  position: fixed;
  bottom: 0;
  left: 72px;
  height: calc(100vh - 144px);
  width: calc(50% - 36px);
  overflow: auto;

  @media screen and (max-width: 760px) {
    width: calc(100% - 72px);
  }
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

  > div {
    width: 100%;
    height: 100%;
    color: #043455;
    display: flex;
    text-decoration: none;
    cursor: pointer;

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

  @media screen and (max-width: 760px) {
    height: max-content;
    a {
      flex-direction: column;
      img {
        width: 100%;
        height: 100px;
      }
    }
  }
`

export default Produtos;
