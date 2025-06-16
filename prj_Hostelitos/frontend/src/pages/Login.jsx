import "../style/webstyle.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      // Força atualização do estado global do usuário
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (err) {
      setError(err.message || "Erro ao fazer login");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div id="login-form">
          <p className="form-title">Login</p>

          <form onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="login-button login-form-button">
              Entrar
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
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
