import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

<<<<<<<< HEAD:prj_Hostelitos/frontend/src/Tabela.jsx
export default function Tabela() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data')
        if (response.data.success) {
          setData(response.data.data)
        }
      } catch (error) {
        console.error('Erro:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Dados do MongoDB</Typography>
      
      {loading ? (
        <Typography>Carregando...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {data[0] && Object.keys(data[0]).map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  {Object.values(item).map((value, i) => (
                    <TableCell key={i}>{JSON.stringify(value)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}
========
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
>>>>>>>> dev_back_end:prj_Hostelitos/frontend/src/App.jsx
