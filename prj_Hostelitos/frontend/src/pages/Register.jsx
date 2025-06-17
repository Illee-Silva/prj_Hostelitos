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
    <div className="hostelitos-page" style={{ paddingTop: 110 }}>
      <div className="hostelitos-box" style={{ maxWidth: 400, margin: '0 auto', borderRadius: 18 }}>
        <div id="login-form" style={{ padding: 32 }}>
          <p className="form-title" style={{ color: '#DF5323', textAlign: 'center' }}>Cadastro</p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label htmlFor="name" className="login-label" style={{ textAlign: 'left', color: '#DF5323', fontWeight: 600 }}>Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="input-field"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ borderRadius: 8, padding: 8, border: '1px solid #ccc', background: '#222', color: '#fff' }}
              />
            </div>
            <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label htmlFor="email" className="login-label" style={{ textAlign: 'left', color: '#DF5323', fontWeight: 600 }}>E-mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input-field"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: 8, padding: 8, border: '1px solid #ccc', background: '#222', color: '#fff' }}
              />
            </div>
            <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label htmlFor="password" className="login-label" style={{ textAlign: 'left', color: '#DF5323', fontWeight: 600 }}>Senha:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="input-field"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderRadius: 8, padding: 8, border: '1px solid #ccc', background: '#222', color: '#fff' }}
              />
            </div>
            <button type="submit" className="reserve-button" style={{ width: '100%', marginTop: 10, borderRadius: 8 }}>Cadastrar</button>
            {error && <p style={{ color: "red", textAlign: 'center' }}>{error}</p>}
            {success && <p style={{ color: "green", textAlign: 'center' }}>{success}</p>}
          </form>
          {isAdmin && (
            <>
              <button
                onClick={handleTestMongo}
                style={{ marginTop: 10 }}
                className="reserve-button"
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
          <div className="login-links" style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              onClick={() => navigate("/login")}
              className="register-link"
              style={{ background: 'none', color: '#DF5323', border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              Já tem conta? Entrar
            </button>
          </div>
        </div>
        <div className="illustration-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'none' }}>
          <img src="/img/image cadastro.jpg" alt="Register illustration" style={{ maxWidth: 180, borderRadius: 12 }} />
        </div>
      </div>
    </div>
  );
}
