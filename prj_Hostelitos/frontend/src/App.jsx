import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import './style/webstyle.css';

export default function App() {
    return (
        <Router>
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                        <img src="./img/logo.png" alt="logo" className="navbar-icon"/>
                    </Link>
                    <Link to="/" className="navbar-logo">Hostelitos</Link>
                    <ul className="navbar-menu">
                        <li><Link to="/" className="navbar-link">Home</Link></li>
                        <li><Link to="/login" className="navbar-link">Login</Link></li>
                    </ul>
                </div>
            </nav>

            {/* Rotas */}
            <div className="page-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}
