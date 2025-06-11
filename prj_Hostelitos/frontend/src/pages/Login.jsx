import "../style/webstyle.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-box">
        <div id="login-form">
          <p className="form-title">Login</p>

          <form>
            <div className="input-group">
              <label htmlFor="email" className="login-label">
                E-mail:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input-field"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="login-label">
                Senha:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input-field"
                required
              />
            </div>

            <button type="submit" className="login-button login-form-button">
              Entrar
            </button>
          </form>

          <div className="login-links">
            <button
              onClick={() => navigate("/register")}
              className="register-link"
            >
              Cadastra-se
            </button>
            <button className="forgot-password">Esqueceu a senha?</button>
          </div>
        </div>

        <div className="illustration-wrapper">
          <img src="/img/image login.jpg" alt="Login illustration" />
        </div>
      </div>
    </div>
  );
}
