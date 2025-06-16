import "../style/webstyle.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { register } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mongoStatus, setMongoStatus] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return;
    fetch(`http://localhost:5000/api/users?email=${encodeURIComponent(userEmail)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user && data.user.admin) setIsAdmin(true);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await register(email, password, name);
      localStorage.setItem("userEmail", email); // Salva email do usuário logado
      setSuccess("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message || "Erro ao cadastrar usuário");
    }
  };

  const handleTestMongo = async () => {
    setMongoStatus("Testando...");
    try {
      const res = await fetch("http://localhost:5000/api/data");
      const data = await res.json();
      if (data.success) {
        setMongoStatus("Conexão com MongoDB: OK");
      } else {
        setMongoStatus("Erro: " + (data.error || "Falha desconhecida"));
      }
    } catch (err) {
      setMongoStatus("Erro: " + err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div id="login-form">
          <p className="form-title">Cadastro</p>

          <form onSubmit={handleSubmit}>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              Cadastrar
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
          </form>
          {isAdmin && (
            <>
              <button
                onClick={handleTestMongo}
                style={{ marginTop: 10 }}
                className="login-button login-form-button"
              >
                Testar conexão MongoDB
              </button>
              {mongoStatus && (
                <p style={{ marginTop: 5, color: mongoStatus.includes("OK") ? "green" : "red" }}>
                  {mongoStatus}
                </p>
              )}
            </>
          )}
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
