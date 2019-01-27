pragma solidity ^0.5.1;

import "openzeppelin-solidity/contracts/ownershhip/Ownable.sol";

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
      uint betType;
    }
     mapping(address => Player) betLog;
     uint countTeams;
     mapping(uint => address[])teams;
     uint totalPlayers = 0;
     uint[] payouts;
     
     constructor(uint _countTeams) public {
         countTeams = _countTeams;
     }
     function addBet(uint team) public payable {
         betLog[msg.sender] = Player(msg.value, team);
         teams[team].push(msg.sender);
         totalPlayers +=1;
     }
     function getTeam(uint team) public view returns( address[] memory teamAddresses){
         return teams[team];
     }
     function getAmountBet(address player) public view returns (uint amountBet) {
        return betLog[player].amountBet;
     }
     
     function getLoserTotal(uint team) internal view returns (uint loserBetTotal){
         uint total;
        for(uint i =0; i < countTeams-1; i++){
            if(i == team) {
                continue;
            } else {
                for(uint j=0; j< teams[i].length; j++) {
                   address player = teams[i][j];
                   total += betLog[player].amountBet;
                }
                
            }
        }
        return total;
         
     }
     
     function payTeam(uint team) public returns(uint payments) {
         uint winnerCount = teams[team].length;
        //  for(uint i = 0; i < winnerCount ; i++) {
        //     uint bet = getAmountBet(teams[team][i]);
        //     uint betFinal = bet + ((bet/winnerCount)*getLoserTotal(team));
        //     payouts.push(betFinal);
             
        //  }
         return winnerCount;
     }
    
         
}
}