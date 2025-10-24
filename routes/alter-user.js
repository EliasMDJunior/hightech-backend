const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const autenticarToken = require('../middlewares/auth');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ✅ Rota protegida: Alterar dados do usuário logado
router.put('/', autenticarToken, async (req, res) => {
  try {
    const coduser = req.usuario.coduser; // vem do token JWT
    const { nome, email, telefone, celular, ramal } = req.body;

    // Validação básica
    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
    }

    const { data, error } = await supabase
      .from('htiope')
      .update({
        nome,
        email,
        telefone,
        celular,
        ramal,
      })
      .eq('coduser', coduser)
      .select(); // retorna os dados atualizados

    if (error) {
      console.error('Erro ao atualizar usuário:', error);
      return res.status(500).json({ error: 'Erro ao atualizar os dados.' });
    }

    res.status(200).json({
      message: 'Dados atualizados com sucesso.',
      usuario: data[0],
    });
  } catch (err) {
    console.error('Erro inesperado:', err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

module.exports = router;
