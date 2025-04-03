import { useEffect, useState } from 'react';
import axios from 'axios';

interface Comment {
    _id: string;     // Ou 'id' se você preferir renomear
    name: string;
    email?: string;
    text: string;
    movie_id?: string;
    date?: string;
  }

const CommentsPage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Configuração do Axios
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  });

  // Buscar comentários
  const fetchComments = async () => {
    try {
      const response = await api.get('/comments');
      setComments(response.data.comments || response.data); // Dependendo da estrutura da resposta
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar comentários');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="comments-container">
      <h1>Comentários</h1>
      <CommentList comments={comments} />
      <CommentForm onSuccess={fetchComments} />
    </div>
  );
};

// Componente de lista de comentários
const CommentList = ({ comments }: { comments: Comment[] }) => (
  <div className="comment-list">
    {comments.map(comment => (
      <div key={comment._id} className="comment-card">
        <h3>{comment.name}</h3>
      </div>
    ))}
  </div>
);

// Componente de formulário
const CommentForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    text: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/comments', formData);
      onSuccess();
      setFormData({ name: '', email: '', text: '' }); // Reset form
    } catch (err) {
      console.error('Erro ao enviar comentário:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        placeholder="Nome"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email (opcional)"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <textarea
        placeholder="Comentário"
        value={formData.text}
        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
        required
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default CommentsPage;