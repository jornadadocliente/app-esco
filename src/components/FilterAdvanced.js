import { useState } from 'react'
import styled from 'styled-components'

import TuneIcon from '@material-ui/icons/Tune';
import CloseIcon from '@material-ui/icons/Close';

const FilterAdvanced = (props) => {

  const [showFilter, setShowFilter] = useState(false)

  const handleFilter = () => {
    console.log("Função para filtrar tudo!")
  }

  return (
    <>
      <ShowFilter onClick={() => setShowFilter(true)}>
        <TuneIcon /> Filtro Avançado
      </ShowFilter>

      <Container className={showFilter ? 'show' : ''}>
        <div className="container">
          <div className="title">
            <h1>
              <TuneIcon /> Pesquisa Avançada
            </h1>
          </div>

          <FilterSection>
            <h2>TIPO DE MÁQUINA</h2>
            <div className="row">
              <div className="input__group">
                <input type="radio" name="type_machine" id="maquina-1" value="Escavadeira e Retroescavadeira" />
                <label htmlFor="maquina-1">Escavadeira e Retroescavadeira</label>
              </div>
              
              <div className="input__group">
                <input type="radio" name="type_machine" id="maquina-2" value="Retroescavadeira de Trator" />
                <label htmlFor="maquina-2">Retroescavadeira de Trator</label>
              </div>
              
              <div className="input__group">
                <input type="radio" name="type_machine" id="maquina-3" value="Retroescavadeira Carregador Frontal" />
                <label htmlFor="maquina-3">Retroescavadeira Carregador Frontal</label>
              </div>
            </div>
          </FilterSection>

          <FilterSection>
            <h2>MODELO DA MÁQUINA</h2>
            <div className="row">
              <div className="input__group">
                <input type="radio" name="model_machine" id="modelo-1" value="Cable Shovel" />
                <label htmlFor="modelo-1">Cable Shovel</label>
              </div>
              
              <div className="input__group">
                <input type="radio" name="model_machine" id="modelo-2" value="Construction Excavator" />
                <label htmlFor="modelo-2">Construction Excavator</label>
              </div>
              
              <div className="input__group">
                <input type="radio" name="model_machine" id="modelo-3" value="Continuos Miner" />
                <label htmlFor="modelo-3">Continuos Miner</label>
              </div>
              <div className="input__group">
                <input type="radio" name="model_machine" id="modelo-4" value="Conveyor" />
                <label htmlFor="modelo-4">Conveyor</label>
              </div>
              <div className="input__group">
                <input type="radio" name="model_machine" id="modelo-5" value="Dozer" />
                <label htmlFor="modelo-5">Dozer</label>
              </div>
              <div className="input__group">
                <input type="radio" name="model_machine" id="modelo-6" value="Dragline" />
                <label htmlFor="modelo-6">Dragline</label>
              </div>
              <div className="input__group">
                <input type="radio" name="model_machine" id="modelo-7" value="Dregde" />
                <label htmlFor="modelo-7">Dregde</label>
              </div>
              <div className="input__group">
                <input type="radio" name="model_machine" id="modelo-8" value="Grader" />
                <label htmlFor="modelo-8">Grader</label>
              </div>
            </div>
          </FilterSection>

          <FilterSection style={{ borderBottom: "none" }}>
            <h2>APLICAÇÃO</h2>
            <div className="row">
              <div className="input__group">
                <input type="radio" name="aplication" id="aplication-1" value="Escavadeira e Retroescavadeira" />
                <label htmlFor="aplication-1">Escavadeira e Retroescavadeira</label>
              </div>
              
              <div className="input__group">
                <input type="radio" name="aplication" id="aplication-2" value="Retroescavadeira de Trator" />
                <label htmlFor="aplication-2">Retroescavadeira de Trator</label>
              </div>
              
              <div className="input__group">
                <input type="radio" name="aplication" id="aplication-3" value="Retroescavadeira Carregador Frontal" />
                <label htmlFor="aplication-3">Retroescavadeira Carregador Frontal</label>
              </div>
            </div>
          </FilterSection>

          <SendButton onClick={() => handleFilter()}>
            Pesquisar
          </SendButton>


          <CloseFilter onClick={() => setShowFilter(false)}>
            <CloseIcon />
          </CloseFilter>
        </div>
      </Container>

    </>
  );
}

const SendButton = styled.button`
  background: #BC080D;
  border: none;
  border-radius: 10px;
  padding: 16px 32px;
  color: #FFF;
  font-weight: 600;
  width: max-content;
`

const FilterSection = styled.div`
  padding: 24px 18px 40px;
  border-bottom: 1px solid #043455;

  h2 {
    color: #043455;
    font-size: 20px;
    font-weight: 500;
    margin: 0 0 20px;
  }

  .input__group {
    width: 33.3%;
    margin: 16px 0;
  }

  label {
    display: flex;
    width: 100%;
    padding: 8px 0 8px 30px;
    position: relative;
    color: #043455;
    font-size: 16px;
    cursor: pointer;

    &:before {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid #043455;
      background-color: #FFF;
      top: 6px;
      left: 0;
    }

    &:after {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: transparent;
      top: 11px;
      left: 5px;
    }
  }

  input {
    position: absolute;
    left: -200vw;
    opacity: 0;
    &:checked~label {
      &:after {
        background-color: #043455;
      }
    }
  }

  @media screen and (max-width: 760px) {
    .input__group {
      width: 100%;
    }
  }
`

const Container = styled.div`
  width: calc(100% - 72px);
  height: 100vh;
  position: fixed;
  z-index: 997;
  top: 150vh;
  left: 72px;
  background-color: #FFF;
  transition: top 0.5s;
  overflow: auto;
  padding: 0 0 40px;

  &.show {
    top: 0;
  }

  .container {
    position: relative;

    .title {
      h1 {
        display: flex;
        align-items: center;
        color: #043455;
        font-size: 20px;
        margin: 60px 0;
        svg {
          margin-right: 8px;
        }
      }
    }
  }

  @media screen and (max-width: 760px) {
    .container {
      .title {
        h1 {
          max-width: 75%;
        }
      }
    }
  }
`

const ShowFilter = styled.div`
  color: #043455;
  font-size: 14px;
  padding: 8px 16px;
  margin: 8px 0 8px 8px;
  border-radius: 4px;
  align-items: center;
  display: flex;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    background-color: #04345526;
  }

  @media screen and (max-width: 760px) {
    color: transparent; 
    overflow: hidden;
    width: 60px;
    margin: 0;
    padding: 2px 16px;
    svg {
      color: #043455;
    }
  }
`

const CloseFilter = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  color: #BC080D;
  font-size: 18px;
  border-radius: 4px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s;

  svg {
    width: 36px;
    height: 36px;
  }

  &:hover {
    background: rgba(191, 0, 33, 0.1);
  }
`

export default FilterAdvanced;
