const proxy = require("http-proxy-middleware");

const target = process.env.REACT_APP_API_PROXY;

// not env check required for this proxy setup
// it is automatically registered in react-script cli
// production build will not include by default
// https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development

module.exports = app => {
  app.use(
    proxy("/api", {
      target,
      ws: true,
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      }
    })
  );
};
