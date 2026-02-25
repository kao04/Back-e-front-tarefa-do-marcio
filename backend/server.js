const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const db = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// ─────────────────────────────────────────────
// ROTA GET - Listar todos os filmes
// ─────────────────────────────────────────────
app.get('/api/filmes', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM filmes_kao04 ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        res.status(500).json({ erro: 'Erro ao buscar filmes no banco de dados.' });
    }
});

// ─────────────────────────────────────────────
// ROTA POST - Cadastrar um novo filme
// ─────────────────────────────────────────────
app.post('/api/filmes', async (req, res) => {
    const { titulo, diretor, ano, genero, sinopse } = req.body;

    if (!titulo || !diretor || !ano) {
        return res.status(400).json({ erro: 'Título, Diretor e Ano são obrigatórios.' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO filmes_kao04 (titulo, diretor, ano, genero, sinopse) VALUES (?, ?, ?, ?, ?)',
            [titulo, diretor, ano, genero || null, sinopse || null]
        );
        res.status(201).json({ mensagem: 'Filme cadastrado com sucesso!', id: result.insertId });
    } catch (error) {
        console.error('Erro ao cadastrar filme:', error);
        res.status(500).json({ erro: 'Erro ao cadastrar filme no banco de dados.' });
    }
});

// ─────────────────────────────────────────────
// ROTA PUT - Editar um filme existente
// ─────────────────────────────────────────────
app.put('/api/filmes/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, diretor, ano, genero, sinopse } = req.body;

    if (!titulo || !diretor || !ano) {
        return res.status(400).json({ erro: 'Título, Diretor e Ano são obrigatórios.' });
    }

    try {
        const [result] = await db.query(
            'UPDATE filmes_kao04 SET titulo=?, diretor=?, ano=?, genero=?, sinopse=? WHERE id=?',
            [titulo, diretor, ano, genero || null, sinopse || null, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Filme não encontrado.' });
        }
        res.json({ mensagem: 'Filme atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao editar filme:', error);
        res.status(500).json({ erro: 'Erro ao editar filme no banco de dados.' });
    }
});

// ─────────────────────────────────────────────
// ROTA DELETE - Deletar um filme
// ─────────────────────────────────────────────
app.delete('/api/filmes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM filmes_kao04 WHERE id=?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Filme não encontrado.' });
        }
        res.json({ mensagem: 'Filme deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar filme:', error);
        res.status(500).json({ erro: 'Erro ao deletar filme no banco de dados.' });
    }
});

// ─────────────────────────────────────────────
// Rota raiz → redireciona para o frontend
// ─────────────────────────────────────────────
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
