const zip = require('zip-a-folder');
const pkg = require('./../package.json');
const pkgLock = require('./../package-lock.json');
const fs = require('fs-extra');

const pkgDependencies = ['body-parser', 'chokidar', 'express', 'socket.io'];
const modules = [];

const addDependency = function (dependency) {
    modules.push(dependency);
    for (let pkgLockDependency in pkgLock.dependencies) {
        if (pkgLockDependency == dependency) {
            for (let pkgLockRequire in pkgLock.dependencies[dependency].requires) {
                addDependency(pkgLockRequire);
            }
            break;
        }
    }
};

const copyNextModule = function () {
    if (modules.length > 0) {
        const module = modules.shift();
        fs.copy('./node_modules/' + module, './dist/msdb-ts/node_modules/' + module, function (err) {
            copyNextModule();
        });
    } else {
        const name = pkg.name + '-' + pkg.version + '.nw';
        zip.zipFolder('./dist/msdb-ts', './release/' + name, function (err) {
            
        });
    }
}

pkgDependencies.forEach((pkgDependency) => {
    addDependency(pkgDependency);
});

copyNextModule();