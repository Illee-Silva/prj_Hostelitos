import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

export default function App() {
    return (
        <Router>
        <nav>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            </ul>
        </nav>
    
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
        </Router>
    )
    }