const { create, globSource } = require("ipfs-http-client");
const _ipfs = create();
const fs = require("fs");
const { log } = console;

log("Getting started.....");
async function ipfs() {
  const meta = [];
  for await (const file of _ipfs.addAll(globSource("./build/images", "**/*"))) {
    const fileUrl = `ipfs://${file.cid}`.replace(/.*\(|\).*/g, "");
    const _cid = `${file.cid}`.replace(/.*\(|\).*/g, "");

    let str = file.path;
    str = str.substring(0, str.length - 4);

    const jsonFile = fs.readFileSync("./build/json/" + str + ".json");
    const content = JSON.parse(jsonFile);
    content.image = fileUrl;
    content.name = `Dragon Nation Generative #${str}`;
    content.gateway = "https://gateway.pinata.cloud/ipfs/" + _cid;
    content.compiler = "LizArt Engine";
    content.description =
      "You own a token for something great! LizArt is an international collaboration of artists, developers, and crypto enthusiasts. We focus on helping NONPROFITS and CHARITIES around the multiverse!";
    fs.writeFileSync(
      "./build/json/" + str + ".json",
      JSON.stringify(content, null, 2)
    );
    meta.push(content);
  }

  fs.writeFileSync(
    "./build/json/_metadata.json",
    JSON.stringify(meta, null, 2)
  );
  log(
    "\x1b[32m",
    "_metadata.json file created successfully. This file is a combination of all file metadata. Save it!"
  );
}


module.exports = ipfs;
