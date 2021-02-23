import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div className="container">
      <h1>Tela de Dashboard</h1>
      <Link to="/">
        Go to Login
      </Link>
    </div>
  );
}

export default Dashboard;
