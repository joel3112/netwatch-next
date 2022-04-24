/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: `
      @import "./styles/_mixins.scss";
    `
  }
};

module.exports = nextConfig;
