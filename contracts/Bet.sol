pragma solidity ^0.5.1;

import "openzeppelin-solidity/contracts/ownershhip/Ownable.sol";

contract Bet is Ownable {
    uint amount;
    string betType;
    address eventBet;

    constructor(uint _amount, string _betType, address _eventBet ) {
        betOwner = _betOwner;
        amount = _amount;
        betType = _betType; 
        eventBet = _eventBet;
    }

    function() public payable {
        require(msg.value > 0);
        require(msg.value == amount);
    }

    function cancelBet() {
        require(amount > 0);
        msg.sender.transfer(address(this).balance)
    }
}
