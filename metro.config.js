const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Get existing asset extensions
const assetExts = config.resolver?.assetExts || [];
const sourceExts = config.resolver?.sourceExts || [];

// Ensure asset extensions are properly configured
config.resolver = {
  ...config.resolver,
  assetExts: [
    ...new Set([...assetExts, "png", "jpg", "jpeg", "gif", "webp", "svg"]),
  ],
  sourceExts: [...new Set([...sourceExts, "jsx", "js", "ts", "tsx", "json"])],
};

module.exports = withNativeWind(config, { input: "./app/global.css" });
