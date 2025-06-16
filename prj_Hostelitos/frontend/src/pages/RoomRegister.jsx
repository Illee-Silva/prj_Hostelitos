import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoomRegister() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [mongoStatus, setMongoStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      setLoading(false);
      setIsAdmin(false);
      return;
    }
    fetch(`http://localhost:5000/api/users?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user && data.user.admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      })
      .catch(() => {
        setIsAdmin(false);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return null;
  if (!isAdmin) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);
      formData.append("max_guests", maxGuests);
      const res = await fetch("http://localhost:5000/api/rooms", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Quarto cadastrado com sucesso!");
        setType(""); setDescription(""); setPrice(""); setImage(""); setMaxGuests(1);
      } else {
        setError(data.error || "Erro ao cadastrar quarto");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTestMongo = () => {
    fetch("http://localhost:5000/api/test-mongo")
      .then(res => res.json())
      .then(data => {
        setMongoStatus(data.success ? "Conexão com MongoDB OK" : "Erro na conexão com MongoDB");
      })
      .catch(() => setMongoStatus("Erro na conexão com MongoDB"));
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div id="login-form">
          <p className="form-title">Cadastro de Quarto</p>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="input-group">
              <label className="login-label">Tipo:</label>
              <select value={type} onChange={e => setType(e.target.value)} required className="input-field">
                <option value="">Selecione o tipo</option>
                <option value="Suíte">Suíte</option>
                <option value="Duplo">Duplo</option>
                <option value="Simples">Simples</option>
              </select>
            </div>
            <div className="input-group">
              <label className="login-label">Descrição:</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} required className="input-field" />
            </div>
            <div className="input-group">
              <label className="login-label">Preço:</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} required className="input-field" />
            </div>
            <div className="input-group">
              <label className="login-label">Imagem:</label>
              <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} required className="input-field" />
            </div>
            <div className="input-group">
              <label className="login-label">Hóspedes limite:</label>
              <input
                type="range"
                min="1"
                max="10"
                value={maxGuests}
                onChange={e => setMaxGuests(Number(e.target.value))}
                className="input-field"
                style={{ width: '100%' }}
              />
              <div style={{ width: '100%', textAlign: 'right', marginTop: 2, color: '#DF5323', fontWeight: 600 }}>
                {maxGuests} {maxGuests === 1 ? 'hóspede' : 'hóspedes'}
              </div>
            </div>
            <button type="submit" className="login-button login-form-button">Cadastrar Quarto</button>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
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
        </div>
        <div className="illustration-wrapper">
          <img src="/img/image cadastro.jpg" alt="Register illustration" />
        </div>
      </div>
    </div>
  );
}
