const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_segura';

function autenticarToken(req, res, next) {
  const token = req.cookies.token; // agora vem do cookie

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  jwt.verify(token, SECRET, (err, usuario) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }

    req.usuario = usuario; // injeta dados do token na requisição
    next();
  });
}

module.exports = autenticarToken;