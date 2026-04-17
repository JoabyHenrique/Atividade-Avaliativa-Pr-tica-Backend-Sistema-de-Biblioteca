const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
    const { id_livro, id_usuario, data_emprestimo, data_vencimento, status } = req.body;

    db.run(
        `INSERT INTO emprestimos (id_livro, id_usuario, data_emprestimo, data_vencimento, status)
         VALUES (?, ?, ?, ?, ?)`,
        [id_livro, id_usuario, data_emprestimo, data_vencimento, status],
        function(err){
            if(err) return res.status(500).json(err.message);
            res.json({ mensagem: 'Empréstimo cadastrado com sucesso', id: this.lastID });
        }
    );
});

router.put('/:id', (req, res) => {
    const { id_livro, id_usuario, data_emprestimo, data_vencimento, status } = req.body;

    db.run(
        `UPDATE emprestimos SET id_livro=?, id_usuario=?, data_emprestimo=?, data_vencimento=?, status=? WHERE id=?`,
        [id_livro, id_usuario, data_emprestimo, data_vencimento, status, req.params.id],
        function(err){
            if(err) return res.status(500).json(err.message);
            res.json({ mensagem: 'Empréstimo atualizado com sucesso' });
        }
    );
});

router.get('/', (req, res) => {
    db.all(`SELECT * FROM emprestimos ORDER BY id DESC`, [], (err, rows)=>{
        if(err) return res.status(500).json(err.message);
        res.json(rows);
    });
});

router.get('/usuario/:id_usuario', (req, res) => {
    db.all(`SELECT * FROM emprestimos WHERE id_usuario = ?`, [req.params.id_usuario], (err, rows)=>{
        if(err) return res.status(500).json(err.message);
        res.json(rows);
    });
});

router.get('/status/:status', (req, res) => {
    db.all(`SELECT * FROM emprestimos WHERE status = ?`, [req.params.status], (err, rows)=>{
        if(err) return res.status(500).json(err.message);
        res.json(rows);
    });
});

module.exports = router;