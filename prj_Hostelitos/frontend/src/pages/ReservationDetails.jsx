import { useLocation, useNavigate } from "react-router-dom";
import "../style/reservationDetails.css";
import { useState, useEffect } from "react";
import { useLoggedUser } from "../hooks/useLoggedUser";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("pt-BR", ptBR);

export default function ReservationDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const room = state?.room;
  const user = useLoggedUser();
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    cpf: '',
    address: '',
    payment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  // Função para formatar data para dd/mm/yyyy
  function formatDateBR(dateStr) {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  }

  useEffect(() => {
    if (checkInDate && checkOutDate && checkOutDate <= checkInDate) {
      alert('A data de check-out deve ser posterior à data de check-in');
      setCheckOutDate(null);
    }
  }, [checkInDate, checkOutDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // CPF auto-formatting
    if (name === 'cpf') {
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
      setFormData(prev => ({ ...prev, cpf: formattedValue.slice(0, 14) }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.checkIn || !formData.checkOut || !formData.cpf || !formData.address || !formData.payment) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    if (formData.cpf.replace(/\D/g, '').length !== 11) {
      alert('CPF inválido. Digite os 11 números do CPF');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_id: room._id,
          user_name: user.name,
          user_email: user.email,
          check_in: formData.checkIn,
          check_out: formData.checkOut,
          guests: formData.guests,
          cpf: formData.cpf,
          address: formData.address,
          payment: formData.payment
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('Reserva realizada com sucesso!');
        navigate("/reservations", { state: { reservationSuccess: true } });
      } else {
        alert(data.error || 'Erro ao reservar o quarto.');
      }
    } catch (error) {
      alert('Ocorreu um erro ao processar sua reserva. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!room || !user) {
    return (
      <div className="reservation-details">
        <h2>Quarto ou usuário não encontrado</h2>
        <button className="back-button" onClick={() => navigate("/reserve")}>← Voltar para a lista de quartos</button>
      </div>
    );
  }

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const diffTime = Math.abs(new Date(formData.checkOut) - new Date(formData.checkIn));
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };
  const nights = calculateNights();
  const totalPrice = nights * room.price;
  const getRoomImage = () => {
    if (!room.image) return '';
    if (room.image.startsWith('data:')) return room.image;
    return `data:image/jpeg;base64,${room.image}`;
  };

  // Lógica de mínimo para check-out
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  let minCheckout = formData.checkIn;
  if (formData.checkIn) {
    const checkInDate = new Date(formData.checkIn);
    checkInDate.setDate(checkInDate.getDate() + 1);
    minCheckout = checkInDate.toISOString().split('T')[0];
  } else {
    minCheckout = todayStr;
  }

  return (
    <div className="reservation-details reservation-details-page">
      <header className="reservation-header">
        <h1 className="hostel-name">Hostelitos</h1>
        <h2 className="reservation-title">Reserva - {room.type}</h2>
      </header>
      <div className="room-detail-card">
        <div className="room-image-container">
          {imageError ? (
            <div className="image-placeholder"><span>Imagem não disponível</span></div>
          ) : (
            <img src={getRoomImage()} alt={`Quarto ${room.type}`} onError={() => setImageError(true)} className="room-image" />
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
          <div className="room-capacity" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span role="img" aria-label="hóspedes" style={{ fontSize: '1.5rem' }}>👤</span>
            <span style={{ fontWeight: 500, color: '#444' }}>{room.max_guests || 1} {room.max_guests === 1 ? 'hóspede' : 'hóspedes'}</span>
          </div>
          <div className="reservation-section">
            <h3 className="section-title">Detalhes da Reserva</h3>
            <form className="reservation-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Check-in *</label>
                  <ReactDatePicker
                    selected={checkInDate}
                    onChange={date => {
                      setCheckInDate(date);
                      setFormData(prev => ({ ...prev, checkIn: date ? date.toISOString().split('T')[0] : '' }));
                    }}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    locale="pt-BR"
                    placeholderText="Selecione a data"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Check-out *</label>
                  <ReactDatePicker
                    selected={checkOutDate}
                    onChange={date => {
                      setCheckOutDate(date);
                      setFormData(prev => ({ ...prev, checkOut: date ? date.toISOString().split('T')[0] : '' }));
                    }}
                    minDate={checkInDate ? new Date(checkInDate.getTime() + 24*60*60*1000) : new Date()}
                    dateFormat="dd/MM/yyyy"
                    locale="pt-BR"
                    placeholderText="Selecione a data"
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Hóspedes *</label>
                <input
                  type="range"
                  name="guests"
                  min={1}
                  max={room.max_guests || 4}
                  value={formData.guests}
                  onChange={e => setFormData(prev => ({ ...prev, guests: Number(e.target.value) }))}
                  required
                  className="form-input"
                  style={{ width: '100%' }}
                />
                <div style={{ width: '100%', textAlign: 'right', marginTop: 2, color: '#DF5323', fontWeight: 600 }}>
                  {formData.guests} {formData.guests === 1 ? 'hóspede' : 'hóspedes'} (Limite: {room.max_guests || 4})
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Nome *</label>
                <input type="text" value={user.name} disabled className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">E-mail *</label>
                <input type="email" value={user.email} disabled className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">CPF *</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  placeholder="000.000.000-00"
                  required
                  pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Endereço *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Rua, número, bairro, cidade"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Forma de Pagamento *</label>
                <select
                  name="payment"
                  value={formData.payment}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">Selecione</option>
                  <option value="cartao">Cartão de Crédito</option>
                  <option value="pix">PIX</option>
                  <option value="boleto">Boleto</option>
                  <option value="dinheiro">Dinheiro</option>
                </select>
              </div>
              {nights > 0 && (
                <div className="total-price-summary">
                  <div className="summary-row">
                    <span>
                      {nights} {nights === 1 ? 'noite' : 'noites'} × ${room.price.toLocaleString()}/noite
                      <br/>
                      Check-in: {formatDateBR(formData.checkIn)}<br/>
                      Check-out: {formatDateBR(formData.checkOut)}
                    </span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              )}
              <button type="submit" className={`confirm-button ${isSubmitting ? 'submitting' : ''}`} disabled={isSubmitting}>
                {isSubmitting ? (<><span className="spinner"></span>Processando...</>) : 'Confirmar Reserva'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <button className="back-button" onClick={() => navigate("/reserve")}>← Voltar para a lista de quartos</button>
    </div>
  );
}