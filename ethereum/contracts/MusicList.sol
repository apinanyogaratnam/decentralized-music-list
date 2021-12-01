pragma solidity ^0.8.0;

contract MusicList {
    struct Song {
        string name;
        string artistName;
        string url;
    }
    mapping(address => Song[]) songs;
    mapping(address => uint) songsCount;

    constructor() {}

    function addSong(string memory name, string memory artistName, string memory url) public {
        Song memory song = Song({
            name: name,
            artistName: artistName,
            url: url
        });

        songs[msg.sender].push(song);
        songsCount[msg.sender] += 1;
    }

    function removeSong(uint index) public {
        require(index < songsCount[msg.sender]);

        Song[] storage songsArray = songs[msg.sender];
        songsArray[index] = songsArray[songsArray.length - 1];
        songsArray.pop();
        songsCount[msg.sender] -= 1;
    }

    function getSong(uint index) public view returns (string, string, string, url) {
        Song memory song = songs[msg.sender][index];
        return {
            song.name,
            song.artistName,
            song.url
        }
    }

    function getSongCount() public view returns(uint) {
        return songsCount[msg.sender];
    }
}
