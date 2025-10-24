const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_segura';

router.post('/', async (req, res) => {
  try {
    const { login, senha } = req.body;

    if (!login || !senha) {
      return res.status(400).json({ error: 'Login e senha são obrigatórios.' });
    }

    const { data: usuarios, error } = await supabase
      .from('htiope')
      .select('*')
      .eq('login', login);

    if (error || !usuarios || usuarios.length === 0) {
      return res.status(401).json({ error: 'Usuário e senha incorretos.' });
    }

    const usuario = usuarios[0];

    if (usuario.situac === 'N') {
      return res.status(403).json({ error: 'Seu usuário foi desativado. Contate o administrador.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Usuário e senha incorretos.' });
    }

    const token = jwt.sign(
      {
        coduser: usuario.coduser,
        login: usuario.login,
      },
      JWT_SECRET,
      { expiresIn: '5m' }
    );

    // Enviar token como cookie seguro
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
        maxAge: 5 * 60 * 1000 // 5 minutos
      })
      .status(200)
      .json({
        usuario: {
          coduser: usuario.coduser,
          nome: usuario.nome,
          login: usuario.login,
          email: usuario.email,
        }
      });

  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

module.exports = router;