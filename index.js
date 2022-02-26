const basePath = process.cwd();
const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);
const ipfs = require("./ipfs");

(async () => {
  buildSetup();
  startCreating();
})().then(() => {
  ipfs()
});
