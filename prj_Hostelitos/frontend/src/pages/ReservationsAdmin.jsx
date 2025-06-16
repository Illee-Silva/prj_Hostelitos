import { useEffect, useState } from "react";
import { useLoggedUser } from "../hooks/useLoggedUser";
import "../style/reservestyle.css";

function formatDateBR(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export default function ReservationsAdmin() {
  const user = useLoggedUser();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [canceling, setCanceling] = useState("");

  useEffect(() => {
    if (!user || !user.admin) return;
    fetch("http://localhost:5000/api/reservations")
      .then(res => res.json())
      .then(data => {
        if (data.success) setReservations(data.reservations);
        else setError(data.error || "Erro ao buscar reservas");
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [user]);

  async function handleCancel(roomId) {
    if (!window.confirm("Deseja cancelar esta reserva?")) return;
    setCanceling(roomId);
    try {
      const res = await fetch("http://localhost:5000/api/cancel-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room_id: roomId })
      });
      const data = await res.json();
      if (data.success) {
        setReservations(reservations => reservations.filter(r => r._id !== roomId));
      } else {
        alert(data.error || "Erro ao cancelar reserva");
      }
    } catch (err) {
      alert("Erro ao cancelar reserva");
    } finally {
      setCanceling("");
    }
  }

  if (!user) return <div className="hostelitos-page"><p>Carregando usuário...</p></div>;
  if (!user.admin) return <div className="hostelitos-page"><p>Acesso restrito a administradores.</p></div>;

  return (
    <div className="hostelitos-page">
      <div className="hostelitos-box">
        <h2 className="section-title">Reservas Atuais</h2>
        {loading ? <p>Carregando reservas...</p> : error ? <p style={{color:'red'}}>{error}</p> : (
          reservations.length === 0 ? <p>Nenhuma reserva encontrada.</p> :
          <table style={{ width: '100%', background: 'transparent', color: '#fff', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#252220' }}>
                <th style={{ padding: 8 }}>Quarto</th>
                <th style={{ padding: 8 }}>Descrição</th>
                <th style={{ padding: 8 }}>Reservado por</th>
                <th style={{ padding: 8 }}>Check-in</th>
                <th style={{ padding: 8 }}>Check-out</th>
                <th style={{ padding: 8 }}>Dias</th>
                <th style={{ padding: 8 }}>Total</th>
                <th style={{ padding: 8 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(room => {
                const nights = room.check_in && room.check_out ? Math.ceil((new Date(room.check_out) - new Date(room.check_in)) / (1000*60*60*24)) : 0;
                const total = nights * Number(room.price);
                return (
                  <tr key={room._id} style={{ borderBottom: '1px solid #3a3632' }}>
                    <td style={{ padding: 8 }}>{room.type}</td>
                    <td style={{ padding: 8 }}>{room.description}</td>
                    <td style={{ padding: 8 }}>{room.reserved_by?.name} <br/>({room.reserved_by?.email})</td>
                    <td style={{ padding: 8 }}>{formatDateBR(room.check_in)}</td>
                    <td style={{ padding: 8 }}>{formatDateBR(room.check_out)}</td>
                    <td style={{ padding: 8 }}>{nights}</td>
                    <td style={{ padding: 8 }}>${total.toLocaleString()}</td>
                    <td style={{ padding: 8 }}>
                      <button
                        className="reserve-button reserved"
                        style={{marginTop:0, minWidth: 90}}
                        onClick={() => handleCancel(room._id)}
                        disabled={canceling === room._id}
                      >
                        {canceling === room._id ? 'Cancelando...' : 'Cancelar'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
