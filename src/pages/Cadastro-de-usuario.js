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
import { ToastContainer, toast } from 'react-toastify'

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
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    data_nascimento: "",
    senha: "",
    confirm_senha: "",
    type: ""
  });
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    event.preventDefault()
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const resetForm = () => {
    setValues({
      nome: "",
      email: "",
      cpf: "",
      telefone: "",
      data_nascimento: "",
      senha: "",
      confirm_senha: "",
      type: ""
    })
  }

  const handleValidate = () => {
    let temp = {}
    temp.nome = values.nome.length !== 0 ? "" : "Este campo é obrigatório!"
    temp.email = values.email.length !== 0 && (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email inválido!"
    temp.cpf = values.cpf.length !== 0 ? "" : "Este campo é obrigatório!"
    temp.type = values.type.length !== 0 ? "" : "Este campo é obrigatório!"
    temp.telefone = values.telefone.length !== 0 ? "" : "Este campo é obrigatório!"
    temp.data_nascimento = values.data_nascimento.length !== 0 ? "" : "Este campo é obrigatório!"
    temp.senha = values.senha.length !== 0 ? "" : "Este campo é obrigatório!"
    temp.confirm_senha = values.confirm_senha.length !== 0 && values.confirm_senha === values.senha ? "" : "As senhas estão diferentes!"
    setErrors({
      ...temp
    })

    return Object.values(temp).every(x => x === "")
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (handleValidate()) {
      let data = {
        name: values.nome,
        email: values.email,
        profile_image: "https://www.wikiaves.com.br/img/semfoto.png",
        cpf: values.cpf,
        type: values.type,
        phone: values.telefone,
        birth_date: values.data_nascimento,
        password: values.senha
      }
      api.post("/users", data)
      .then(response => {
        toast.info(`${values.nome}, cadastrado com sucesso!`, {
          autoClose: 5000
        })
      })
      .then(() => {
        resetForm()
      })
      .catch(error => {
        console.log(error)
        toast.info('Erro ao se conectar com o servidor!', {
          autoClose: 5000
        })
      })
    }
  }

  return (
    <div className="row">
      <Drawer />
      <Header />

      <Container className="container">
        <h1>Cadastro De Usuário</h1>
        <FormUser onSubmit={handleSubmit} autoComplete="off">
          <CssTextField 
            error={errors.nome}
            label="Nome" 
            variant="outlined" 
            name="nome" 
            value={values.nome}
            onChange={e => handleChange(e)}
            required
          />
          <CssTextField 
            error={errors.email}
            type="email"
            label="Email" 
            variant="outlined" 
            name="email" 
            value={values.email}
            onChange={handleChange}
            required
            />
          <CssTextField 
            error={errors.senha}
            label="Senha" 
            variant="outlined" 
            name="senha" 
            value={values.senha}
            onChange={handleChange}
            type="password"
            required
            />
          <CssTextField 
            label="Confirmar Senha" 
            variant="outlined" 
            name="confirm_senha" 
            value={values.confirm_senha}
            error={errors.confirm_senha}
            onChange={handleChange}
            type="password"
            required
          />
          <ReactInputMask mask="999.999.999-99" maskChar="" onChange={handleChange} value={values.cpf} >
            {() => (
              <CssTextField 
                error={errors.cpf}
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
                error={errors.telefone}
                type="tel"
                label="Telefone" 
                variant="outlined" 
                name="telefone"
                required
              />
            )}
          </ReactInputMask>
          <ReactInputMask mask="99/99/9999" maskChar="" value={values.data_nascimento}  onChange={handleChange} >
            {() => (
              <CssTextField 
                error={errors.data_nascimento}
                label="Data de nascimento" 
                variant="outlined" 
                name="data_nascimento"
                required
              />
            )}
          </ReactInputMask>
          <FormControl variant="outlined" required>
            <InputLabel id="tipo_de_usuario">
              Tipo de Usuário
            </InputLabel>
            <CssSelect
              label="Tipo de Usuário"
              labelId="tipo_de_usuario"
              value={values.type}
              error={errors.type}
              name="type"
              onChange={handleChange}
              required
            >
              <MenuItem value={null} disabled >Tipo de Usuário</MenuItem>
              <MenuItem value={"admin"}>Administrador</MenuItem>
              <MenuItem value={"consultor"}>Consultores</MenuItem>
            </CssSelect>
          </FormControl>
          <button type="submit" onClick={handleSubmit}>
            Enviar
          </button>
        </FormUser>
      </Container>

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        pauseOnHover
      />
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
