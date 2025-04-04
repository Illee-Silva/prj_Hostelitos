import '../style/webstyle.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Bem-vindo ao Hostelitos!</h1>
      <p>Encontre o melhor lugar para ficar durante sua viagem.</p>
      <a href="/login" className="home-button">Fazer Login</a>
    </div>
  );
}
