const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../ethereum/build/MusicList.json');

let accounts;
let musicList;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    console.log()
    musicList = await new web3.eth.Contract(abi)
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

    it('can add a song', async () => {
        await musicList.methods.addSong('Lizzie McGuire', '3m french', 'youtube.com').send({ from: accounts[0] });

        const numberOfSongs = await musicList.methods.getSongCount().call({ from: accounts[0] });
        assert.equal('1', numberOfSongs);
    });

    // it('can remove a song', async () => {
    //     await musicList.methods.addSong('Lizzie McGuire', '3m french', 'youtube.com').call();
    //     const numberOfSongs = await musicList.methods.getSongCount().call();
    //     console.log(numberOfSongs);
    //     // await musicList.methods.removeSong('0').send({ from: accounts[0] });
    // });
});
