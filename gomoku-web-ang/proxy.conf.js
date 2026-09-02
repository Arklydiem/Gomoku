const target = process.env.API_PROXY_TARGET ?? 'http://localhost:8081';

module.exports = {
  '/api': {
    target,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
};
