import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function LivrosForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [livro, setLivro] = useState({
    titulo: '',
    autor: '',
    data_cadastro: new Date().toISOString().split('T')[0],
    numero_exemplares: 1,
    numero_disponiveis: 1,
    FK_CATEGORIA_ID_categoria: 1,
  });

  useEffect(() => {
    if (id) {
      api.get(`/livros/${id}`).then(res => setLivro(res.data));
    }
  }, [id]);

  

useEffect(() => {
  api.get('/categorias').then(res => setCategorias(res.data));
}, []);

  const handleChange = e => {
    setLivro({ ...livro, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const req = id ? api.put(`/livros/${id}`, livro) : api.post('/livros', livro);
    req.then(() => navigate('/'));
  };

  return (
  <div className="livros-container">
    <form onSubmit={handleSubmit} className="livros-form">
      <h1>{id ? 'Editar Livro' : 'Novo Livro'}</h1>
      <label>Título:</label>
      <input
        name="titulo"
        value={livro.titulo}
        onChange={handleChange}
        placeholder="Título"
        required
      />
      <label>Autor:</label>
      <input
        name="autor"
        value={livro.autor}
        onChange={handleChange}
        placeholder="Autor"
        required
      />
      <label>Categoria:</label>
      <select
        name="FK_CATEGORIA_ID_categoria"
        value={livro.FK_CATEGORIA_ID_categoria}
        onChange={handleChange}
      >
  {categorias.map(cat => (
    <option key={cat.ID_categoria} value={cat.ID_categoria}>
      {cat.nome_categoria}
    </option>
  ))}
</select>
      <label>Número de exemplares:</label>
      <input
        name="numero_exemplares"
        type="number"
        value={livro.numero_exemplares}
        onChange={handleChange}
      />
      <button type="submit">Salvar</button>
    </form>
  </div>
);

}
