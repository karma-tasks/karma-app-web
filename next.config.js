require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  distDir: 'build',
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env.local'),
        systemvars: true
      })
    ];

    return config;
  }
};
