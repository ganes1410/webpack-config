const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const DotenvPlugin = require('dotenv-webpack');

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require('./build-utils/loadPresets');

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
  return webpackMerge(
    {
      mode,
      entry: './src/index.js',
      output: {
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].chunk.js'
      },
      module: {
        rules: [
          // Babel Support
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
              envName: mode
            }
          },
          // CSS Support
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader'
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: [require('autoprefixer')]
                }
              }
            ],
            exclude: /node_modules/
          },
          // Images
          {
            test: /\.(jpe?g|png|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10 * 1024,
                  path: 'static/images/[name].[ext]'
                }
              }
            ]
          },
          // Svg
          {
            test: /\.svg$/,
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB (10240 bytes)
              limit: 10 * 1024,
              // Remove the quotes from the url
              noquotes: true,
              path: 'static/svg/[name].[ext]'
            }
          },
          // Fonts
          {
            test: /\.(ttf|eot|woff|woff2)$/,
            use: {
              loader: 'file-loader',
              options: {
                name: 'static/fonts/[name].[ext]'
              }
            }
          },
          // SCSS Support

          {
            test: /\.scss$/,
            use: [
              'style-loader', // creates style nodes from JS strings
              {
                loader: 'css-loader'
              }, // translates CSS into CommonJS
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: [require('autoprefixer')]
                }
              },
              'sass-loader' // compiles Sass to CSS, using Node Sass by default
            ]
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        new webpack.ProgressPlugin(),
        new DotenvPlugin()
      ]
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  );
};
