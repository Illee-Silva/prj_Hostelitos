import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoomRegister() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");
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

  useEffect(() => {
    if (!isAdmin) return;
    fetch("http://localhost:5000/api/rooms")
      .then(res => res.json())
      .then(data => {
        if (data.success) setRooms(data.rooms);
        else setError(data.error || "Erro ao buscar quartos");
      })
      .catch(err => setError(err.message));
  }, [isAdmin]);

  async function handleDelete(roomId) {
    if (!window.confirm("Deseja apagar este quarto?")) return;
    setDeleting(roomId);
    try {
      const res = await fetch(`http://localhost:5000/api/rooms/${roomId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      setDeleting("");
      if (data.success) {
        setRooms(rooms => rooms.filter(r => r._id !== roomId));
      } else {
        alert(data.error || "Erro ao apagar quarto");
      }
    } catch (err) {
      setDeleting("");
      alert("Erro ao apagar quarto");
    }
  }

  if (loading) return null;
  if (!isAdmin) {
    navigate("/login");
    return null;
  }

  return (
    <div className="hostelitos-page">
      <div className="hostelitos-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 className="section-title">Quartos Cadastrados</h2>
          <button
            className="reserve-button"
            style={{ fontSize: 24, padding: '0.3em 0.7em', fontWeight: 700 }}
            onClick={() => navigate("/room-register/add")}
            title="Adicionar Quarto"
          >
            +
          </button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <table style={{ width: '100%', background: 'transparent', color: '#fff', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#252220' }}>
              <th style={{ padding: 8 }}>Tipo</th>
              <th style={{ padding: 8 }}>Descrição</th>
              <th style={{ padding: 8 }}>Preço</th>
              <th style={{ padding: 8 }}>Hóspedes</th>
              <th style={{ padding: 8 }}>Reservado?</th>
              <th style={{ padding: 8 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room._id} style={{ borderBottom: '1px solid #3a3632' }}>
                <td style={{ padding: 8 }}>{room.type}</td>
                <td style={{ padding: 8 }}>{room.description}</td>
                <td style={{ padding: 8 }}>${Number(room.price).toLocaleString()}</td>
                <td style={{ padding: 8 }}>{room.max_guests}</td>
                <td style={{ padding: 8 }}>{room.reserved ? 'Sim' : 'Não'}</td>
                <td style={{ padding: 8 }}>
                  <button
                    className="reserve-button"
                    style={{ minWidth: 90, background: '#c0392b' }}
                    onClick={() => handleDelete(room._id)}
                    disabled={deleting === room._id}
                  >
                    {deleting === room._id ? 'Apagando...' : 'Apagar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
