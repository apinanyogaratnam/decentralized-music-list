import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import web3 from '../ethereum/web3';
import { useState, useEffect } from 'react';
import abi from '../ethereum/build/MusicList.json';
import musicList from '../ethereum/musicList';


export default function Home() {
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [url, setUrl] = useState('');

  const [songCount, setSongCount] = useState('');
  const [songList, setSongList] = useState([]);

  const displaySongs = async () => {
    const accounts = await web3.eth.getAccounts();
    const numberOfSongs = await musicList.methods.getSongCount().call({ from: accounts[0] });
    setSongCount(numberOfSongs);
  }

  useEffect(() => {
    displaySongs();
  });

  const addSong = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    
    const txData = await musicList.methods.addSong(songName, artistName, url).send({ from: accounts[0] });
    console.log(txData);
  };

  const removeSong = async (id) => {
    const accounts = await web3.eth.getAccounts();
    const txData = await musicList.methods.removeSong(id).send({ from: accounts[0] });
    console.log(txData);
  }

  return (
    <div>
      <h1>{songCount}</h1>
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
          songList.map((song, index) => {
            return (
              <div>
                <h2>{song.songName}</h2>
                <h3>{song.artistName}</h3>
                <h3>{song.url}</h3>
                <button onClick={removeSong(index)}>Delete</button>
              </div>
            );
          })
        }
      </div>
    </div>
  )
}
