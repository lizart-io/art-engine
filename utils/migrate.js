const { templateMeta, writeFile, getCID } = require("./utils");

// log to the user a message that we're running!
console.log("🚀 Engine Starting...");

let metadata = [];

for (let i = 1; i <= 10000; i++) {
  const data = () =>
    templateMeta(
      i,
      "LizArt Dragon Nation Generative Collection. International collaboration was baked into this token.",
      `${getCID(i)}/${i}.png`
    );
  metadata.push(data());
  writeFile(data(), i);
}

writeFile(metadata, "_metadata");
