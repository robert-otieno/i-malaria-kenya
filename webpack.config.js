export const resolve = {
  fallback: {
    path: require.resolve("path-browserify"),
    fs: false, // or require.resolve('fs')
  },
};
