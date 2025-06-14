import "../style/reservestyle.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Reserve() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([300, 1500]);
  
  const rooms = [
    { 
      type: 'Suíte', 
      description: 'Quarto com banheiro e cama de casal', 
      price: 300,
      image: '/img/suite01.jpg' 
    },
    { 
      type: 'Simples', 
      description: 'Quarto com uma cama de solteiro', 
      price: 1000,
      image: '/img/simples01.jpg'
    },
    { 
      type: 'Duplo', 
      description: 'Quarto com duas camas incluídas', 
      price: 1100,
      image: '/img/duplo01.jpg'
    },
    { 
      type: 'Simples', 
      description: 'Quarto com uma cama de solteiro', 
      price: 1400,
      image: '/img/simples02.jpg'
    },
    { 
      type: 'Duplo', 
      description: 'Quarto com duas camas incluídas', 
      price: 880,
      image: '/img/duplo02.jpg'
    },
    { 
      type: 'Suíte', 
      description: 'Quarto com banheiro e cama de casal', 
      price: 1388,
      image: '/img/suite02.jpg'
    },
    { 
      type: 'Simples', 
      description: 'Quarto com uma cama de solteiro', 
      price: 888,
      image: '/img/simples03.jpg'
    },
    { 
      type: 'Suíte', 
      description: 'Quarto com banheiro e cama de casal', 
      price: 1398,
      image: '/img/suite03.jpg'
    },
    { 
      type: 'Simples', 
      description: 'Quarto com uma cama de solteiro', 
      price: 1280,
      image: '/img/simples04.jpg'
    },
    { 
      type: 'Duplo', 
      description: 'Quarto com duas camas incluídas', 
      price: 899,
      image: '/img/duplo03.jpg'
    },
  ];

  // Filtrar quartos com base nos filtros ativos
  const filteredRooms = rooms.filter(room => {
    const matchesType = activeFilter === "all" || room.type === activeFilter;
    const matchesPrice = room.price >= priceRange[0] && room.price <= priceRange[1];
    return matchesType && matchesPrice;
  });

  // Contar quartos por tipo
  const countRooms = (type) => {
    return type === "all" 
      ? rooms.length 
      : rooms.filter(room => room.type === type).length;
  };

  const handlePriceChange = (e, index) => {
    const newValue = parseInt(e.target.value);
    const newPriceRange = [...priceRange];
    newPriceRange[index] = newValue;
    
    // Garantir que o mínimo não seja maior que o máximo e vice-versa
    if (index === 0 && newValue > priceRange[1]) {
      newPriceRange[1] = newValue;
    } else if (index === 1 && newValue < priceRange[0]) {
      newPriceRange[0] = newValue;
    }
    
    setPriceRange(newPriceRange);
  };

  const resetFilters = () => {
    setActiveFilter("all");
    setPriceRange([300, 1500]);
  };

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
                  <p className="filter-description">Quarto com banheiro e cama de casal</p>
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
                  <p className="filter-description">Quarto com duas camas incluídas</p>
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
                  <p className="filter-description">Quarto com uma cama de solteiro</p>
                </div>
              </div>
            </div>

            <div className="price-filter">
              <p className="price-range-display">
                Faixa de Preço: ${priceRange[0]} - ${priceRange[1]}
              </p>
              <div className="price-slider-container">
                <input
                  type="range"
                  className="price-slider"
                  min="300"
                  max="1500"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                />
                <input
                  type="range"
                  className="price-slider"
                  min="300"
                  max="1500"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                />
              </div>
              <div className="price-labels">
                <span>$300</span>
                <span>$1500</span>
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
                      <img 
                        src={room.image} 
                        alt={`Quarto ${room.type}`} 
                        className="room-image"
                        onError={(e) => {
                          e.target.src = '/img/rooms/default.jpg';
                        }}
                      />
                    </div>
                    <div className="room-details">
                      <p className="room-type">{room.type}</p>
                      <p className="room-description">{room.description}</p>
                      <div className="room-footer">
                        <p className="room-price">${room.price.toLocaleString()}</p>
                        <button 
                          className="reserve-button"
                          onClick={() => navigate("/reservation", { state: { room } })}
                        >
                          Reservar
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