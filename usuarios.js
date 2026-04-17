const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
    const { nome, cpf, telefone, email } = req.body;

    db.run(
        `INSERT INTO usuarios (nome, cpf, telefone, email)
         VALUES (?, ?, ?, ?)`,
        [nome, cpf, telefone, email],
        function(err){
            if(err) return res.status(500).json(err.message);
            res.json({ mensagem: 'Usuário cadastrado com sucesso', id: this.lastID });
        }
    );
});

router.get('/cpf/:cpf', (req, res) => {
    db.get(`SELECT * FROM usuarios WHERE cpf = ?`, [req.params.cpf], (err, row)=>{
        if(err) return res.status(500).json(err.message);
        res.json(row);
    });
});

router.delete('/:id', (req, res) => {
    db.run(`DELETE FROM usuarios WHERE id = ?`, [req.params.id], function(err){
        if(err) return res.status(500).json(err.message);
        res.json({ mensagem: 'Usuário removido com sucesso' });
    });
});

module.exports = router;