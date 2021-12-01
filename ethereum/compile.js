const path = require('path');
const fs = require('fs');
const solc = require('solc');

const musicListPath = path.resolve(__dirname, 'contracts', 'MusicList.sol');
const source = fs.readFileSync(musicListPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
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

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  'MusicList.sol'
].MusicList;
