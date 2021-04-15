import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Drawer from '../components/Drawer'
import Header from '../components/Header'
import Sync from '../components/Sync'
import { ToastContainer } from 'react-toastify'
import FilterAdvanced from '../components/FilterAdvanced'
import db from '../database'
import { useLiveQuery } from 'dexie-react-hooks'

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';


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

  const history = useHistory()
  const [values, setValues] = useState({
    search_input: null
  })
  // const [categories, setCategories] = useState(null)

  const categories = useLiveQuery(
    () => db.categories.toArray()
  )

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearch = (event) => {
    event.preventDefault()
    const search = values.search_input
    if (search) {
      history.push(`/produtos/?search=${search}`)
    }
  }

  return (
    <div className="row">
      <Drawer />
      <Header />
      <Sync />
        
      <Container className="container">
        <h1>O que você procura?</h1>
        <Filters>
          <form onSubmit={ handleSearch }>
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
          </form>
          
          <FilterAdvanced />
        </Filters>

        <div className="row">
          {categories?.map(item => (
            <Categories>
              <Link to={`/produtos/?category=${item.title}`}>
                <img src={ item.image } alt={item.title} />
                <h3>{ item.title }</h3>
                <button>
                  Ver Mais
                </button>
              </Link>
            </Categories>
          ))}
        </div>
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

  form {
    width: calc(100% - 180px);
  }
  .MuiFormControl-root {
    width: 100%;
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

  @media screen and (max-width: 766px) {
    flex-wrap: wrap;
    .MuiFormControl-root {
      width: 100%;
    }

    a {
      width: 100%;
      justify-content: center;
    }
  }
`

const Categories = styled.div`
  width: calc(50% - 32px);
  height: 240px;
  margin: 8px 16px;
  border-radius: 10px;
  background-color: #C4C4C4;
  overflow: hidden;
  position: relative;

  a {
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.4s;
  }

  h3 {
    color: #FFF;
    font-size: 40px;
    font-weight: 600;
    position: absolute;
    bottom: 30px;
    left: 30px;
    max-width: 60%;
    line-height: 40px;
  }

  button {
    position: absolute;
    bottom: 30px;
    right: 30px;
    background: #BC080D;
    color: #FFF;
    border: none;
    padding: 16px 24px;
    border-radius: 4px;
    font-size: 14px;
    transition: all 0.3s;

    &:hover {
      background: #8c0509;
    }
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }

  @media screen and (max-width: 1024px) {
    h3 {
      font-size: 32px;
    }
  }

  @media screen and (max-width: 800px) {
    width: calc(100% - 32px);
  }

  @media screen and (max-width: 414px) {
    h3 {
      font-size: 28px;
      left: 8px;
      line-height: 1;
    }

    button {
      right: 8px;
    }
  }

  @media screen and (max-width: 375px) {
    margin: 8px 0;
    width: 100%;
    height: 160px;

    h3 {
      font-size: 22px;
    }

    button {
      padding: 8px;
    }
  }
`

export default Dashboard;
