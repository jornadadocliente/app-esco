import { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Drawer from '../components/Drawer'
import Header from '../components/Header'
import FilterAdvanced from '../components/FilterAdvanced'
import db from '../database'
import { useLiveQuery } from 'dexie-react-hooks'

// Imagens
import MinaIcon from "../images/mina-icon.svg"
import EscavadeiraIcon from "../images/escavadeira-icon.svg"

function Produtos() {
  const location = useLocation()
  const history = useHistory()
  
  const params = new URLSearchParams(location.search)
  const category = params.get("category")
  const search = params.get("search")

  const searchFor = [category, search]
  
  const [windowWidth, setWindowWidth] = useState(null)
  const [productsFiltered, setProductsFiltered] = useState(null)
  const [openDetailedProduct, setOpenDetailedProduct] = useState(null)

  const products = useLiveQuery(
    () => db.products.toArray()
  )

  useEffect(() => {
    if (window) {
      setWindowWidth(window.innerWidth)
    }
  }, [])

  useEffect(() => {
    const newProducts = products?.filter(item => {
      if (item.category?.title === category || item.name.toLowerCase().includes(search?.toLowerCase())) {
        return true
      }
      return false
    })
    if (newProducts) {
      setProductsFiltered(newProducts)
      setOpenDetailedProduct(newProducts[0])
    }
  }, [products, category, search])

  function handleChoiceProduto(event, produtoId) {
    event.preventDefault();
    // eslint-disable-next-line
    const SelectedProduct = productsFiltered.filter(item => {
      if (item.id === produtoId) {
        return item
      }
    })
    setOpenDetailedProduct(SelectedProduct[0])

    if (windowWidth < 760) {
      history.push(`/produto/${produtoId}`)
    }
  }

  return (
    <div className="row">
      <Drawer />
      <Header />
        
      <Container className="container">
        <NavTitle>
          <div>
            <h4>Você procurou por:</h4>
            <h3>{searchFor.filter(item => item).join(", ")}</h3>
          </div>
          <div style={{ "position": "relative", "zIndex": 2 }}>
            <FilterAdvanced />
          </div>
        </NavTitle>

        <Scroller>
          {productsFiltered?.map(produto => (
            <ProdutoCard>
              <div onClick={ e => handleChoiceProduto(e, produto.id) }>
                <img src={produto.image} alt={produto.thumb.title} />
                <div className="content">
                  <p>{produto.category.title}</p>
                  <h5>{produto.thumb.title}</h5>
                  <p>
                    {produto.thumb.mini_description}
                  </p>
                </div>
              </div>
            </ProdutoCard>
          ))}
        </Scroller>
      </Container>

      <ProdutoContent>
        {openDetailedProduct ? (
          <div className="container">
            <img src={openDetailedProduct.image} alt="Nemesys" />
            <h2>
              {openDetailedProduct.name}
            </h2>
            <p>
              <strong>{openDetailedProduct.detailed.subtitle}</strong>
            </p>
            <p>
              {openDetailedProduct.detailed.resume}
            </p>
            <div className="row">
              <div>
                <h6>Tipo de Máquina:</h6>
                <div>
                  <img src={EscavadeiraIcon} alt="" />
                  {/* <img src={openDetailedProduct.detailed.machine_type.icon} alt="" /> */}
                </div>
                <p>{openDetailedProduct.detailed.machine_type.name}</p>
              </div>
              <div>
                <h6>Aplicação:</h6>
                <div>
                  <img src={MinaIcon} alt="" />
                  {/* <img src={openDetailedProduct.detailed.application.icon} alt="" /> */}
                </div>
                <p>{openDetailedProduct.detailed.application.name}</p>
              </div>
            </div>
            <Link to={`/produto/${openDetailedProduct.id}`}>
              Ver detalhes do produto
            </Link>
          </div>
        ) : null}
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
    object-fit: contain;
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

    > div {
      flex-direction: column;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
      }
    }
  }
`

export default Produtos;
