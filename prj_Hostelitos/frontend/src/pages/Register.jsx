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
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return;
    fetch(`${apiUrl}/api/users?email=${encodeURIComponent(userEmail)}`)
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
      const res = await fetch(`${apiUrl}/api/data`);
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
        <div className="login-form-half" style={{ flex: 1, padding: 32, display: "flex", flexDirection: "column", justifyContent: "center", color: "#fff", fontFamily: 'Nunito, sans-serif' }}>
          <p className="form-title" style={{ color: "#DF5323", textAlign: "center", fontSize: 28, marginBottom: 24 }}>
            Cadastro
          </p>
          <form onSubmit={handleSubmit} className="login-form-fields" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="input-group" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="name" className="login-label" style={{ textAlign: "left", color: "#DF5323", fontWeight: 600 }}>
                Nome:
              </label>
              <input type="text" id="name" name="name" className="input-field" required value={name} onChange={(e) => setName(e.target.value)} style={{ borderRadius: 8, padding: 12, border: "1px solid #ccc", background: "#222", color: "#fff", fontSize: 16 }} />
            </div>
            <div className="input-group" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="email" className="login-label" style={{ textAlign: "left", color: "#DF5323", fontWeight: 600 }}>
                E-mail:
              </label>
              <input type="email" id="email" name="email" className="input-field" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ borderRadius: 8, padding: 12, border: "1px solid #ccc", background: "#222", color: "#fff", fontSize: 16 }} />
            </div>
            <div className="input-group" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="password" className="login-label" style={{ textAlign: "left", color: "#DF5323", fontWeight: 600 }}>
                Senha:
              </label>
              <input type="password" id="password" name="password" className="input-field" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ borderRadius: 8, padding: 12, border: "1px solid #ccc", background: "#222", color: "#fff", fontSize: 16 }} />
            </div>
            <button type="submit" className="reserve-button" style={{ width: "100%", marginTop: 10, borderRadius: 8, backgroundColor: "#DF5323", color: "#fff", padding: 12, border: "none", cursor: "pointer", fontSize: 16 }}>
              Cadastrar
            </button>
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
          </form>
          {isAdmin && (
            <>
              <button onClick={handleTestMongo} className="reserve-button" style={{ marginTop: 10 }}>
                Testar conexão MongoDB
              </button>
              {mongoStatus && (
                <p style={{ marginTop: 5, color: mongoStatus.includes("OK") ? "green" : "red" }}>{mongoStatus}</p>
              )}
            </>
          )}
          <div className="login-links" style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
            <button onClick={() => navigate("/login")} className="register-link" style={{ background: "none", color: "#DF5323", border: "none", cursor: "pointer", fontWeight: 600, padding: 10, borderRadius: 8, textAlign: "center", fontSize: 16 }}>
              Já tem conta? Entrar
            </button>
          </div>
        </div>
        <div className="login-img-half" style={{ flex: 1, backgroundImage: "url('/img/image cadastro.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
      </div>
    </div>
  );
}
