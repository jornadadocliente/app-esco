import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Drawer from '../components/Drawer'
import Header from '../components/Header'
import db from '../database'
import { useLiveQuery } from 'dexie-react-hooks'
import api from "../services/api"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ToastContainer, toast } from 'react-toastify'
import EmailIcon from '@material-ui/icons/Email';
import DeleteIcon from '@material-ui/icons/Delete';

function ListOrcamentos() {

  const [rows, setRows] = useState([])
  const orcamentos = useLiveQuery(
    () => db.orcamentos.toArray()
  )

  useEffect(() => {
    if (orcamentos) {
      setRows(orcamentos)
    }
  }, [orcamentos])

  const handleSendOrcamentos = (e) => {
    e.preventDefault()
    // eslint-disable-next-line
    orcamentos.map(item => {
      const data = {
        user_id: item.user_id,
        product_id: item.product_id,
        full_name: item.full_name,
        product_category_id: item.product_category_id,
        email: item.email,
        phone: item.phone,
        details: item.details
      }
      if (item.status === false) {
        api.post("/proposal", data)
        .then(() => {
          db.orcamentos.update(item.id, {status: true})
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
      }
    })
  }

  const handleDelete = (e, orcamentoId) => {
    e.preventDefault();
    if (window.confirm(`Tem certeza que deseja remover o orçamento ${orcamentoId}?`)) {
      db.orcamentos.delete(orcamentoId)
    }
  }

  return (
    <div className="row">
      <Drawer />
      <Header />
        
      <Container className="container">
        <div className="row head">
          <h1>Orçamentos</h1>
          <button onClick={ handleSendOrcamentos } >
            <EmailIcon />
            Enviar Todos
          </button>
        </div>
        <TableContainer component={ Paper }>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Produto</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 && rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.full_name}</TableCell>
                  <TableCell>{row.product_name}</TableCell>
                  <TableCell>{row.category_name}</TableCell>
                  <TableCell>{row.status ? "Enviado" : "Pendente"}</TableCell>
                  <TableCell>
                    { !row.status ? (
                      <button onClick={ e => handleDelete(e, row.id) } className="inativo" >
                        <DeleteIcon />
                      </button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

  .head {
    align-items: center;
    justify-content: space-between;

    button {
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 16px;
      background: #BC090E;
      color: #FFF;
      font-size: 14px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 600;
      transition: background-color 0.3s;
      svg {
        margin-right: 8px;
      }
      &:hover {
        background: #a01216;
      }
    }
  }

  h1 {
    color: #043455;
    font-size: 24px;
    margin: 24px 0 16px;
  }

  .MuiTableContainer-root {
    margin: 24px 0;
  }

  th {
    font-weight: 600;
    background: rgba(188, 9, 14, 0.3);
  }

  table {
    button {
      padding: 8px 16px;
      border-radius: 6px;
      background: #5da75d;
      border: none;
      font-weight: 600;
      color: #FFF;
      text-transform: capitalize;
      font-size: 10px;
      cursor: pointer;
      transition: background-color 0.4s;

      svg {
        height: 20px;
      }

      &:hover {
        background: #427942;
      }

      &.inativo {
        background: #bf2b2f;
        &:hover {
          background: #962023;
        }
      }
    }
  }

  @media screen and (max-width: 800px) {
    width: calc(100% - 72px);
    max-width: calc(100% - 72px);
    margin-left: auto;
    margin-right: 0;
  }

  @media screen and (max-width: 700px) {
    .head {
      button {
        overflow: hidden;
        width: 40px;
        white-space: nowrap;
        justify-content: flex-start;
        padding: 8px 8px;
        svg {
          margin-right: 16px;
        }
      }
    }
  }
`

export default ListOrcamentos;
