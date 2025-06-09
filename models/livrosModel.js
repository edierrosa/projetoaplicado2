const db = require('../config/db');

const Livros = {
  getAll: callback => {
  const sql = `
    SELECT L.*, C.nome_categoria 
    FROM LIVROS L
    JOIN CATEGORIA C ON L.FK_CATEGORIA_ID_categoria = C.ID_categoria
  `;
  db.query(sql, callback);
},
  
  getById: (id, callback) => {
    db.query('SELECT * FROM LIVROS WHERE ID_livro = ?', [id], callback);
  },

  create: (data, callback) => {
    const sql = `INSERT INTO LIVROS 
      (titulo, autor, edicao, ano_publicacao, localizacao, data_cadastro, disponibilidade, numero_exemplares, numero_disponiveis, FK_CATEGORIA_ID_categoria)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      data.titulo, data.autor, data.edicao, data.ano_publicacao,
      data.localizacao, data.data_cadastro, data.disponibilidade,
      data.numero_exemplares, data.numero_disponiveis, data.FK_CATEGORIA_ID_categoria
    ];

    db.query(sql, values, callback);
  },

  update: (id, data, callback) => {
    const fields = [];
    const values = [];

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        let value = data[key];

      if (key === 'ano_publicacao') {
        const year = new Date(value).getUTCFullYear();
        value = `${year}-01-01`;
      }

      if (key === 'data_cadastro') {
      const dateObj = new Date(value);
      const yyyy = dateObj.getFullYear();
      const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
      const dd = String(dateObj.getDate()).padStart(2, '0');
      const hh = String(dateObj.getHours()).padStart(2, '0');
      const mi = String(dateObj.getMinutes()).padStart(2, '0');
      const ss = String(dateObj.getSeconds()).padStart(2, '0');
      value = `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
      }

        fields.push(`${key} = ?`);
        values.push(value);
        
      }
    }

    if (fields.length === 0) {
      return callback(new Error('Nenhum campo fornecido para atualização.'));
    }

    const sql = `UPDATE LIVROS SET ${fields.join(', ')} WHERE ID_livro = ?`;
    values.push(id);

    db.query(sql, values, callback);
  },
  
  delete: (id, callback) => {
    db.query('DELETE FROM LIVROS WHERE ID_livro = ?', [id], callback);
  }
};

module.exports = Livros;
