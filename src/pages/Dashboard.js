import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Drawer from '../components/Drawer'
import Header from '../components/Header'

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';

const CssTextField = withStyles({
  root: {
    '& .MuiInputBase-root': {
      backgroundColor: '#FFF',
    },
    '& label.Mui-focused' : {
      color: '#BC080D'
    },
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
      borderColor: '#BC080D'
    },
    '& .Mui-focused .MuiSvgIcon-root': {
      color: '#BC080D'
    }
  }
})(TextField)

function Dashboard() {

  const [values, setValues] = useState({
    search_input: null
  })

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="row">
      <Drawer />
      <Header />
        
      <Container className="container">
        <h1>O que você procura?</h1>
        <Filters>
          <CssTextField 
            placeholder="Digite aqui o nome do Produto ou Aplicação" 
            variant="filled"
            name="search_input"
            value={values.search_input}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Link to="/">
            <TuneIcon /> Filtro Avançado
          </Link>
        </Filters>
      </Container>

    </div>
  );
}

const Container = styled.div`
  width: calc(100% - 250px);
  margin-top: 72px;

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

const Filters = styled.div`
  width: 100%;
  margin: 16px 0 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #7C8CA6;
  display: flex;
  align-items: center;

  .MuiFormControl-root {
    width: calc(100% - 180px);
    border-radius: 10px;

    .MuiInputBase-root {
      border-radius: 10px;
      &:before {
        content: none;
      }
      &:after {
        content: none;
      }
    }
    input {
      border-radius: 10px;
    }
  }

  a {
    color: #043455;
    font-size: 14px;
    padding: 8px 16px;
    margin: 8px 0 8px 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.5s;

    &:hover {
      background-color: #04345526;
    }
  }
`

export default Dashboard;
