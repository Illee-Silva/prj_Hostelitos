import '../style/webstyle.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Cadastro</h1>
        <form>
          <div className="input-group">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" className="input-field" required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" className="input-field" required />
          </div>
          <div className="input-group">
            <label htmlFor="username">Usuário:</label>
            <input type="text" id="username" name="username" className="input-field" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" className="input-field" required />
          </div>
          <button type="submit" className="login-button">Cadastrar</button>
        </form>
        <button onClick={() => navigate('/login')} className="back-home">have login? just enter</button>
      </div>
    </div>
  );
}