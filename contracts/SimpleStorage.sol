pragma solidity ^0.5.1;

contract SimpleStorage {
  event StorageSet(
    string _message
  );

  uint public storedData;

  function set(uint x) public {
    storedData = x;

    emit StorageSet("Data stored successfully!");
  }
}
