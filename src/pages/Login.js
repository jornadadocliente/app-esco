import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="container">
      <h1>Tela de login</h1>
      <Link to="/dashboard">
        Go to Dashboard
      </Link>
    </div>
  );
}

export default Login;
