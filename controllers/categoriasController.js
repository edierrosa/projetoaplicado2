const Categorias = require('../models/categoriasModel');

exports.getAll = (req, res) => {
  Categorias.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};
