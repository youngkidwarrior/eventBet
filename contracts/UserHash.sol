pragma solidity ^0.5.1;

contract UserHash {
    event IPFSSet(
        string _message
    );
    string ipfsHash;

    function setHash(string memory x) public {
        ipfsHash = x;
        emit IPFSSet("Uploaded data to IPFS");
    }

    function getHash() public view returns(string memory x) {
        return ipfsHash;
    }
}