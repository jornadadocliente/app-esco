import { useState } from 'react'
import styled from 'styled-components'
import Drawer from '../components/Drawer'
import Header from '../components/Header'

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ReactInputMask from 'react-input-mask';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused' : {
      color: '#BC080D'
    },
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
      borderColor: '#BC080D'
    }
  }
})(TextField)
const CssSelect = withStyles({
  root: {
    '& label.Mui-focused' : {
      color: '#BC080D'
    },
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
      borderColor: '#BC080D'
    }
  }
})(Select)

function CadastroDeUsuario() {

  const [values, setValues] = useState({
    nome: null,
    email: null,
    cpf: null,
    telefone: null,
    data_nascimento: null,
    senha: null,
    confirm_senha: null,
    type: null
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(values)
  }

  return (
    <div className="row">
      <Drawer />
      <Header />

      <Container className="container">
        <h1>Cadastro De Usuário</h1>
        <FormUser onSubmit={e => handleSubmit(e)} autoComplete="off">
          <CssTextField 
            label="Nome" 
            variant="outlined" 
            name="nome" 
            value={values.nome}
            onChange={handleChange}
          />
          <CssTextField 
            label="Email" 
            variant="outlined" 
            name="email" 
            value={values.email}
            onChange={handleChange}
          />
          <CssTextField 
            label="Senha" 
            variant="outlined" 
            name="senha" 
            value={values.senha}
            onChange={handleChange}
          />
          <CssTextField 
            label="Confirmar Senha" 
            variant="outlined" 
            name="confirm_senha" 
            value={values.confirm_senha}
            onChange={handleChange}
          />
          <ReactInputMask mask="999.999.999-99" maskChar="" name="cpf" value={values.cpf} onChange={handleChange}>
            {() => (
              <CssTextField 
                type="tel"
                label="CPF" 
                variant="outlined" 
              />
            )}
          </ReactInputMask>
          <ReactInputMask mask="(99) 9 9999-9999" maskChar="" name="telefone" value={values.telefone} onChange={handleChange} >
            {() => (
              <CssTextField 
                type="tel"
                label="Telefone" 
                variant="outlined" 
              />
            )}
          </ReactInputMask>
          <CssTextField 
            label="Data de nascimento" 
            variant="outlined" 
            name="data_nascimento" 
            value={values.data_nascimento}
            onChange={handleChange}
          />
          <FormControl variant="outlined">
            <InputLabel id="tipo_de_usuario">
              Tipo de Usuário
            </InputLabel>
            <CssSelect
              label="Tipo de Usuário"
              labelId="tipo_de_usuario"
              value={values.type}
              name="type"
              onChange={handleChange}
            >
              <MenuItem value={null} disabled >Tipo de Usuário</MenuItem>
              <MenuItem value={"admin"}>Administrador</MenuItem>
              <MenuItem value={"consultor"}>Consultores</MenuItem>
            </CssSelect>
          </FormControl>
          <button type="submit" onClick={e => handleSubmit(e)}>
            Enviar
          </button>
        </FormUser>
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: calc(100% - 250px);
  max-width: calc(100% - 72px);
  margin-top: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  flex-direction: column;
  min-height: calc(100vh - 72px);

  h1 {
    color: #043455;
    font-size: 24px;
    margin: 24px 0 16px;
  }

  @media screen and (max-width: 800px) {
    width: calc(100% - 72px);
    max-width: calc(100% - 72px);
    margin-left: auto;
    margin-right: 0;
  }
`

const FormUser = styled.div`
  width: 500px;
  max-width: 100%;
  display: flex;
  flex-direction: column;

  .MuiFormControl-root {
    margin: 8px 0;
  }
  .Mui-Focused {
    color: #BC080D;
    .MuiSelect-root {
      border-color: #BC080D;
    }
  }

  button {
    padding: 16px 24px;
    background: #BC080D;
    color: #FFF;
    border-radius: 6px;
    border: none;
    margin: 0 0 24px;
    font-weight: 600;
  }
`

export default CadastroDeUsuario;
