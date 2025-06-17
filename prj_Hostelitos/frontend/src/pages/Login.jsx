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
    <div className="hostelitos-page" style={{ paddingTop: 110 }}>
      <div
        className="hostelitos-box"
        style={{
          maxWidth: 400,
          margin: "0 auto",
          borderRadius: 18,
          padding: 32,
          color: "#fff",
        }}
      >
        <div id="login-form" style={{ padding: 32 }}>
          <p
            className="form-title"
            style={{ color: "#DF5323", textAlign: "center" }}
          >
            Login
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              className="input-group"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <label
                htmlFor="email"
                className="login-label"
                style={{
                  textAlign: "left",
                  color: "#DF5323",
                  fontWeight: 600,
                }}
              >
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
                style={{
                  borderRadius: 8,
                  padding: 8,
                  border: "1px solid #ccc",
                  background: "#222",
                  color: "#fff",
                }}
              />
            </div>

            <div
              className="input-group"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <label
                htmlFor="password"
                className="login-label"
                style={{
                  textAlign: "left",
                  color: "#DF5323",
                  fontWeight: 600,
                }}
              >
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
                style={{
                  borderRadius: 8,
                  padding: 8,
                  border: "1px solid #ccc",
                  background: "#222",
                  color: "#fff",
                }}
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
                padding: 10,
                border: "none",
                cursor: "pointer",
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
              }}
            >
              Esqueceu a senha?
            </button>
          </div>
        </div>
        <div
          className="illustration-wrapper"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "none",
          }}
        >
          <img
            src="/img/image login.jpg"
            alt="Login illustration"
            style={{
              maxWidth: 180,
              borderRadius: 12,
              marginTop: 20,
            }}
          />
        </div>
      </div>
    </div>
  );
}
