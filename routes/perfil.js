const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const autenticarToken = require('../middlewares/auth');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// 🔐 Rota protegida - retorna dados do operador logado
router.get('/', autenticarToken, async (req, res) => {
  try {
    const login = req.usuario.login;

    const { data, error } = await supabase
      .from('vw_dadosoperador')
      .select('*')
      .eq('login', login)
      .single(); // retorna apenas 1 registro

    if (error) {
      console.error('Erro Supabase:', error);
      return res.status(500).json({ error: 'Erro ao buscar dados do perfil.' });
    }

    if (!data) {
      return res.status(404).json({ error: 'Perfil não encontrado.' });
    }

    res.status(200).json({ perfil: data });
  } catch (err) {
    console.error('Erro geral:', err);
    res.status(500).json({ error: 'Erro interno ao buscar perfil.' });
  }
});

module.exports = router;
