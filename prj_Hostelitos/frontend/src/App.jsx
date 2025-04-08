import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import './style/webstyle.css';
import Register from './pages/Register';

export default function App() {
    return (
        <Router>
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-left">
                        <Link to="/" className="navbar-logo">
                            <img src="./img/logo.png" alt="logo" className="navbar-icon" />
                        </Link>
                        <ul className="navbar-menu">
                            <li><Link to="/" className="navbar-link">Home</Link></li>
                            <li><Link to="/login" className="navbar-link">Login</Link></li>
                            <li><Link to="/register" className='navbar-link'>Registrar</Link></li>
                        </ul>
                    </div>
                    <div className="navbar-right">
                        <span className="navbar-title">Hostelitos</span>
                    </div>
                </div>
            </nav>

            {/* Rotas */}
            <div className="page-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}