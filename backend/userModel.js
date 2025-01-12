const mongoose = require('mongoose');

// Esquema do Usuário
const esquemaUsuario = new mongoose.Schema({
    nome: String,
    idade: Number,
    genero: { type: String, enum: ['Masculino', 'Feminino', 'Outro'] },
});

module.exports = mongoose.model('Usuario', esquemaUsuario);
