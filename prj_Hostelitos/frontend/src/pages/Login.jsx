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
    <div className="login-page" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className="login-box" style={{ display: "flex", width: "100%", borderRadius: 18, overflow: "hidden" }}>
        <div className="login-form-half" style={{ flex: 1, padding: 32, display: "flex", flexDirection: "column", justifyContent: "center", color: "#fff" }}>
          <p className="form-title" style={{ color: "#DF5323", textAlign: "center", fontSize: 28, marginBottom: 24 }}>
            Login
          </p>

          <form onSubmit={handleSubmit} className="login-form-fields" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="input-group" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="email" className="login-label" style={{ textAlign: "left", color: "#DF5323", fontWeight: 600 }}>
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
                style={{ borderRadius: 8, padding: 12, border: "1px solid #ccc", background: "#222", color: "#fff", fontSize: 16 }}
              />
            </div>

            <div className="input-group" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="password" className="login-label" style={{ textAlign: "left", color: "#DF5323", fontWeight: 600 }}>
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
                style={{ borderRadius: 8, padding: 12, border: "1px solid #ccc", background: "#222", color: "#fff", fontSize: 16 }}
              />
            </div>

            <button
              type="submit"
              className="reserve-button"
              style={{
                width: "100%",
                marginTop: 10,
                borderRadius: 8,
                backgroundColor: "#DF5323",
                color: "#fff",
                padding: 12,
                border: "none",
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              Entrar
            </button>
            {error && (
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  marginTop: 10,
                  fontSize: 14,
                }}
              >
                {error}
              </p>
            )}
          </form>

          <div
            className="login-links"
            style={{
              marginTop: 18,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <button
              onClick={() => navigate("/register")}
              className="register-link"
              style={{
                background: "none",
                color: "#DF5323",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                padding: 10,
                borderRadius: 8,
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Cadastra-se
            </button>
            <button
              className="forgot-password"
              style={{
                background: "none",
                color: "#888",
                border: "none",
                cursor: "pointer",
                padding: 10,
                borderRadius: 8,
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Esqueceu a senha?
            </button>
          </div>
        </div>
        <div
          className="login-img-half"
          style={{
            flex: 1,
            backgroundImage: "url('/img/image login.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
}
