import { createRequire } from "node:module";

const testRequire = createRequire(import.meta.url);

testRequire.extensions[".mp3"] = (module, filename) => {
  module.exports = filename;
};
