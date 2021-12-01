import web3 from './web3';
import MusicList from './build/MusicList.json';

const instance = new web3.eth.Contract(
    JSON.parse(MusicList.abi),
    '0x5A23a94327759114DEeCea85f316b8A2692bB51D'
);

export default instance;