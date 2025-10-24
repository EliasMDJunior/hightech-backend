require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Rotas
const authRoutes = require('./routes/auth');
const logoutRoute = require('./routes/logout');
const permissoesRoute = require('./routes/permissoes');
const inicioRoute = require('./routes/inicio');
const perfilRoutes = require('./routes/perfil');
const checkSessionRouter = require('./routes/checksession');
const alterUserRoute = require('./routes/alter-user');

// Middlewares
app.use(cors({
  origin: 'http://192.10.9.189:5173', // frontend permitido
  credentials: true                // permite enviar/receber cookies
}));
app.use(cookieParser());
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/logout', logoutRoute);
app.use('/permissoes', permissoesRoute);
app.use('/inicio', inicioRoute);
app.use('/perfil', perfilRoutes);
app.use('/check-session', checkSessionRouter);
app.use('/alter-user', alterUserRoute);

// Inicialização
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
