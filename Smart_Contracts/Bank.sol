pragma solidity ^0.5.0;

/// @title A simulator for bank operations
/// @author Noopur N. Shinde
/// @notice You can use this contract for only the most basic simulation

contract Bank{
    
    /// @notice Basic bank operations like deposit money, withdraw money, transfer money and view balance function
    
    address owner;
    mapping(address => uint) balances ;
    
    constructor() public{
    
        owner = msg.sender;
    }
    
    /// @notice This function will add the specified amount to the specified bank account address
    /// @param _addr The address for which amount needs to be deposited
    /// @param _amt The amount to be deposited
    function deposit(address _addr,uint _amt) public{
        
        balances[_addr] += _amt;
               
    }
    
 
    /// @notice This function will display the balance of the specified bank account address
    /// @param _addr The address for which balance needs to be displayed
    /// @return balance in number format
    function displayBalance(address _addr) public view returns(uint){
    
        return balances[_addr];
    }
    
    /// @notice This function will transfer the specified amount from the bank account address calling this function, to the specified bank account address. It will also check if the amount is greater than 0 and the specified amount is present in the calling bank account address
    /// @param _addrOfrec The address for which amount needs to be transferred
    /// @param _amt The amount to be transferred
    function sendbal(address _addrOfrec, uint _amt) public{
        
        require(_amt>0 && balances[msg.sender] >= _amt, "Balance should be higher than to be transferred");
        balances[msg.sender] -= _amt;
        balances[_addrOfrec] += _amt;
       
    }
    
    /// @notice This function will withdraw the specified amount from the bank account address checking if the amount is greater than 0 and the specified amount is present in the bank account address
    /// @param _addr The address from which amount needs to be withdrawn
    /// @param _amt The amount to be withdrawn
    function withdraw(address _addr, uint _amt) public{
        
        require(_amt>0 && balances[_addr] >= _amt, "You can withdraw from your account only if your balance is higher than the withdrawal amount.");
        balances[_addr] -= _amt;
        
    }
    
    
}
