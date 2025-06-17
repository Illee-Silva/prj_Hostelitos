import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";

export default function RoomForm() {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/api/rooms`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Quarto cadastrado com sucesso!");
        setType(""); setDescription(""); setPrice(""); setImage(""); setMaxGuests(1);
        setTimeout(() => navigate("/room-register"), 1200);
      } else {
        setError(data.error || "Erro ao cadastrar quarto");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="hostelitos-page" style={{ paddingTop: 110 }}>
      <div className="hostelitos-box" style={{ maxWidth: 600, margin: '0 auto', borderRadius: 18 }}>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Cadastro de Quarto</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: 22, padding: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label className="login-label" style={{ textAlign: 'left', marginBottom: 4, fontWeight: 600, color: '#DF5323' }}>Tipo:</label>
            <select value={type} onChange={e => setType(e.target.value)} required className="input-field" style={{ borderRadius: 8, padding: 8, border: '1px solid #ccc' }}>
              <option value="">Selecione o tipo</option>
              <option value="Suíte">Suíte</option>
              <option value="Duplo">Duplo</option>
              <option value="Simples">Simples</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label className="login-label" style={{ textAlign: 'left', marginBottom: 4, fontWeight: 600, color: '#DF5323' }}>Descrição:</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required className="input-field" style={{ minHeight: 60, borderRadius: 8, padding: 8, border: '1px solid #ccc' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label className="login-label" style={{ textAlign: 'left', marginBottom: 4, fontWeight: 600, color: '#DF5323' }}>Preço:</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} required className="input-field" style={{ borderRadius: 8, padding: 8, border: '1px solid #ccc' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <ImageUpload
              label="Imagem do Quarto:"
              required
              onChange={file => setImage(file)}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label className="login-label" style={{ textAlign: 'left', marginBottom: 4, fontWeight: 600, color: '#DF5323' }}>Hóspedes limite:</label>
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
          <button type="submit" className="reserve-button" style={{ width: '100%', marginTop: 10, borderRadius: 8 }}>Cadastrar Quarto</button>
          {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <button
            type="button"
            onClick={() => navigate("/room-register")}
            className="reserve-button"
            style={{ width: '100%', background: '#888', marginTop: 0, borderRadius: 8 }}
          >
            Voltar para lista
          </button>
        </form>
      </div>
    </div>
  );
}
