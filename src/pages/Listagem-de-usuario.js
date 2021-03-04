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

function ListUsers() {

  function createData(id, name, birth, phone, type, status) {
    return { id, name, birth, phone, type, status}
  }

  const rows = [
    createData(
      1,
      "Tiago Fernandes", 
      "16/08/1997", 
      "(86) 99927-7821",
      "Administrador",
      "Ativo"
    ),
    createData(
      2,
      "Tiago Fernandes", 
      "16/08/1997", 
      "(86) 99927-7821",
      "Administrador",
      "Ativo"
    )
  ]

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
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.birth}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

  .MuiTableContainer-root {
    margin: 24px 0;
  }

  th {
    font-weight: 600;
    background: rgba(188, 9, 14, 0.3);
  }

  @media screen and (max-width: 800px) {
    width: calc(100% - 72px);
    max-width: calc(100% - 72px);
    margin-left: auto;
    margin-right: 0;
  }
`

export default ListUsers;
