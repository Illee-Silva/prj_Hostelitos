import '../style/webstyle.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>Login</h1>

        <form>

          <div className="input-group">
            <label htmlFor="username" className='login-label'>Usuário:</label>
            <input type="text" id="username" name="username" className="input-field" required />
          </div>

          <div className="input-group">
            <label htmlFor="password" className='login-label'>Senha:</label>
            <input type="password" id="password" name="password" className="input-field" required />
          </div>

          <button type="submit" className="login-button">ENTRAR</button>

        </form>
        <button onClick={() => navigate('/')} className="back-home">Register</button>
      </div>
    </div>
  );
}
