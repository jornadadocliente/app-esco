import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import api from "../services/api"
import db from '../database'
import styled from 'styled-components'

import CircularProgress from '@material-ui/core/CircularProgress';

const Sync = (props) => {

  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect( () => {

    // Lista Categorias
    api.get('/categories')
    .then(response => {
      setCategories(response.data.data)
    })
    .catch(error => {
      console.log(error)
    })

    // Lista Produtos
    api.get('/products')
    .then(response => {
      setProducts(response.data.data)
    })
    .catch(error => {
      console.log(error)
    })

  }, [])

  useEffect(() => {

    try {
      if (categories) {
        db.categories.clear()
        db.categories.bulkAdd(categories)
      }
      setLoading(false)
    } catch (error) {
      
    }

  }, [categories])

  useEffect(() => {

    try {
      if (products) {
        db.products.clear()
        db.products.bulkAdd(products)
      }
      setLoading(false)
    } catch (error) {
      
    }

  }, [products])

  return (
    <>
      <Loading className={loading ? "ativo" : ""}>
        <CircularProgress color="white"/>
        <p>Sincronizando seus dados!</p>
      </Loading>

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        pauseOnHover
      />
    </>
  )
}

const Loading = styled.div`
  position: fixed;
  z-index: -10;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  color: #FFF;
  font-weight: 600;
  font-size: 22px;

  &.ativo {
    z-index: 999;
    display: flex;
  }
`

export default Sync;