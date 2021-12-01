import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import web3 from '../ethereum/web3';
import { useState, useEffect } from 'react';
import abi from '../ethereum/build/MusicList.json';
import musicList from '../ethereum/musicList';


export default function Home() {
  const [view , setView] = useState(false);

  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [url, setUrl] = useState('');

  const [songCount, setSongCount] = useState(null);
  const [songList, setSongList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const addSong = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    
    const txData = await musicList.methods.addSong(songName, artistName, url).send({ from: accounts[0] });
    console.log(txData);
    setSongName('');
    setArtistName('');
    setUrl('');
    viewSongs();
  };

  const removeSong = async (id) => {
    const accounts = await web3.eth.getAccounts();
    const txData = await musicList.methods.removeSong(id).send({ from: accounts[0] });
    console.log(txData);
    viewSongs();
  };

  const getSongs = async () => {
    const accounts = await web3.eth.getAccounts();
    let numberOfSongs = await musicList.methods.getSongCount().call({ from: accounts[0] });
    setSongCount(parseInt(numberOfSongs));
    numberOfSongs = parseInt(numberOfSongs);

    const songs = await Promise.all(
      Array(numberOfSongs).fill().map((element, index) => {
        return musicList.methods.getSong(index).call({ from: accounts[0] });
      })
    );
    
    setSongList(songs);
  };

  const viewSongs = () => {
    setLoading(true);
    setMessage('waiting for transaction');
    getSongs();
    setView(true);
    setLoading(false);
    setMessage('');
  };

  return (
    <div>
      {view ? null : <button onClick={viewSongs}>View your songs</button>}
      {loading ? <p>{message}</p> : null}
      {songCount === null ? null : <h1>{songCount}</h1>}
      <form>
        <input 
          type="text" 
          placeholder="Song name" 
          value={songName} 
          onChange={(e) => setSongName(e.target.value)}  
        />
        <br />
        <input
          type="text"
          placeholder="Artist name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="song URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <button type="submit" onClick={addSong}>Submit</button>
      </form>

      <div>
        <h1>Your Songs:</h1>
        {
          songList.map((key, index) => {
            return (
              <div key={index}>
                <h3>{key[0]}</h3>
                <h3>{key[1]}</h3>
                <h3>{key[2]}</h3>
                <button onClick={() => removeSong(index)}>Delete</button>
              </div>
            );
          })
        }
      </div>
      <p>Install metamask if you haven't done so already. Get eth from the faucet here: <a href="https://faucets.chain.link/rinkeby" target="_blank" rel="noopener">faucet</a></p>
      <p>Make sure you are on the rinkeby testnet. Any funds sent through different networks will be lost.</p>
    </div>
  )
}
