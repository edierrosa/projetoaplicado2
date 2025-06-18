const db = require('../config/db');

const Categorias = {
  getAll: callback => {
    const sql = 'SELECT ID_categoria, nome_categoria FROM CATEGORIA';
    db.query(sql, callback);
  }
};

module.exports = Categorias;
