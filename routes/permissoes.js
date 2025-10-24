const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const autenticarToken = require('../middlewares/auth');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Rota protegida
router.get('/', autenticarToken, async (req, res) => {
  const login = req.usuario.login;

  const { data, error } = await supabase
    .from('vw_permissoes')
    .select('*')
    .eq('login', login);

  if (error) {
    return res.status(500).json({ error: 'Erro ao buscar permissões.' });
  }

  res.status(200).json({ permissoes: data });
});

module.exports = router;