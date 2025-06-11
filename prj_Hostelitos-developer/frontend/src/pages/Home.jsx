import { Link } from "react-router-dom";
import "../style/webstyle.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">
        Hostelitos - Transformando sua Hospedagem em Experiência
      </h1>

      <p className="home-subtitle">
        Gerencie sua pousada ou hostel com a simplicidade que seus hóspedes
        merecem. Nossa plataforma intuitiva coloca você no controle total - de
        reservas a finanças - para que você possa focar no que realmente
        importa: criar memórias inesquecíveis.
      </p>

      <div className="home-highlight">
        <h2>Por que Hostelitos é a escolha certa para você?</h2>
        <ul className="home-benefits">
          <li>✅ Reservas em tempo real com confirmação automática</li>
          <li>
            ✅ Controle financeiro simplificado com relatórios inteligentes
          </li>
          <li>✅ Canal direto de comunicação com hóspedes</li>
          <li>
            ✅ Plataforma 100% segura na nuvem, acessível de qualquer lugar
          </li>
          <li>✅ Painel personalizável para seu tipo de negócio</li>
        </ul>
      </div>

      <p className="home-callout">
        <strong>
          Mais do que um sistema - é a solução completa para hospedagens que
          buscam excelência.
        </strong>
      </p>

      <div className="home-testimonial">
        <p>
          "O Hostelitos revolucionou nossa gestão. Em um mês, reduzimos 40% do
          tempo com burocracia!"
        </p>
        <p>- Carla Mendes, Pousada do Sol</p>
      </div>

      <div className="home-buttons">
        <Link to="/login" className="home-button primary">
          Experimente gratuitamente
        </Link>
      </div>

      <p className="home-footer-text">
        Hospedagem descomplicada, resultados extraordinários. <span>✨</span>
      </p>
    </div>
  );
}
