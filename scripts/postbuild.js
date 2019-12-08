const fs = require('fs');

const pData = fs.readFileSync('./package.json');
const pJson = JSON.parse(pData);
// modify nwjs main
pJson.main = 'index.html';
fs.writeFileSync('./dist-ng/package.json', JSON.stringify(pJson));