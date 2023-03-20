import Env from './next.config.js';
const isProd = process.env.NODE_ENV === 'production';

const setting = {
  isProd,
  basePath: Env.basePath,
  apiPath: isProd ? '' : 'http://localhost:8000',
  wsPath: isProd ? null : 'ws://localhost:8000',
  title: '🏚️ img2excel-server.rb 🏚️',
};

export default setting;
