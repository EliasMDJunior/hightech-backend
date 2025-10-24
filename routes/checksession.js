// routes/checkSession.js
const express = require('express');
const router = express.Router();
const autenticarToken = require('../middlewares/auth');

// Rota para verificar se o usuário está logado
router.get('/', autenticarToken, (req, res) => {
  // Se passar pelo middleware, o token é válido
  // Podemos retornar os dados básicos do usuário
  res.status(200).json({ usuario: req.usuario });
});

module.exports = router;
