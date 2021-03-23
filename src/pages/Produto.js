import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Drawer from '../components/Drawer'
import Header from '../components/Header'
import db from '../database'
import { useLiveQuery } from 'dexie-react-hooks'
import SeloDeSucesso from '../components/SeloDeSucesso'

import ReasonsIcon from '../images/reasons-icon.svg'
import Quote from '../images/quote.svg';
import SuccessImage from '../images/success-image.svg'

function Produto() {
  const { id } = useParams()
  const products = useLiveQuery(
    () => db.products.toArray()
  )

  const [produto, setProduto] = useState(null)

  useEffect(() => {
    let produto_selected = null
    // eslint-disable-next-line
    products?.map(item => {
      if (item.id === parseInt(id)) {
        produto_selected = item
      }
    })
    setProduto(produto_selected)
    console.log(produto_selected)
  }, [products, id])

  return (
    <div className="row">
      <Drawer />
      <Header />
      
      <Container>
        <Principal>
          <div className="col-md-6">
            <div className="content">
              <p className="content__title">
                {produto?.category.title}
              </p>
              <h1>{produto?.name}</h1>
              <h5>{produto?.intern.intern_subtitle}</h5>
              <p>{produto?.intern.intern_description}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="content__image">
              <img src={ produto?.intern.intern_principal_image } alt=" " />
            </div>
          </div>
        </Principal>

        <Benefits>
          <img src={ produto?.intern.intern_benefits_image } alt=" " />
          <div className="row">
            {produto?.intern.intern_benefits.map(item => {
              return (
                <div className="item">
                  <h5>{ item.title }</h5>
                  <p>{ item.text }</p>
                </div>
              )
            })}
          </div>
        </Benefits>

        <Tree>
          <h1>
            { produto?.title_tree }
          </h1>
          <img src={ produto?.image_tree } alt=" " />
        </Tree>

        <Video>
        <iframe src={ produto?.full_video } 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        >
        </iframe>
        </Video>

        <Reasons>
          <h2>
            { produto?.reasons_title }
          </h2>
          <ul>
            {produto?.reasons.map(item => {
              return (
                <li>{item}</li>
              )
            })}
          </ul>
        </Reasons>

        <Success>
          <div className="col-md-6">
            <h2>Cases de Sucesso</h2>
            <p>
              {produto?.success_case_description}
            </p>
          </div>
          <div className="col-md-6">
            <div style={{ 
              width: 180,
              height: 180,
              transform: 'rotate(10deg)',
              fontSize: '22px',
              display: 'flex',
              margin: '0 auto'
            }}>
              <SeloDeSucesso />
            </div>
          </div>
        </Success>

        {produto?.success_cases.map(item => {
          return (
            <SuccessCase>
              <div className="col-md-6">
                <h2>{ item.title }</h2>
                <p>{ item.description }</p>
                <p><strong>Resultado</strong></p>
                <ul>
                  {item.results.map(result_item => {
                    return <li dangerouslySetInnerHTML={{ __html: result_item }} />
                  })}
                </ul>
              </div> 
              <div className="col-md-6">
                <img src={SuccessImage} alt= " " />
              </div>
            </SuccessCase>
          )
        })}

        <Staff>
          <h2>Staff Técnico</h2>
          <div className="row">
            {produto?.staffs.map(item => {
              return (
                <div className="col-md-6 item">
                  <div className="item__profile">
                    <img src={ item.image } alt=" " />
                    <div className="item__profile__content">
                      <strong>{ item.name }</strong>
                      <p>{ item.occupation }</p>
                      <p>{ item.occupation_2 }</p>
                    </div>
                  </div>

                  <div className="item__text">
                    <img src={Quote} alt=" " />
                    <p>
                      { item.text }
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </Staff>
      </Container>

    </div>
  );
}

const Staff = styled.div`
  padding: 40px 0 80px;

  h2 {
    color: #043455;
    font-size: 22px;
    margin: 24px 0;
  }

  .item {
    padding: 15px;
    
    &__profile {
      display: flex;
      align-items: center;

      img {
        margin: 0 16px 0 0;
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 10px;
      }

      &__content {
        font-size: 16px;
        strong {
          color: #043455;
        }
      }
    }

    &__text {
      display: flex;
      margin: 24px 0;
      img {
        width: 30px;
        height: 30px;
        margin-right: 8px;
        color: #BC080D;
      }
      p {
        line-height: 32px;
        color: #383838;
      }
    }
  }
`

const SuccessCase = styled.div`
  display: flex;
  padding: 40px 0 80px;
  color: #043455;

  h2 {
    font-size: 18px;
    margin: 0 0 24px;
  }
  p {
    line-height: 28px;
    margin: 12px 0;
  }
  ul {
    li {
      margin-left: 20px;
      &::marker {
        color: #BC080D;
      }
      p {
        margin: 0;
      }
    }
  }
`

const Success = styled.div`
  display: flex;
  color: #043455;
  padding: 80px 0;
  
  h2 {
    font-size: 20px;
    margin: 24px 0;
  }
  > p {
    font-size: 16px;
    line-height: 28px;
  }
`

const Reasons = styled.div`
  position: relative;
  padding: 100px 0;

  h2 {
    font-size: 32px;
    color: #BC080D;
    margin: 24px 0;
  }

  ul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    li {
      position: relative;
      margin: 24px 0 24px 60px;
      width: calc(40% - 60px);
      &::marker {
        content: "";
      }
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: -56px;
        background: url(${ReasonsIcon});
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        width: 40px;
        height: 40px;
      }
    }
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -50vw;
    width: 140vw;
    height: 100%;
    background: rgba(196, 196, 196, 0.15);
    z-index: -2;
  }
`

const Video = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 80px 0;

  iframe {
    width: 100%;
    height: 575px;
    border-radius: 10px;
  }
`

const Tree = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;

  h1 {
    position: relative;
    width: 300px;
    font-size: 24px;
    color: #043455;
    margin-bottom: -50px;
    z-index: 2;
  }
`

const Benefits = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    margin: 24px 0;
  }

  .row {
    justify-content: space-between;
  }

  .item {
    width: 30%;
    margin: 16px 0;
    color: #043455;
    line-height: 28px;
    h5 {
      font-size: 16px;
      margin: 8px 0;
    }
    p {
      color: #000;
    }
  }
`

const Principal = styled.div`
  display: flex;
  margin: 72px auto 0;
  padding: 60px 0;
  .content {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    padding: 0 15px;

    &__image {
      img {
        position: absolute;
        top: 72px;
        right: 0;
        width: 540px;
        height: 540px;
        object-fit: cover;
        border-radius: 0px 0px 0px 25px;
      }
    }

    p {
      margin: 24px 0;
      font-size: 14px;
      color: #000;
      line-height: 30px;
    }

    &__title {
      color: #043455;
      font-size: 14px;
      font-weight: bold;
      margin: 0 !important;
      text-transform: uppercase;
    }

    h1 {
      margin: 24px 0;
      font-size: 24px;
      color: #222222;
      font-weight: bold;
    }

    h5 {
      font-size: 16px;
      font-weight: bold;
      color: #000;
    }
  }
`

const Container = styled.div`
  width: calc(100% - 250px);
  margin: 0 auto;

  @media screen and (max-width: 800px) {
    width: calc(100% - 72px);
    max-width: calc(100% - 72px);
    margin-left: auto;
    margin-right: 0;
  }
`

export default Produto;
