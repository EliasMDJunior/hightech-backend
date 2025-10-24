const express = require('express');
const router = express.Router();
const autenticarToken = require('../middlewares/auth');

router.post('/', autenticarToken, (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false, // deixe false em ambiente local
    sameSite: 'Strict',
  });

  res.status(200).json({ message: 'Logout realizado com sucesso.' });
});

module.exports = router;