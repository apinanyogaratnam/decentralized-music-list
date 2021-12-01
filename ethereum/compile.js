const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');
const { default: build } = require('next/dist/build');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const musicListPath = path.resolve(__dirname, 'contracts', 'MusicList.sol');
const source = fs.readFileSync(musicListPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'MusicList.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
fs.ensureDirSync(buildPath);

fs.outputJsonSync(
    path.resolve(buildPath, 'MusicList.json'),
    output.contracts['MusicList.sol'].MusicList
);
