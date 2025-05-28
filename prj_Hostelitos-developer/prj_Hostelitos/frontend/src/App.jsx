import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
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
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function App() {
    return (
        <div className="page-container">
            <Router>
                {/* Navbar */}
                <nav className="navbar">
                    <div className="navbar-container">
                        <div className="navbar-brand">
                            <Link to="/" className="navbar-logo">
                                <img src="./img/logo.png" alt="logo" className="navbar-icon" />
                            </Link>
                            <span className="navbar-title">Hostelitos</span>
                        </div>
                        
                        <div className="navbar-menu-container">
                            <div className="desktop-menu">
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <Button 
                                                className="menu-button"
                                                variant="contained"
                                                {...bindTrigger(popupState)}
                                                startIcon={<MenuIcon />}
                                                aria-label="Menu principal"
                                                aria-controls="main-menu"
                                                aria-haspopup="true"
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
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Conteúdo principal */}
                <main className="content-wrap">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </main>

                {/* Footer fixo */}
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
                                <FacebookIcon />
                                <TwitterIcon />
                                <InstagramIcon />
                            </div>
                        </div>

                        <div className="footer-section">
                            <h3>Links</h3>
                            <Link to="/">Home</Link>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Cadastro</Link>
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