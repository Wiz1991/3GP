const withTM = require('next-transpile-modules')(['three']);
const path = require("path");

module.exports = withTM({
  reactStrictMode: true,
  transpilePackages: ["ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
});
