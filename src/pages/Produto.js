import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Drawer from "../components/Drawer";
import Header from "../components/Header";
import FormOrcamento from "../components/FormOrcamento";
import db from "../database";
import { useLiveQuery } from "dexie-react-hooks";
import SeloDeSucesso from "../components/SeloDeSucesso";
import { HashLink } from "react-router-hash-link";
import { Player } from "video-react";
import "../../node_modules/video-react/dist/video-react.css";

import ReasonsIcon from "../images/reasons-icon.svg";
import Quote from "../images/quote.svg";

import ThumbVideo from "../images/poster_video.png";

function Produto() {
  const { id } = useParams();
  const products = useLiveQuery(() => db.products.toArray());

  const [produto, setProduto] = useState(null);
  const [productSelected, setProductSelected] = useState(null);

  useEffect(() => {
    let produto_selected = null;
    // eslint-disable-next-line
    products?.map((item) => {
      if (item.id === parseInt(id)) {
        item.model_one =
          item.model_one.length > 0 ? JSON.parse(item.model_one) : null;
        item.model_two =
          item.model_two.length > 0 ? JSON.parse(item.model_two) : null;
        item.model_three =
          item.model_three.length > 0 ? JSON.parse(item.model_three) : null;
        item.model_four =
          item.model_four.length > 0 ? JSON.parse(item.model_four) : null;
        produto_selected = item;
      }
    });
    setProduto(produto_selected);
    console.log(produto_selected);
  }, [products, id]);

  useEffect(() => {
    if (produto && produto.model_one) {
      setProductSelected(produto.model_one[0]);
    }
  }, [produto]);

  function thisIsMyCopy(title, text) {
    return `<h5>${title}</h5><p>${text}</p>`;
  }

  return (
    <div className="row">
      <Drawer />
      <Header />

      <Container>
        <section>
          <Principal>
            <div className="col-md-6">
              <div className="content">
                {/* <p className="content__title">
                  {produto?.category.title}
                </p> */}
                <h1 className='nameProd'>{produto?.name}</h1>
                <h5>{produto?.intern.intern_subtitle}</h5>
                {produto?.intern.intern_description.includes("</p>") ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: produto?.intern.intern_description,
                    }}
                  />
                ) : (
                  <p>{produto?.intern.intern_description}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="content__image">
                <img src={produto?.intern.intern_pricipal_image} alt=" " />
              </div>
            </div>
          </Principal>

          {productSelected ? (
            <Models>
              <div className="row content">
                <div className="col-md-6 content__image">
                  <img
                    src={productSelected.model_picture}
                    alt={productSelected.model_title}
                  />
                </div>
                <div className="col-md-6">
                  <h1 className="content__subtitle">CONHEÇA NOSSOS MODELOS</h1>
                  <h1 className="content__title">
                    {productSelected.model_title}
                  </h1>
                  <div
                    className="content__text"
                    dangerouslySetInnerHTML={{
                      __html: productSelected.model_description,
                    }}
                  ></div>
                  <div className="content__thumbs">
                    {produto?.model_one && (
                      <div
                        className="content__thumbs--item"
                        onClick={() =>
                          setProductSelected(produto?.model_one[0])
                        }
                      >
                        <img src={produto?.model_one[0].model_thumb} alt=" " />
                        <p>
                          {produto?.model_one[0].model_title.replace(
                            "Básculas ESCO",
                            ""
                          )}
                        </p>
                      </div>
                    )}
                    {produto?.model_two && (
                      <div
                        className="content__thumbs--item"
                        onClick={() =>
                          setProductSelected(produto?.model_two[0])
                        }
                      >
                        <img src={produto?.model_two[0].model_thumb} alt=" " />
                        <p>
                          {produto?.model_two[0].model_title.replace(
                            "Básculas ESCO",
                            ""
                          )}
                        </p>
                      </div>
                    )}
                    {produto?.model_three && (
                      <div
                        className="content__thumbs--item"
                        onClick={() =>
                          setProductSelected(produto?.model_three[0])
                        }
                      >
                        <img
                          src={produto?.model_three[0].model_thumb}
                          alt=" "
                        />
                        <p>
                          {produto?.model_three[0].model_title.replace(
                            "Básculas ESCO",
                            ""
                          )}
                        </p>
                      </div>
                    )}
                    {produto?.model_four && (
                      <div
                        className="content__thumbs--item"
                        onClick={() =>
                          setProductSelected(produto?.model_four[0])
                        }
                      >
                        <img src={produto?.model_four[0].model_thumb} alt=" " />
                        <p>
                          {produto?.model_four[0].model_title.replace(
                            "Básculas ESCO",
                            ""
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Models>
          ) : null}

          {produto?.intern.title_benefits.length > 0 && (
            <Titlebenefits>
              <h1>
                {produto?.intern.title_benefits}
              </h1>
            </Titlebenefits>
          )}

          <Benefits>
            {produto?.intern.intern_benefits_image.length > 0 && (
              <img src={produto?.intern.intern_benefits_image} alt=" " />
            )}
            <div className="row">
              {produto?.intern.intern_benefits.map((item) => {
                return (
                  <div className="item" dangerouslySetInnerHTML={{ __html: thisIsMyCopy(item.title, item.text) }}>

                  </div>
                );
              })}
            </div>
          </Benefits>






          {produto?.title_tree.length > 0 && (
            <Tree>
              <h1>
                {produto?.title_tree}
              </h1>
              <div dangerouslySetInnerHTML={{ __html: produto?.text_image_tree }}></div>

              {produto?.image_tree.length > 0 && (
                <img src={produto?.image_tree} alt={produto?.title_tree} />
              )}

            </Tree>
          )}

          {produto?.full_video.length > 0 && (
            <Video>
              <Player
                playsInline
                poster={produto?.thumbnail_video.length > 0 ? produto?.thumbnail_video : ThumbVideo}
                src={produto?.full_video}
              />
            </Video>
          )}

          <Reasons>
            <h2>
              {produto?.reasons_title}
            </h2>
            <ul>
              {produto?.reasons.map((item) => {
                if (item.includes("</")) {
                  return (
                    <li className="code__html">
                      <div dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  );
                } else {
                  return <li>{item}</li>;
                }
              })}
            </ul>
          </Reasons>

          {produto?.success_case_description.length > 0 && (
            <Success>
              <div className="col-md-6">
                <h2>Cases de Sucesso</h2>
                <p>{produto?.success_case_description}</p>
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
          )}

          {produto?.success_cases.length > 0 && produto?.success_cases.map(item => {
            return (
              <SuccessCase>
                <div className="col-md-6">
                  <h2>{item.title}</h2>
                  <p dangerouslySetInnerHTML={{ __html: item.description }} />
                  {item.results.length > 0 && <p><strong>Resultado</strong></p>}
                  <ul>
                    {item.results.map(result_item => {
                      return <li dangerouslySetInnerHTML={{ __html: result_item }} />
                    })}
                  </ul>
                </div>
                <div className="col-md-6">
                  <img src={item.success_image} alt=" " />
                </div>
              </SuccessCase>
            )
          })}

          {produto?.staffs.length > 0 && (
            <Staff>
              <h2>Staff Técnico</h2>
              <div className="row">
                {produto?.staffs.map((item) => {
                  return (
                    <div className="col-md-6 item">
                      <div className="item__profile">
                        <img src={item.image} alt=" " />
                        <div className="item__profile__content">
                          <strong>{item.name}</strong>
                          <p>{item.occupation}</p>
                          <p>{item.occupation_2}</p>
                        </div>
                      </div>

                      <div className="item__text">
                        <img src={Quote} alt=" " />
                        <p>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Staff>
          )}

          <AnchorLink>
            <HashLink to={`/produto/${id}#solicitar-orcamento`}>
              Solicitar Orçamento
            </HashLink>
          </AnchorLink>
        </section>

        <FormOrcamento id="solicitar-orcamento" produtoId={produto?.id} produto={produto ? produto : null} />
      </Container>
    </div>
  );
}

const Models = styled.div`
  padding: 50px 0;
  display: flex;
  .nameProd{
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: #222222;
  }
  .content {
    .col-md-6 {
      padding: 0 16px;
      display: flex;
      flex-direction: column;
    }

    &__image {
      img {
        width: 100%;
      }
    }

    &__title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 8px;
      color: #222;
    }

    &__subtitle {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 8px;
      color: #043455;
    }

    &__text {
      font-size: 14px;
      margin-bottom: 8px;
      color: #000;
      line-height: 1.5;
    }

    &__thumbs {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 16px 0;
      margin-top: auto;
      &--item {
        width: 25%;
        text-align: center;
        margin: 0 8px;
        cursor: pointer;
        img {
          width: 100%;
          border-radius: 8px;
          background-color: rgba(124, 140, 166, 0.3);
          padding: 16px 0;
        }
      }
      @media screen and (max-width: 820px) {
        flex-wrap: wrap;
        &--item {
          width: calc(50% - 16px);
        }
      }
    }
  }
`;

const AnchorLink = styled.div`
  position: sticky;
  bottom: 15px;
  right: 15px;
  z-index: 99;
  display: flex;
  width: max-content;
  margin-left: auto;
  a {
    padding: 16px 24px;
    border-radius: 4px;
    background: #bc080d;
    box-shadow: 0px 10px 60px rgba(124, 140, 166, 0.25);
    color: #fff;
    text-decoration: none;
  }
`;

const Staff = styled.div`
  padding: 40px 0 80px;

  h2 {
    color: #043455;
    font-size: 22px;
    margin: 24px 0;
  }

  .item {
    padding: 15px;
    
    ul{
      padding-left: 18px;
    }
    
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
        color: #bc080d;
      }
      p {
        line-height: 32px;
        color: #383838;
      }
    }
  }

  @media screen and (max-width: 820px) {
    padding: 40px 15px 80px;
  }
`;

const SuccessCase = styled.div`
  display: flex;
  padding: 40px 0 80px;
  color: #043455;

  .col-md-6 {
    &:first-child {
      padding-right: 15px;
    }
    &:last-child {
      padding-left: 15px;
    }
  }

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
        color: #bc080d;
      }
      p {
        margin: 0;
      }
    }
  }

  @media screen and (max-width: 820px) {
    flex-direction: column-reverse;
    padding: 40px 15px 80px;

    .col-md-6 {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px 0;

      p {
        width: 100%;
      }
      ul {
        width: 100%;
      }
    }
  }
`;

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

  @media screen and (max-width: 820px) {
    padding: 80px 15px;
  }

  @media screen and (max-width: 820px) {
    flex-wrap: wrap;
    overflow: hidden;
    padding-top: 160px;
    position: relative;

    .col-md-6 {
      > div {
        position: absolute;
        top: 10px;
        right: 0;
      }
    }
  }
`;

const Reasons = styled.div`
  position: relative;
  padding: 100px 0;

  h2 {
    font-size: 32px;
    color: #bc080d;
    margin: 24px 0;
  }

  > ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > li {
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
      &.code__html {
        p {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 16px;
        }
        ul {
          padding-left: 20px;
          li {
            margin-bottom: 8px;
          }
        }
      }
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -50vw;
    width: 140vw;
    height: 100%;
    background: rgba(196, 196, 196, 0.15);
    z-index: -2;
  }

  @media screen and (max-width: 820px) {
    padding: 80px 15px;
  }

  @media screen and (max-width: 414px) {
    h2 {
      font-size: 28px;
    }

    ul {
      li {
        width: 100%;
      }
    }
  }
`;

const Video = styled.div`

.video-react .video-react-big-play-button{
  top: 50%;
    left: 50%;
}

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 80px 0;

  iframe {
    width: 100%;
    height: 575px;
    border-radius: 10px;
  }

  @media screen and (max-width: 820px) {
    padding: 0 15px;
  }
`;



const Titlebenefits = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  .col-md-6{
    margin-top: 5%;
  }
  ul{
    margin-left: 12%;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    line-height: 28px;

    color: #383838;
  }
  h1 {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;

    display: flex;
    align-items: center;

    color: #043455;
  }
  p{
    font-weight: 500;
    line-height: 28px;
  }

  @media screen and (max-width: 820px) {
    padding: 0 15px;
  }
`

const Tree = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  .col-md-6{
    margin-top: 5%;
  }
  ul{
    margin-left: 12%;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    line-height: 28px;

    color: #383838;
  }
  h1 {
    position: relative;
    max-width: 100%;
    font-size: 24px;
    color: #043455;
    z-index: 2;
  }
  img {
    margin-top: -30px;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    line-height: 1.5;
    .col-md-6 {
      margin: 8px 0;
      width: 50%;
      padding: 0 15px;
    }
  }

  @media screen and (max-width: 820px) {
    padding: 0 15px;
    .row {
      .col-md-6 {
        width: 100%;
      }
    }
  }
`;

const Benefits = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    position: relative;
    width: 400px;
    max-width: 100%;
    font-size: 24px;
    color: #043455;
    z-index: 2;
  }

  img {
    width: 100%;
    margin: 80px 0 24px;
    height: 500px;
    object-fit: contain;
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
    ul{
      padding-left:18px;
    }
  }

  @media screen and (max-width: 820px) {
    padding: 0 15px;
  }

  @media screen and (max-width: 414px) {
    img {
      height: 300px;
    }
    .row {
      .item {
        width: 100%;
      }
    }
  }
`;

const Principal = styled.div`
  display: flex;
  margin: 8px auto 0;
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
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;
    }

    h5 {
      font-size: 16px;
      font-weight: bold;
      color: #000;
    }

    ul {
      padding-left: 40px !important;
      li {
        line-height: 1.5;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .content {
      &__image {
        img {
          right: -80px;
        }
      }
    }
  }

  @media screen and (max-width: 820px) {
    flex-wrap: wrap;
    flex-direction: column-reverse;
    padding: 0;

    .content {
      margin: 24px auto;
      padding: 0 15px;
      &__image {
        img {
          position: static;
          top: 0;
          right: 0;
          display: flex;
          margin-left: auto;
        }
      }
    }
  }

  @media screen and (max-width: 414px) {
    .content {
      &__image {
        img {
          height: 300px;
          object-position: bottom;
          object-fit: cover;
        }
      }
    }
  }
`;

const Container = styled.div`
  width: calc(100% - 250px);
  margin: 0 auto;

  @media screen and (max-width: 820px) {
    width: calc(100% - 72px);
    max-width: calc(100% - 72px);
    margin-left: auto;
    margin-right: 0;
    overflow: auto;
    overflow-x: hidden;
  }
`;

export default Produto;
