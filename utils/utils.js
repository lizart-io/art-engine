console.log(
  "You're trying to run a file that does not execute. These are a set of tools, functions. Don't run it - open it!"
);

const fs = require("fs");
const templateMeta = (shortName, description, image) => {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);

  function randomDate() {
    const start = new Date(2012, 0, 1),
      end = new Date();

    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  return {
    name: `Dragon Nation Generative #${shortName}`,
    description,
    image,
    author: "LizArt",
    year: 2022,
    edition: 1,
    attributes: [
      [
        {
          trait_type: "color",
          value: `#${randomColor}`,
        },
        {
          trait_type: "random_date",
          value: randomDate(),
        },
      ],
    ],
    compiler: "LizArt Engine",
  };
};

const writeFile = (meta, name) => {
  const basePath = process.cwd();
  const buildDir = `${basePath}/build/json`;

  fs.writeFileSync(`${buildDir}/${name}.json`, JSON.stringify(meta), null, 2);
  console.log(`Generated Metadata file ${buildDir}/${name}.json`);
};

function getCID(shortName) {
  const cids = {
    folder1: "QmQQMtcckvkQbWpCrxSob1MDPiJ9SYMtqBCsaWFyBtcMDk",
    folder2: "QmcjMRW4LSQdZEcpXESsQmJFdFT9mXU4tYDseSzP3HfbXs",
    folder3: "QmdJoBr4rkTFNZrzP6xu2dtc7nmhzmTKWuZE9MXsqcb2pq",
    folder4: "QmTd9McDuKcNq3dGqQEwn18PF6kinqxu811sXxxXSzzMi3",
    folder5: "QmUPiAmxQJxjgMLSQQ6akMNbyBwMowcYC6aviWdvkN8U77",
  };

  const prefix = "ipfs://";
  let cid;

  if (shortName <= 2000) {
    cid = cids.folder1;
  }
  if (shortName >= 2001 && shortName <= 4000) {
    cid = cids.folder2;
  }
  if (shortName >= 4001 && shortName <= 6000) {
    cid = cids.folder3;
  }
  if (shortName >= 6001 && shortName <= 8000) {
    cid = cids.folder4;
  }
  if (shortName >= 8001) {
    cid = cids.folder5;
  }

  return prefix + cid;
}

module.exports = {
  templateMeta,
  writeFile,
  getCID,
};
