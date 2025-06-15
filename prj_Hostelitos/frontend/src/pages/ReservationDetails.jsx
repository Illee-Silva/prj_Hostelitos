import { useLocation, useNavigate } from "react-router-dom";
import "../style/reservationDetails.css";
import { useState, useEffect } from "react";

export default function ReservationDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const room = state?.room;
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '1',
    identifier: '',
    identifierType: 'email'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Date validation
  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      
      if (checkOutDate <= checkInDate) {
        alert('A data de check-out deve ser posterior à data de check-in');
        setFormData(prev => ({ ...prev, checkOut: '' }));
      }
    }
  }, [formData.checkIn, formData.checkOut]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // CPF auto-formatting
    if (name === 'identifier' && formData.identifierType === 'cpf') {
      const numericValue = value.replace(/\D/g, '');
      let formattedValue = numericValue;
      
      if (numericValue.length > 3) {
        formattedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
      }
      if (numericValue.length > 6) {
        formattedValue = `${formattedValue.slice(0, 7)}.${formattedValue.slice(7)}`;
      }
      if (numericValue.length > 9) {
        formattedValue = `${formattedValue.slice(0, 11)}-${formattedValue.slice(11)}`;
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue.slice(0, 14)
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validations
    if (!formData.checkIn || !formData.checkOut || !formData.identifier) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    if (formData.identifierType === 'cpf' && formData.identifier.replace(/\D/g, '').length !== 11) {
      alert('CPF inválido. Digite os 11 números do CPF');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate async request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Dados da reserva:', { room, ...formData });
      alert('Reserva realizada com sucesso!');
      navigate("/reservations", { state: { reservationSuccess: true } });
    } catch (error) {
      console.error('Erro na reserva:', error);
      alert('Ocorreu um erro ao processar sua reserva. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!room) {
    return (
      <div className="reservation-details">
        <h2>Quarto não encontrado</h2>
        <button 
          className="back-button"
          onClick={() => navigate("/reserve")}
        >
          ← Voltar para a lista de quartos
        </button>
      </div>
    );
  }

  // Calculate number of nights
  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const diffTime = Math.abs(new Date(formData.checkOut) - new Date(formData.checkIn));
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * room.price;

  return (
    <div className="reservation-details reservation-details-page">
      <header className="reservation-header">
        <h1 className="hostel-name">Hostelitos</h1>
        <h2 className="reservation-title">Reserva - {room.type}</h2>
      </header>
      
      <div className="room-detail-card">
        <div className="room-image-container">
          {imageError ? (
            <div className="image-placeholder">
              <span>Imagem não disponível</span>
            </div>
          ) : (
            <img 
              src={room.image} 
              alt={`Quarto ${room.type}`}
              onError={() => setImageError(true)}
              className="room-image"
            />
          )}
        </div>
        
        <div className="room-info">
          <div className="room-header">
            <h3 className="room-type">{room.type}</h3>
            <div className="price-container">
              <span className="price-per-night">${room.price.toLocaleString()}</span>
              <span className="price-label">/ noite</span>
            </div>
          </div>
          
          <p className="room-description">{room.description}</p>
          
          <div className="room-features">
            <h4 className="features-title">Comodidades:</h4>
            <ul className="features-list">
              {room.features?.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="feature-icon">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="reservation-section">
            <h3 className="section-title">Detalhes da Reserva</h3>
            
            <form className="reservation-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Check-in *</label>
                  <input 
                    type="date" 
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Check-out *</label>
                  <input 
                    type="date" 
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Hóspedes *</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  {[1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'pessoa' : 'pessoas'}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Tipo de ID *</label>
                <select
                  name="identifierType"
                  value={formData.identifierType}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="email">E-mail</option>
                  <option value="cpf">CPF</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  {formData.identifierType === 'email' ? 'E-mail *' : 'CPF *'}
                </label>
                <input
                  type={formData.identifierType === 'email' ? 'email' : 'text'}
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleInputChange}
                  placeholder={formData.identifierType === 'email' ? 'seu@email.com' : '000.000.000-00'}
                  required
                  pattern={formData.identifierType === 'cpf' ? '\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}' : null}
                  className="form-input"
                />
              </div>
              
              {nights > 0 && (
                <div className="total-price-summary">
                  <div className="summary-row">
                    <span>{nights} {nights === 1 ? 'noite' : 'noites'} × ${room.price.toLocaleString()}/noite</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              )}
              
              <button 
                type="submit" 
                className={`confirm-button ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Processando...
                  </>
                ) : 'Confirmar Reserva'}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <button 
        className="back-button" 
        onClick={() => navigate("/reserve")}
      >
        ← Voltar para a lista de quartos
      </button>
    </div>
  );
}