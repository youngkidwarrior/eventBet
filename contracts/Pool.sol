pragma solidity ^0.5.1;

import "openzeppelin-solidity/contracts/ownershhip/Ownable.sol";
import "./Bet";

contract Pool is Ownable {
    event Deposit(
        string _message,
        address _player,
        uint _amountBet
    );
    event Withdraw(string _message, address[] _winners);
    event Cancel(string _message, address[] _players);

    struct Player {
      uint256 amountBet;
      uint16 betType;
    }

     mapping(address => Player) betLog;


    function() external payable {}

    function cancel() public {
      require(msg.sender == owner);

      event Withdraw("Event Canceled");  
      selfdestruct(owner);
    }

   



    function addBet(Player player, ) public {
        
    }

    function removeBet(Player player, address _playerAddress) public returns(bool betRemoved) {
        return ipfsHash;
    }

    constructor()
}