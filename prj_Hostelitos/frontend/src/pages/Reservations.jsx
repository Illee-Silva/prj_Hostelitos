import { useEffect, useState } from "react";
import { useLoggedUser } from "../hooks/useLoggedUser";
import "../style/reservestyle.css";

export default function Reservations() {
  const user = useLoggedUser();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    fetch("http://localhost:5000/api/reservations")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Filtra apenas as reservas do usuário logado
          setReservations(data.reservations.filter(r => r.reserved_by?.email === user.email));
        } else setError(data.error || "Erro ao buscar reservas");
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [user]);

  if (!user) return <div className="hostelitos-page"><p>Carregando usuário...</p></div>;

  return (
    <div className="hostelitos-page">
      <div className="hostelitos-box">
        <h2 className="section-title">Minhas Reservas</h2>
        {loading ? <p>Carregando reservas...</p> : error ? <p style={{color:'red'}}>{error}</p> : (
          reservations.length === 0 ? <p>Você não possui reservas ativas.</p> :
          <div className="rooms-grid">
            {reservations.map(room => (
              <div key={room._id} className="room-card">
                <div className="room-image-container">
                  <img
                    src={room.image && room.image.startsWith('data:') ? room.image : `data:image/jpeg;base64,${room.image}`}
                    alt={`Quarto ${room.type}`}
                    className="room-image"
                  />
                </div>
                <div className="room-details">
                  <p className="room-type">{room.type}</p>
                  <p className="room-description">{room.description}</p>
                  <p className="room-price">Preço: ${Number(room.price).toLocaleString()}</p>
                  <p><b>Hóspedes:</b> {room.max_guests}</p>
                  <p><b>Status:</b> Reservado</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
