import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Drawer from '../components/Drawer'
import Header from '../components/Header'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import api from "../services/api"
import { ToastContainer, toast } from 'react-toastify'

function ListUsers() {

  const [rows, setRows] = useState([])

  function createData(id, name, birth, phone, type, status) {
    return { id, name, birth, phone, type, status}
  }

  useEffect(() => {
    api.get('/users')
    .then(response => {
      let newRows = []
      response.data.data.map(item => {
        return (
          newRows.push(createData(
            item.id,
            item.name,
            item.birth_date,
            item.phone,
            item.type,
            item.status === 1 ? "ativo" : "inativo"
          ))
        )
      })
      setRows(newRows)
    })
    .catch(error => {
      console.log(error)
      toast.info('Erro ao se conectar com o servidor!', {
        autoClose: 5000
      })
    })
  }, [])

  const handleActive = (event) => {
    console.log("TO DO: Função para ativar/desativar usuário")
  }

  return (
    <div className="row">
      <Drawer />
      <Header />
        
      <Container className="container">
        <h1>Usuários</h1>
        <TableContainer component={ Paper }>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Data de Nascimento</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Tipo de Usuário</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 && rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.birth}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>
                    <button onClick={ handleActive } className={row.status} >
                      {row.status}
                    </button>
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
      cursor: pointer;
      transition: background-color 0.4s;

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
`

export default ListUsers;
