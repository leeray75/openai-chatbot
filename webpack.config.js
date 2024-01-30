// webpack.config.js
import webpack from 'webpack';

const config = {
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      crypto: 'crypto-browserify',
    }),
  ],
};

export default config;
