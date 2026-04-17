const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
    const { nome, autores, data_publicacao, qtd_paginas, num_edicao, categoria, status } = req.body;

    db.run(
        `INSERT INTO livros (nome, autores, data_publicacao, qtd_paginas, num_edicao, categoria, status)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nome, autores, data_publicacao, qtd_paginas, num_edicao, categoria, status],
        function(err){
            if(err) return res.status(500).json(err.message);
            res.json({ mensagem: 'Livro cadastrado com sucesso', id: this.lastID });
        }
    );
});

router.put('/:id', (req, res) => {
    const { nome, autores, data_publicacao, qtd_paginas, num_edicao, categoria, status } = req.body;

    db.run(
        `UPDATE livros SET nome=?, autores=?, data_publicacao=?, qtd_paginas=?, num_edicao=?, categoria=?, status=? WHERE id=?`,
        [nome, autores, data_publicacao, qtd_paginas, num_edicao, categoria, status, req.params.id],
        function(err){
            if(err) return res.status(500).json(err.message);
            res.json({ mensagem: 'Livro atualizado com sucesso' });
        }
    );
});

router.delete('/:id', (req, res) => {
    db.run(`DELETE FROM livros WHERE id=?`, [req.params.id], function(err){
        if(err) return res.status(500).json(err.message);
        res.json({ mensagem: 'Livro removido com sucesso' });
    });
});

router.get('/', (req, res) => {
    db.all(`SELECT * FROM livros`, [], (err, rows)=>{
        if(err) return res.status(500).json(err.message);
        res.json(rows);
    });
});

router.get('/nome/:nome', (req, res) => {
    db.all(`SELECT * FROM livros WHERE nome LIKE ?`, [`%${req.params.nome}%`], (err, rows)=>{
        if(err) return res.status(500).json(err.message);
        res.json(rows);
    });
});

router.get('/copias', (req, res) => {
    db.all(`
        SELECT nome, num_edicao, COUNT(*) as quantidade
        FROM livros
        GROUP BY nome, num_edicao
    `, [], (err, rows)=>{
        if(err) return res.status(500).json(err.message);
        res.json(rows);
    });
});

module.exports = router;