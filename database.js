const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            autores TEXT NOT NULL,
            data_publicacao TEXT NOT NULL,
            qtd_paginas INTEGER NOT NULL,
            num_edicao INTEGER NOT NULL,
            categoria TEXT NOT NULL,
            status TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cpf TEXT UNIQUE NOT NULL,
            telefone TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS emprestimos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_livro INTEGER NOT NULL,
            id_usuario INTEGER NOT NULL,
            data_emprestimo TEXT NOT NULL,
            data_vencimento TEXT NOT NULL,
            status TEXT NOT NULL,
            FOREIGN KEY(id_livro) REFERENCES livros(id),
            FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
        )
    `);
});

module.exports = db;