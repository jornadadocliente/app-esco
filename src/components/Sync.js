import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import api from "../services/api"
import db from '../database'
import { useLiveQuery } from 'dexie-react-hooks'
import styled from 'styled-components'

import CircularProgress from '@material-ui/core/CircularProgress';

const Sync = (props) => {

  const [user, setUser] = useState(null)
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  const orcamentos = useLiveQuery(
    () => db.orcamentos.toArray()
  )

  useEffect( () => {

    // Mostra o usuário Logado
    const user_id = window.localStorage.getItem('esco_user_id')
    api.get(`/user/${user_id}`)
    .then(response => {
      setUser(response.data.data)
    })
    .catch(error => {
      console.log(error)
    })

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
      if (user) {
        db.user.clear()
        db.user.add(user)
      }
    } catch (error) {

    }
  }, [user])

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

  useEffect(() => {
    if (orcamentos?.length > 0) {
      try {
        // eslint-disable-next-line
        orcamentos?.map(item => {
          let data = {
            user_id: item.user_id,
            product_id: item.product_id,
            full_name: item.full_name,
            product_category_id: item.product_category_id,
            email: item.email,
            phone: item.phone,
            details: item.details
          }
          api.post('/proposal', data)
          .then(() => {
            db.orcamentos.delete(item.id)
          })
          .catch(error => {
            if (error.response.status === 500) {
              toast.info(`Erro ao enviar o orçamento ${item.id}, verifique sua conexão com a internet!`, {
                autoClose: 5000
              })
            } else {
              toast.info('Você parece está sem internet, conecte-se para enviar seus orçamentos!', {
                autoClose: 5000
              })
            }
          })
        })
      } catch (error) {
        toast.info('Você parece está sem internet, conecte-se para enviar seus orçamentos!', {
          autoClose: 5000
        })
      }
    }
  }, [orcamentos])

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