import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function UsuariosList() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = () => {
    api.get('/usuarios')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error('Erro ao carregar usuários:', err));
  };

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      api.delete(`/usuarios/${id}`)
        .then(() => carregarUsuarios())
        .catch(err => console.error('Erro ao excluir usuário:', err));
    }
  };

  return (
    <div className="livros-container">
      <h1>Usuários Cadastrados</h1>
      <Link to="/usuarios/novo" className="novo-link">+ Novo Usuário</Link>
      <ul>
        {usuarios.map((u, index) => (
          <li key={index}>
            <div className="livro-info">
              <div className="livro-titulo">{u.nome_completo}</div>
              <div>{u.email || 'sem e-mail'}</div>
            </div>
            <div className="livro-acoes">
              {/* <Link to={`/usuarios/editar/${u.ID_usuario}`}>Editar</Link> */}
              <button onClick={() => handleDelete(u.ID_usuario)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
