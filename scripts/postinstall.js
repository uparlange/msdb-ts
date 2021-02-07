const fs = require('fs');
const svgstore = require('svgstore');

fs.copyFileSync('./node_modules/@mdi/angular-material/mdi.svg', './src/assets/mdi.svg');

const flagsSprite = svgstore();
const flagDir = './node_modules/svg-country-flags/svg'
const flags = fs.readdirSync(flagDir);
flags.forEach((flag) => {
    const code = flag.split('.')[0].toLowerCase();
    if (['cn', 'hr', 'cz', 'nl', 'gb', 'fr', 'de', 'gr', 'hu', 'it', 'jp', 'kr', 'pl', 'pt', 'ru', 'sk', 'es', 'se', 'tr', 'no', 'bg', 'lv', 'ua'].indexOf(code) !== -1) {
        flagsSprite.add("flag-" + code, fs.readFileSync(flagDir + '/' + flag, 'utf8'))
    }
});
fs.writeFileSync('./src/assets/flags.svg', flagsSprite);