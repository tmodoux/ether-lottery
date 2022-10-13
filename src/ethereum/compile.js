const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'contracts', 'Contract.sol');
const source = fs.readFileSync(contractPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'Contract.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};


var output = JSON.parse(solc.compile(JSON.stringify(input)));

fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract + '.json'),
        output[contract]
    );
}