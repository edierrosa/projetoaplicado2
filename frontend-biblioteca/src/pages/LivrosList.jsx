import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';


export default function LivrosList() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    api.get('/livros')
      .then(res => setLivros(res.data))
      .catch(err => console.error(err));
  }, []);

  const excluirLivro = async (id) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      await api.delete(`/livros/${id}`);
      setLivros(livros.filter(l => l.ID_livro !== id));
    }
  };

  return (
    <div className="livros-container">
      <h1>Lista de Livros</h1>
      <Link to="/livros/novo" className="novo-link">+ Novo Livro</Link>
      <ul>
        {livros.map(livro => (
          <li key={livro.ID_livro}>
            <div className="livro-info">
              <div className='livro-titulo'>Título: {livro.titulo}</div>
              <div>Autor: {livro.autor}</div>
              <div>Categoria: {livro.nome_categoria}</div>
              <div>Exemplares: {livro.numero_exemplares}</div>
            </div>
            <div className="livro-acoes">
            <Link to={`/livros/editar/${livro.ID_livro}`}>Editar</Link>
            <button onClick={() => excluirLivro(livro.ID_livro)}>Excluir</button>
          </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
