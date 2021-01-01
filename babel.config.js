module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      "root": ["."],
      "extensions": [".js", ".jsx", ".ts", ".tsx", ".ios.js", ".android.js", ".json"],
      "alias": {
        "@algo": "./src/algo",
        "@api": "./src/api",
        "@assets": "./src/assets",
        "@components": "./src/components",
        "@hooks": "./src/hooks",
        "@Language": "./src/Language",
        "@redux": "./src/redux",
        "@router": "./src/router",
        "@screens": "./src/screens",
        "@types": "./src/types",
      }
    }]
  ]
};
