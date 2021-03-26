import React, { useState } from 'react'
import styled from 'styled-components'
import db from '../database'
import { useLiveQuery } from 'dexie-react-hooks'

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

const FormOrcamento = (props) => {

  const user = useLiveQuery(
    () => db.products.toArray()
  )

  const [values, setValues] = useState({
    nome: "",
    email: "",
    telefone: "",
    produto: "",
    familia: "",
    details: ""
  })

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    let data = {
      user_id: 1,
      name: values.nome,
    }
    console.log(data)
  }

  return (
    <Container onSubmit={e => handleSubmit(e)} autoComplete="off" id={ props?.id }>
      <h2>Solicite o seu orçamento</h2>
      <CssTextField 
        label="Nome" 
        variant="outlined" 
        name="nome" 
        value={values.nome}
        onChange={handleChange}
        required
        />
      <div className="row">
        <div className="col-md-6">
          <CssTextField 
            label="Email" 
            variant="outlined" 
            name="email" 
            value={values.email}
            onChange={handleChange}
            required
            />
        </div>
        <div className="col-md-6">
          <ReactInputMask mask="(99) 9 9999-9999" maskChar="" value={values.telefone} onChange={handleChange} >
            {() => (
              <CssTextField 
                type="tel"
                label="Telefone" 
                variant="outlined" 
                name="telefone"
                required
              />
            )}
          </ReactInputMask>
        </div>
      </div>

      <Divider />

      <h2>Informações de Produto</h2>
      <CssTextField 
        label="Produto" 
        variant="outlined" 
        name="produto" 
        value={values.produto}
        onChange={handleChange}
        required
        />
      <FormControl variant="outlined" required>
        <InputLabel id="familia_do_produto">
          Família do Produto
        </InputLabel>
        <CssSelect
          label="Família do Produto"
          labelId="familia_do_produto"
          value={values.familia}
          name="familia"
          onChange={handleChange}
          required
        >
          <MenuItem value={null} disabled >Família do Produto</MenuItem>
          <MenuItem value={1}>Báscula</MenuItem>
          <MenuItem value={2}>Chapa de Desgaste</MenuItem>
          <MenuItem value={3}>Gets</MenuItem>
          <MenuItem value={4}>Kwik Lok</MenuItem>
        </CssSelect>
      </FormControl>
      <CssTextField 
        label="Dê mais detalhes sobre o seu orçamento" 
        variant="outlined" 
        name="details" 
        value={values.details}
        onChange={handleChange}
        multiline
        rows={6}
        required
        />
      
      <SubmitContent type="submit" onClick={ e => handleSubmit(e) }>
        Solicitar Orçamento
      </SubmitContent>
    </Container>
  )
}

const SubmitContent = styled.button`
  margin: 24px 0;
  width: max-content;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  padding: 16px 24px;
  background: #BC080D;
  color: #FFF;
  cursor: pointer;
`

const Container = styled.form`
  padding: 72px 0;

  h2 {
    color: #043455;
    font-size: 24px;
    margin: 0 0 24px;
  }

  .col-md-6 {
    padding: 0 15px;
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
  }

  .MuiTextField-root {
    width: 100%;
    margin: 8px 0;
  }
  .MuiFormControl-root {
    width: 100%;
    margin: 8px 0;
  }

  @media screen and (max-width: 800px) {
    padding: 72px 15px;

    .col-md-6 {
      padding: 0;
    }
  }
`

const Divider = styled.div`
  margin: 40px 0;
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.25);
`

export default FormOrcamento;