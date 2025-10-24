const express = require('express');
const router = express.Router();
const autenticarToken = require('../middlewares/auth');

// Rota protegida — só acessível se o JWT for válido
router.get('/', autenticarToken, async (req, res) => {
  try {
    const usuario = req.usuario; // vem decodificado do middleware
    res.status(200).json({
      mensagem: `Bem-vindo à tela inicial, ${usuario.login}!`,
      usuario
    });
  } catch (error) {
    console.error('Erro em /inicio:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

module.exports = router;
