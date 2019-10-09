module.exports = mode => {
  console.log(mode);
  return {
    mode,
    devServer: {
      port: process.env.DEV_PORT
    },
    devtool: 'source-map'
  };
};
