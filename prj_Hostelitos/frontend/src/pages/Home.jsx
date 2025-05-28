import { Link } from 'react-router-dom';
import '../style/webstyle.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Bem-vindo ao Hostelitos!</h1>
      <p>Gestão, Sem Complicação</p>
      
      <Link to="/login" className="home-button">Fazer Login</Link>
    </div>
  );
}
