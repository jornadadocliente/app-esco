import { useState } from 'react'
import styled from 'styled-components'
import Drawer from '../components/Drawer'
import Header from '../components/Header'
import api from '../services/api'

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
    let data = {
      name: values.nome,
      email: values.email,
      profile_image: null,
      cpf: values.cpf,
      type: values.type,
      phone: values.telefone,
      birth_date: values.data_nascimento,
      password: values.senha
    }
    api.post("/users", data)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="row">
      <Drawer />
      <Header />

      <Container className="container">
        <h1>Cadastro De Usuário</h1>
        <FormUser onSubmit={e => handleSubmit(e)} noValidate autoComplete="off">
          <CssTextField 
            error={values.nome ? false : true}
            label="Nome" 
            variant="outlined" 
            name="nome" 
            value={values.nome}
            onChange={handleChange}
            required
          />
          <CssTextField 
            error={values.email ? false : true}
            label="Email" 
            variant="outlined" 
            name="email" 
            value={values.email}
            onChange={handleChange}
            required
            />
          <CssTextField 
            error={values.senha ? false : true}
            label="Senha" 
            variant="outlined" 
            name="senha" 
            value={values.senha}
            onChange={handleChange}
            type="password"
            required
            />
          <CssTextField 
            error={values.senha !== values.confirm_senha}
            label="Confirmar Senha" 
            variant="outlined" 
            name="confirm_senha" 
            value={values.confirm_senha}
            onChange={handleChange}
            type="password"
            required
          />
          <ReactInputMask mask="999.999.999-99" maskChar="" onChange={handleChange} value={values.cpf} >
            {() => (
              <CssTextField 
                error={values.cpf ? false : true}
                type="tel"
                label="CPF" 
                variant="outlined"
                name="cpf"
                required
              />
            )}
          </ReactInputMask>
          <ReactInputMask mask="(99) 9 9999-9999" maskChar="" value={values.telefone} onChange={handleChange} >
            {() => (
              <CssTextField 
                error={values.telefone ? false : true}
                type="tel"
                label="Telefone" 
                variant="outlined" 
                name="telefone"
                required
              />
            )}
          </ReactInputMask>
          <ReactInputMask mask="99/99/9999" maskChar="" value={values.data_nascimento} onChange={handleChange} >
            {() => (
              <CssTextField 
                error={values.data_nascimento ? false : true}
                label="Data de nascimento" 
                variant="outlined" 
                name="data_nascimento"
                required
              />
            )}
          </ReactInputMask>
          <FormControl variant="outlined">
            <InputLabel id="tipo_de_usuario">
              Tipo de Usuário
            </InputLabel>
            <CssSelect
              error={values.type ? false : true}
              label="Tipo de Usuário"
              labelId="tipo_de_usuario"
              value={values.type}
              name="type"
              onChange={handleChange}
              required
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
