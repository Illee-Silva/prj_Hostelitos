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
      description: 'Suíte Luxo com 35m², cama king-size, banheiro privativo com hidromassagem, TV 50" Smart, ar-condicionado, minibar, varanda com vista para o mar, Wi-Fi rápido e serviço de quarto 24h. Inclui café da manhã buffet e acesso à piscina.', 
      price: 300,
      image: '/img/suite01.jpg' 
    },
    { 
      type: 'Simples', 
      description: 'Quarto aconchegante de 18m² com cama de solteiro premium, banheiro compartilhado (limpo 3x ao dia), TV 32", ventilador, escrivaninha, armário espaçoso e Wi-Fi. Vista para o jardim interno. Ideal para viajantes individuais que buscam conforto e economia.', 
      price: 1000,
      image: '/img/simples01.jpg'
    },
    { 
      type: 'Duplo', 
      description: 'Amplo quarto de 28m² com duas camas de solteiro premium, banheiro privativo, TV 40", ar-condicionado, sofá-cama adicional, mesa de trabalho e Wi-Fi rápido. Vista parcial para a cidade. Perfeito para amigos ou colegas de viagem.', 
      price: 1100,
      image: '/img/duplo01.jpg'
    },
    { 
      type: 'Simples', 
      description: 'Quarto compacto de 15m² com cama single ergonômica, banheiro compartilhado (limpeza frequente), TV 28", mesa de cabeceira, armário e Wi-Fi. Localizado em andar alto com vista para os telhados da cidade. Ótimo custo-benefício.', 
      price: 1400,
      image: '/img/simples02.jpg'
    },
    { 
      type: 'Duplo', 
      description: 'Quarto familiar de 32m² com duas camas de solteiro convertíveis em cama de casal, banheiro privativo com amenities, TV 43" Smart, ar-condicionado, frigobar e espaço de trabalho. Inclui 1 cama extra sob consulta. Vista para o pátio interno.', 
      price: 880,
      image: '/img/duplo02.jpg'
    },
    { 
      type: 'Suíte', 
      description: 'Suíte Executiva de 40m² com cama queen-size, banheiro de mármore com ducha térmica, sala de estar integrada, TV 55" 4K, cofre digital, cafeteira Nespresso, serviço diário de cortesia e vista panorâmica. Acesso exclusivo ao lounge.', 
      price: 1388,
      image: '/img/suite02.jpg'
    },
    { 
      type: 'Simples', 
      description: 'Quarto standard de 16m² com cama confortável, banheiro compartilhado (higienizado a cada uso), TV a cabo, mesa de trabalho, Wi-Fi de alta velocidade e blackout nas cortinas. Localização privilegiada próximo aos elevadores.', 
      price: 888,
      image: '/img/simples03.jpg'
    },
    { 
      type: 'Suíte', 
      description: 'Suíte Premium de 45m² com cama king-size ortopédica, banheiro spa com sauna privativa, varanda mobiliada, TV 60" OLED, sistema de som ambiente, cafeteira e frutas de cortesia. Vista deslumbrante para o skyline noturno.', 
      price: 1398,
      image: '/img/suite03.jpg'
    },
    { 
      type: 'Simples', 
      description: 'Quarto econômico de 14m² com cama single, banheiro compartilhado (2 por andar), TV 24", mesa lateral, prateleiras e Wi-Fi. Janela com ventilação natural. Opção mais acessível para estadias curtas.', 
      price: 1280,
      image: '/img/simples04.jpg'
    },
    { 
      type: 'Duplo', 
      description: 'Quarto twin de 30m² com duas camas de solteiro premium, banheiro privativo amplo, TV Smart 42", mesa de reunião para 4 pessoas, armários individuais e iluminação regulável. Excelente para viagens a trabalho.', 
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