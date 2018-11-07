const webpack = require('webpack');
const fs = require('fs-extra');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const publicPath = '/';
const shouldUseRelativeAssetPaths = publicPath === './';

const shouldUseSourceMap = false;

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: Object.assign(
        {},
        shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined
      ),
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
        sourceMap: shouldUseSourceMap,
      },
    },
  ];
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: shouldUseSourceMap,
      },
    });
  }
  return loaders;
};

fs.emptyDirSync('./build');

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    mode: 'none',
    entry: './server/index.js',
    target: 'node',
    output: {
        publicPath: ASSET_PATH,
        pathinfo: true,
        path: path.resolve(__dirname, 'build'),
        filename: 'static/js/server.js',
        chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js'
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                loader: require.resolve('babel-loader'),
                options: {
                    plugins: [
                        [
                          require.resolve('babel-plugin-named-asset-import'),
                          {
                            loaderMap: {
                              svg: {
                                ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                              },
                            },
                          },
                        ],
                    ]
                }
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'file-loader',
                options: {
                  limit: 10000,
                  emitFile: false,
                  fallback: 'file-loader',
                  name: '[name].[hash:8].[ext]',
                }
            },
            {
                // Exclude `js` files to keep "css" loader working as it injects
                // its runtime that would otherwise be processed through "file" loader.
                // Also exclude `html` and `json` extensions so they get processed
                // by webpacks internal loaders.
                exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                loader: require.resolve('file-loader'),
                options: {
                  name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            // {
            //     test: /\.css$/,
            //     use: [ 'style-loader', 'postcss-loader' ]
            // },
            {
                test: cssRegex,
                exclude: cssModuleRegex,
                loader: getStyleLoaders({
                  importLoaders: 1,
                  sourceMap: shouldUseSourceMap,
                }),
                sideEffects: true,
            }
        ]
    },
    plugins: [
        // Generates an `index.html` file with the <script> injected.
        // new HtmlWebpackPlugin({
        //   inject: true,
        //   template: paths.appHtml,
        // }),
        // // new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
        // // new webpack.DefinePlugin(env.stringified),
        // new webpack.HotModuleReplacementPlugin(),
        // new CaseSensitivePathsPlugin(),
        new webpack.DefinePlugin({
          'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'static/css/[name].[contenthash:8].css',
            //chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: publicPath,
        }),
    ]
}