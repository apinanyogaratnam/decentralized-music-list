const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../ethereum/build/MusicList.json');

let accounts;
let musicList;

beforeEach(() => {
    accounts = await web3.eth.getAccounts();

    musicList = await web3.eth.Contract(JSON.parse(abi))
      .deploy({
          data: evm.bytecode.object,
          arguments: []
      })
      .send({
          from: accounts[0],
          gas: '1000000'
      });
});

describe('MusicList', () => {
    it('deploys a contract', () => {
        assert.ok(musicList.options.address);
    });
});