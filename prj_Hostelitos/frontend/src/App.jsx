import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Reserve from './pages/Reserve';
import ReservationDetails from './pages/ReservationDetails'; // Import adicionado
import RoomRegister from './pages/RoomRegister';
import ReservationsAdmin from './pages/ReservationsAdmin';
import Reservations from './pages/Reservations';
import './style/webstyle.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLoggedUser } from "./hooks/useLoggedUser";
import Box from '@mui/material/Box';

export default function App() {
    const user = useLoggedUser();
    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        window.location.reload();
    };
    return (
        <div className="page-container">
            <Router>
                {/* Navbar */}
                <nav className="navbar">
                    <div className="navbar-container">
                        {/* Menu à esquerda */}
                        <div className="navbar-left">
                            <div className="navbar-menu-container">
                                <div className="desktop-menu" style={{ display: 'flex', gap: '1rem' }}>
                                    <PopupState variant="popover" popupId="demo-popup-menu">
                                        {(popupState) => (
                                            <React.Fragment>
                                                <Button
                                                    className="menu-button"
                                                    variant="contained"
                                                    {...bindTrigger(popupState)}
                                                    startIcon={<MenuIcon />}
                                                >
                                                    Menu
                                                </Button>
                                                <Menu {...bindMenu(popupState)}>
                                                    <MenuItem onClick={popupState.close} className="menu-item">
                                                        <HomeIcon className="menu-icon" />
                                                        <Link to="/" className="navbar-link">Home</Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={popupState.close} className="menu-item">
                                                        <AccountCircleIcon className="menu-icon" />
                                                        <Link to="/login" className="navbar-link">Login</Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={popupState.close} className="menu-item">
                                                        <HowToRegIcon className="menu-icon" />
                                                        <Link to="/register" className="navbar-link">Cadastro</Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={popupState.close} className="menu-item">
                                                        <EventAvailableIcon className="menu-icon" />
                                                        <Link to="/reserve" className="navbar-link">Reservar</Link>
                                                    </MenuItem>
                                                </Menu>
                                            </React.Fragment>
                                        )}
                                    </PopupState>
                                    {/* Menu Admin separado */}
                                    {user && user.admin && (
                                        <PopupState variant="popover" popupId="admin-menu">
                                            {(popupState) => (
                                                <React.Fragment>
                                                    <Button
                                                        className="menu-button"
                                                        variant="contained"
                                                        color="secondary"
                                                        {...bindTrigger(popupState)}
                                                        startIcon={<MenuIcon />}
                                                    >
                                                        Admin
                                                    </Button>
                                                    <Menu {...bindMenu(popupState)}>
                                                        <MenuItem onClick={popupState.close} className="menu-item">
                                                            <EventAvailableIcon className="menu-icon" />
                                                            <Link to="/room-register" className="navbar-link">Cadastrar Quarto</Link>
                                                        </MenuItem>
                                                        <MenuItem onClick={popupState.close} className="menu-item">
                                                            <EventAvailableIcon className="menu-icon" />
                                                            <Link to="/reservations-admin" className="navbar-link">Reservas</Link>
                                                        </MenuItem>
                                                    </Menu>
                                                </React.Fragment>
                                            )}
                                        </PopupState>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Logo e nome centralizados */}
                        <div className="navbar-center">
                            <Link to="/" className="navbar-logo">
                                <img src="./img/logo.png" alt="logo" className="navbar-icon" />
                            </Link>
                            <span className="navbar-title">Hostelitos</span>
                        </div>
                        {/* Nome do usuário ou botão Login à direita */}
                        <div className="navbar-right">
                            {user ? (
                                <PopupState variant="popover" popupId="user-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                {...bindTrigger(popupState)}
                                                startIcon={<AccountCircleIcon />}
                                            >
                                                {user.name} {user.admin && <span role="img" aria-label="admin">(💻)</span>}
                                            </Button>
                                            <Menu {...bindMenu(popupState)}>
                                                <MenuItem onClick={() => { popupState.close(); handleLogout(); }}>
                                                    Sair
                                                </MenuItem>
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>
                            ) : (
                                <Button
                                    className="menu-button"
                                    variant="contained"
                                    onClick={() => window.location.href = '/login'}
                                    startIcon={<AccountCircleIcon />}
                                >
                                    Login
                                </Button>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="content-wrap">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/reserve" element={<Reserve />} />
                        <Route path="/reservation" element={<ReservationDetails />} />
                        <Route path="/room-register" element={<RoomRegister />} />
                        <Route path="/reservations-admin" element={<ReservationsAdmin />} />
                        <Route path="/reservations" element={<Reservations />} />
                    </Routes>
                </main>

                {/* Footer */}
                <footer className="site-footer">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h3>ENTRAR</h3>
                            <p>Cadastro-se</p>
                            <p>Esqueceu a senha?</p>
                        </div>

                        <div className="footer-section">
                            <h3>Contato</h3>
                            <p><EmailIcon /> contato@hostalitos.com</p>
                            <p><PhoneIcon /> (11) 1234-5678</p>
                            <p><LocationOnIcon /> Rua dos Hostais, 123 - São Paulo, SP</p>
                        </div>

                        <div className="footer-section">
                            <h3>Redes Sociais</h3>
                            <div className="social-icons">
                                <a href="#"><FacebookIcon /></a>
                                <a href="#"><TwitterIcon /></a>
                                <a href="#"><InstagramIcon /></a>
                            </div>
                        </div>

                        <div className="footer-section">
                            <h3>Links</h3>
                            <Link to="/">Home</Link>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Cadastro</Link>
                            <Link to="/reserve">Reservar</Link>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© 2025 Hostalitos. Todos os direitos reservados.</p>
                    </div>
                </footer>
            </Router>
        </div>
    );
}