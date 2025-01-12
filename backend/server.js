const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const Usuario = require('./userModel'); // Modelo traduzido

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB!'))
    .catch((erro) => console.error('Erro ao conectar ao MongoDB:', erro));

// Rotas
app.get('/', (req, res) => {
    return res.send('Servidor Express na Vercel!');
})

app.get('/usuarios', async (req, res) => {
    const filtros = {};
    if (req.query.idade) filtros.idade = { $gt: Number(req.query.idade) };
    if (req.query.genero) filtros.genero = req.query.genero;
    if (req.query.nome) filtros.nome = req.query.nome;

    const usuarios = await Usuario.find(filtros);
    return res.json(usuarios);
});

app.get('/usuarios/:id', async (req, res) => {
    const usuarios = await Usuario.findOne(req.params.id);
    return res.json(usuarios);
});

app.post('/usuarios', async (req, res) => {
    const { nome, idade, genero } = req.body;
    const usuario = new Usuario({ nome, idade, genero });
    await usuario.save();
    return res.status(201).json(usuario);
});

app.delete('/usuarios/:id', async (req, res) => {
    await Usuario.findByIdAndDelete(req.params.id);
    return res.json({ mensagem: 'Usuário deletado!' });
});

app.put('/usuarios/:id', async (req, res) => {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body);
    usuario.save()
    return  res.json(usuario);
});

// Iniciar o servidor
app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`))
