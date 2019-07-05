const fs = require('fs');
fs.createReadStream('./package.json').pipe(fs.createWriteStream('./dist/msdb-ts/package.json'));