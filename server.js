const express = require('express');
const app = express();

app.use(express.json());
const port = 3000;
const host = 'localhost'

const livrosRoutes = require('./src/routes/livros');
const usuariosRoutes = require('./src/routes/usuarios');
const emprestimosRoutes = require('./src/routes/emprestimos');

app.use('/livros', livrosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/emprestimos', emprestimosRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
});