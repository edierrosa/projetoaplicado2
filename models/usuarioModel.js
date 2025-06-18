const db = require('../config/db');

const Usuarios = {
  getAll: callback => {
    const sql = `
      SELECT U.*, E.*, C.*, V.*
      FROM USUARIO U
      LEFT JOIN USUARIO_ENDERECO UE ON UE.FK_USUARIO_ID_usuario = U.ID_usuario
      LEFT JOIN ENDERECO E ON E.ID_endereco = UE.FK_ENDERECO_ID_endereco
      LEFT JOIN CONTATO_USUARIO CU ON CU.FK_USUARIO_ID_usuario = U.ID_usuario
      LEFT JOIN CONTATO C ON C.ID_contato = CU.FK_CONTATO_ID_contato
      LEFT JOIN USUARIO_VINCULADO UV ON UV.FK_USUARIO_ID_usuario = U.ID_usuario
      LEFT JOIN VINCULO V ON V.ID_vinculo = UV.FK_VINCULO_ID_vinculo
    `;
    db.query(sql, callback);
  },

  create: (data, callback) => {
    db.beginTransaction(err => {
      if (err) return callback(err);

      const { usuario, endereco, contato, vinculo } = data;

      // 1. Insere usuário
      const sqlUsuario = `
        INSERT INTO USUARIO (nome_completo, data_nasc, data_cadastro)
        VALUES (?, ?, ?)
      `;
      db.query(sqlUsuario, [usuario.nome_completo, usuario.data_nasc, usuario.data_cadastro], (err, resultUsuario) => {
        if (err) return db.rollback(() => callback(err));

        const userId = resultUsuario.insertId;

        // 2. Insere endereço
        const sqlEndereco = `
          INSERT INTO ENDERECO (logradouro, numero, complemento, bairro, cep, cidade, estado)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(sqlEndereco, Object.values(endereco), (err, resultEndereco) => {
          if (err) return db.rollback(() => callback(err));

          const enderecoId = resultEndereco.insertId;

          const sqlUserEndereco = `
            INSERT INTO USUARIO_ENDERECO (FK_USUARIO_ID_usuario, FK_ENDERECO_ID_endereco)
            VALUES (?, ?)
          `;
          db.query(sqlUserEndereco, [userId, enderecoId], (err) => {
            if (err) return db.rollback(() => callback(err));

            // 3. Insere contato
            const sqlContato = `
              INSERT INTO CONTATO (telefone, email)
              VALUES (?, ?)
            `;
            db.query(sqlContato, [contato.telefone, contato.email], (err, resultContato) => {
              if (err) return db.rollback(() => callback(err));

              const contatoId = resultContato.insertId;

              const sqlUserContato = `
                INSERT INTO CONTATO_USUARIO (FK_USUARIO_ID_usuario, FK_CONTATO_ID_contato)
                VALUES (?, ?)
              `;
              db.query(sqlUserContato, [userId, contatoId], (err) => {
                if (err) return db.rollback(() => callback(err));

                // 4. Insere vínculo
                const sqlVinculo = `
                  INSERT INTO VINCULO (tipo_vinculo, instituicao, matricula)
                  VALUES (?, ?, ?)
                `;
                db.query(sqlVinculo, Object.values(vinculo), (err, resultVinculo) => {
                  if (err) return db.rollback(() => callback(err));

                  const vinculoId = resultVinculo.insertId;

                  const sqlUserVinculo = `
                    INSERT INTO USUARIO_VINCULADO (FK_VINCULO_ID_vinculo, FK_USUARIO_ID_usuario)
                    VALUES (?, ?)
                  `;
                  db.query(sqlUserVinculo, [vinculoId, userId], (err) => {
                    if (err) return db.rollback(() => callback(err));

                    db.commit(err => {
                      if (err) return db.rollback(() => callback(err));
                      callback(null, { message: 'Usuário cadastrado com sucesso', ID_usuario: userId });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  },

  update: (id, data, callback) => {
    // Exemplo: atualiza só a tabela USUARIO (você pode expandir para os outros relacionamentos)
    const sql = `UPDATE USUARIO SET nome_completo = ?, data_nasc = ?, data_cadastro = ? WHERE ID_usuario = ?`;
    const values = [data.usuario.nome_completo, data.usuario.data_nasc, data.usuario.data_cadastro, id];

    db.query(sql, values, callback);
  },

  delete: (id, callback) => {
    // Delete cascata ou lógica conforme seu banco
    const sql = `DELETE FROM USUARIO WHERE ID_usuario = ?`;
    db.query(sql, [id], callback);
  }
};

module.exports = Usuarios;
