import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
return (
    <div>
      <h1>Login</h1>
      <button onClick={() => navigate('/')}>Voltar para Home</button>

      <form>
        <div>
          <label htmlFor="username">Usuário:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" gutterBottom>
//         Login
//       </Typography>
//       <form>
//         <div>
//           <label htmlFor="username">Usuário:</label>
//           <input type="text" id="username" name="username" required />
//         </div>
//         <div>
//           <label htmlFor="password">Senha:</label>
//           <input type="password" id="password" name="password" required />
//         </div>
//         <button type="submit">Entrar</button>    
}