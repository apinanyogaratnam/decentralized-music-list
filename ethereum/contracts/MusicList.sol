pragma solidity ^0.8.0;

contract MusicList {
    struct Song {
        string name;
        string artistName;
        string url;
    }
    mapping(address => Song[]) songs;

    constructor() {}

    function addSong(string memory name, string memory artistName, string memory url) public {
        Song memory song = Song({
            name: name,
            artistName: artistName,
            url: url
        });

        songs[msg.sender].push(song);
    }
}
