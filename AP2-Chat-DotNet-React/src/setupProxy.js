const { createProxyMiddleware } = require('http-proxy-middleware');
import apiPort from "./ApiPort";


const context = [
    "/api",
    "/hub",
    "/userauth",
];

module.exports = function (app) {
    const target = "https://localhost:" + apiPort;
    const appProxy = createProxyMiddleware(context, {
        target: target,
        secure: false
    });

    app.use(appProxy);
};
