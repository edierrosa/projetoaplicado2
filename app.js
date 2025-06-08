const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());
// ✅ Permite requisições vindas do React (localhost:5173)
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true // opcional: apenas se usar cookies/autenticação
// }));

app.use(express.json());

// ⬇️ Suas rotas vêm depois disso
const livrosRoutes = require('./routes/livrosRoutes');
app.use('/livros', livrosRoutes);

// ⬇️ Porta do servidor
app.listen(3000, () => {
  console.log('🚀 Servidor Node rodando na porta 3000');
});

