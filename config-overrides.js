module.exports = (config, env) => {
    console.log('config: ', config);
    config.module.rules.push(
        {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              emitFile: false,
              fallback: 'file-loader',
              name: '[name].[hash:8].[ext]',
              target: 'node'
            }
        }
    );
    return config;
}