require('dotenv').config({ path: 'server/config/.env' });
const projectsRoutes = require('./routes/api/projectsRoutes');
const articlesRoutes = require('./routes/api/articlesRoutes');
const authRoutes = require('./routes/api/authRoutes');

const routes = (server) => {
  server.use('/api/projects', projectsRoutes);
  server.use('/api/articles', articlesRoutes);
  server.use('/api/auth', authRoutes);
};
module.exports = routes;
