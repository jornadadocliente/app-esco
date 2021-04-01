import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import db from '../database'
import { useLiveQuery } from 'dexie-react-hooks'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

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
    () => db.user.toArray()
  )
  const categories = useLiveQuery(
    () => db.categories.toArray()
  )
  const produtos = useLiveQuery(
    () => db.products.toArray()
  )
  
  const produto_open = props?.produto

  const [values, setValues] = useState({
    nome: "",
    email: "",
    telefone: "",
    produto: "",
    produtoId: "",
    familia: "",
    details: "",
    category_title: ""
  })
  const [errors, setErrors] = useState({})

  const handleValidate = () => {
    let temp = {}
    temp.nome = values.nome.length !== 0 ? "" : "Este campo é obrigatório!"
    temp.email = values.email.length !== 0 && (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email inválido!"
    temp.telefone = values.telefone.length !== 0 ? "" : "Este campo é obrigatório!"
    setErrors({
      ...temp
    })

    return Object.values(temp).every(x => x === "")
  }

  const handleChange = (event) => {
    handleValidate()
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const newCategory = categories?.filter(item => {
      return values.familia === item.id
    })
    setValues({
      ...values,
      // eslint-disable-next-line
      ["category_title"]: newCategory ? newCategory[0].title : ""
    })
    // eslint-disable-next-line
  }, [values.familia])

  useEffect(() => {
    const newProduto = produtos?.filter(item => {
      return values.produtoId === item.id
    })
    setValues({
      ...values,
      // eslint-disable-next-line
      ["nome"]: newProduto ? newProduto[0].name : ""
    })
    // eslint-disable-next-line
  }, [values.produtoId])

  function handleSubmit(e) {
    e.preventDefault();
    if (handleValidate()) {
      let data = {
        user_id: user[0].id,
        product_id: props.produtoId ? props.produtoId : values.produtoId,
        full_name: values.nome,
        product_category_id: produto_open ? produto_open.category.id : values.familia,
        email: values.email,
        phone: values.telefone,
        details: values.details,
        product_name: produto_open ? produto_open.name : values.nome,
        category_name: produto_open ? produto_open.category.title : values.category_title,
        status: false
      }
      db.orcamentos.add(data)
      toast.info('Orçamento salvo!', {
        autoClose: 5000
      })
    }
  }

  return (
    <Container onSubmit={e => handleSubmit(e)} autoComplete="off" id={ props?.id }>
      <h2>Solicite o seu orçamento</h2>
      <CssTextField 
        label="Nome" 
        variant="outlined" 
        name="nome" 
        value={values.nome}
        error={errors.nome}
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
            error={errors.email}
            onChange={handleChange}
            required
            />
        </div>
        <div className="col-md-6">
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
        </div>
      </div>

      <Divider />

      <h2>Informações de Produto</h2>
      {produto_open ? (
        <>
          <CssTextField 
            label="Produto" 
            variant="outlined" 
            name="produto" 
            value={produto_open?.name}
            disabled
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
              value={produto_open?.category.id}
              name="familia"
              onChange={handleChange}
              required
              disabled
            >
              <MenuItem value={null} disabled >Família do Produto</MenuItem>
              {categories?.map(item => {
                return (
                  <MenuItem value={item.id}>{ item.title }</MenuItem>
                )
              })}
            </CssSelect>
          </FormControl>
        </>
      ) : (
        <>
          <FormControl variant="outlined" required>
            <InputLabel id="produtoId">
              Produto
            </InputLabel>
            <CssSelect
              label="Família do Produto"
              labelId="produtoId"
              value={values.produtoId}
              name="produtoId"
              onChange={handleChange}
              required
            >
              <MenuItem value={null} disabled >Produto</MenuItem>
              {produtos?.map(item => {
                return (
                  <MenuItem value={item.id}>{ item.name }</MenuItem>
                )
              })}
            </CssSelect>
          </FormControl>
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
              {categories?.map(item => {
                return (
                  <MenuItem value={item.id}>{ item.title }</MenuItem>
                )
              })}
            </CssSelect>
          </FormControl>
        </>
      )}
      <CssTextField 
        label="Dê mais detalhes sobre o seu orçamento" 
        variant="outlined" 
        name="details" 
        value={values.details}
        onChange={handleChange}
        multiline
        rows={6}
        />
      
      <SubmitContent type="submit" onClick={ e => handleSubmit(e) }>
        Solicitar Orçamento
      </SubmitContent>

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        pauseOnHover
      />
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