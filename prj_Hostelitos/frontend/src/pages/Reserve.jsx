import "../style/reservestyle.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoggedUser } from "../hooks/useLoggedUser";

function normalize(str) {
  return str ? str.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase() : '';
}

export default function Reserve() {
  const navigate = useNavigate();
  const user = useLoggedUser();
  const [activeFilter, setActiveFilter] = useState("all");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Preço mínimo customizável
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [inputMin, setInputMin] = useState(0);
  const [sliderPrice, setSliderPrice] = useState(0);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/rooms`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRooms(data.rooms);
          if (data.rooms.length > 0) {
            const prices = data.rooms.map(r => Number(r.price));
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            setMinPrice(min);
            setMaxPrice(max);
            setInputMin(min);
            setSliderPrice(max); // Começa mostrando todos
          }
        } else setError(data.error || "Erro ao buscar quartos");
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filtragem dos quartos
  const filteredRooms = rooms.filter(room => {
    if (activeFilter !== "all" && normalize(room.type) !== normalize(activeFilter)) return false;
    if (Number(room.price) < inputMin || Number(room.price) > sliderPrice) return false;
    return true;
  });

  // Contar quartos por tipo
  function countRooms(type) {
    if (type === "all") return rooms.length;
    return rooms.filter(room => normalize(room.type) === normalize(type)).length;
  }

  function handleSliderChange(e) {
    setSliderPrice(Number(e.target.value));
  }

  function handleMinChange(e) {
    setInputMin(e.target.value);
  }

  function handleMinBlur() {
    let value = Number(inputMin);
    if (isNaN(value) || value < minPrice) value = minPrice;
    if (value > sliderPrice) value = sliderPrice;
    setInputMin(value);
  }

  function resetFilters() {
    setActiveFilter("all");
    setInputMin(minPrice);
    setSliderPrice(maxPrice);
  }

  // Reserva de quarto
  async function handleReserve(roomId) {
    if (!user) return;
    try {
      const res = await fetch(`${apiUrl}/api/reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_id: roomId,
          user_name: user.name,
          user_email: user.email
        })
      });
      const data = await res.json();
      if (data.success) {
        // Atualiza o estado local para refletir a reserva
        setRooms(rooms => rooms.map(r => r._id === roomId ? { ...r, reserved: true, reserved_by: { name: user.name, email: user.email } } : r));
      } else {
        alert(data.error || "Erro ao reservar quarto");
      }
    } catch (err) {
      alert("Erro ao reservar quarto");
    }
  }

  return (
    <div className="hostelitos-page">
      <div className="hostelitos-box">
        <div id="hostelitos-content">
          <div className="filters-section">
            <div className="filters-header">
              <p className="section-title">Filtros de Quartos</p>
              <button 
                className="reset-filters"
                onClick={resetFilters}
              >
                Limpar Filtros
              </button>
            </div>
            <div className="filter-options">
              <div 
                className={`filter-option ${activeFilter === "all" ? "active" : ""}`}
                onClick={() => setActiveFilter("all")}
              >
                <div className="filter-option-content">
                  <p className="filter-name">
                    Todos <span className="filter-count">({countRooms("all")})</span>
                  </p>
                  <p className="filter-description">Todos os tipos de quartos</p>
                </div>
              </div>
              <div 
                className={`filter-option ${activeFilter === "Suíte" ? "active" : ""}`}
                onClick={() => setActiveFilter("Suíte")}
              >
                <div className="filter-option-content">
                  <p className="filter-name">
                    Suíte <span className="filter-count">({countRooms("Suíte")})</span>
                  </p>
                  <p className="filter-description">Conforto premium com banheiro privativo</p>
                </div>
              </div>
              <div 
                className={`filter-option ${activeFilter === "Duplo" ? "active" : ""}`}
                onClick={() => setActiveFilter("Duplo")}
              >
                <div className="filter-option-content">
                  <p className="filter-name">
                    Duplo <span className="filter-count">({countRooms("Duplo")})</span>
                  </p>
                  <p className="filter-description">Espaço ideal para duas pessoas</p>
                </div>
              </div>
              <div 
                className={`filter-option ${activeFilter === "Simples" ? "active" : ""}`}
                onClick={() => setActiveFilter("Simples")}
              >
                <div className="filter-option-content">
                  <p className="filter-name">
                    Simples <span className="filter-count">({countRooms("Simples")})</span>
                  </p>
                  <p className="filter-description">Econômico para viajantes individuais</p>
                </div>
              </div>
            </div>
            <div className="price-filter">
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                <label htmlFor="min-price" style={{color: '#f0f0f0'}}>Preço mínimo:</label>
                <input
                  id="min-price"
                  type="number"
                  min={minPrice}
                  max={sliderPrice}
                  value={inputMin}
                  onChange={handleMinChange}
                  onBlur={handleMinBlur}
                  style={{width: '90px', padding: '0.3rem', borderRadius: '4px', border: '1px solid #ccc'}}
                />
              </div>
              <p className="price-range-display">
                Preço máximo: ${sliderPrice}
              </p>
              <div className="price-slider-container">
                <input
                  type="range"
                  className="price-slider"
                  min={minPrice}
                  max={maxPrice}
                  value={sliderPrice}
                  onChange={handleSliderChange}
                  step="1"
                />
              </div>
              <div className="price-labels">
                <span>${minPrice}</span>
                <span>${maxPrice}</span>
              </div>
            </div>
          </div>

          <div className="rooms-section">
            <div className="results-header">
              <p className="section-title">Quartos Disponíveis</p>
              <p className="results-count">
                {filteredRooms.length} {filteredRooms.length === 1 ? 'quarto encontrado' : 'quartos encontrados'}
              </p>
            </div>
            
            {filteredRooms.length === 0 ? (
              <div className="no-results">
                <p>Nenhum quarto encontrado com os filtros selecionados.</p>
                <button 
                  className="reset-filters secondary"
                  onClick={resetFilters}
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <div className="rooms-grid">
                {filteredRooms.map((room, index) => (
                  <div key={index} className="room-card">
                    <div className="room-image-container">
                      {room.image && room.image.startsWith('data:') ? (
                        <img 
                          src={room.image}
                          alt={`Quarto ${room.type}`}
                          className="room-image"
                          onError={(e) => {
                            e.target.src = '/img/rooms/default.jpg';
                          }}
                        />
                      ) : room.image ? (
                        <img 
                          src={`data:image/jpeg;base64,${room.image}`}
                          alt={`Quarto ${room.type}`}
                          className="room-image"
                          onError={(e) => {
                            e.target.src = '/img/rooms/default.jpg';
                          }}
                        />
                      ) : (
                        <img 
                          src='/img/rooms/default.jpg'
                          alt={`Quarto ${room.type}`}
                          className="room-image"
                        />
                      )}
                    </div>
                    <div className="room-details">
                      <div className="room-capacity" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span role="img" aria-label="hóspedes" style={{ fontSize: '1.2rem' }}>👤</span>
                        <span style={{ fontWeight: 500, color: '#444' }}>{room.max_guests || 1} {room.max_guests === 1 ? 'hóspede' : 'hóspedes'}</span>
                      </div>
                      <p className="room-type">{room.type}</p>
                      <p className="room-description">{room.description}</p>
                      <div className="room-footer">
                        <p className="room-price">${Number(room.price).toLocaleString()}</p>
                        <button 
                          className={`reserve-button${room.reserved ? ' reserved' : ''}`}
                          onClick={() => navigate("/reservation", { state: { room } })}
                          disabled={room.reserved || !user}
                          style={room.reserved ? { backgroundColor: '#888', cursor: 'not-allowed' } : {}}
                        >
                          {room.reserved ? 'Reservado' : 'Reservar'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}