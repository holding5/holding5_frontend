// module.exports = {
//   presets: ["babel-preset-expo", "@babel/preset-typescript"],
//   plugins: ["@babel/plugin-transform-runtime", "nativewind/babel"],
// };
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"],
  };
};
