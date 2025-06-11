import "../style/webstyle.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-box">
        <div id="login-form">
          <p className="form-title">Cadastro</p>

          <form>
            <div className="input-group">
              <label htmlFor="name" className="login-label">
                Nome:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="input-field"
                required
              />
            </div>

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
              Cadastrar
            </button>
          </form>

          <div className="login-links">
            <button
              onClick={() => navigate("/login")}
              className="register-link"
            >
              Já tem conta? Entrar
            </button>
          </div>
        </div>

        <div className="illustration-wrapper">
          <img src="/img/image cadastro.jpg" alt="Register illustration" />
        </div>
      </div>
    </div>
  );
}
