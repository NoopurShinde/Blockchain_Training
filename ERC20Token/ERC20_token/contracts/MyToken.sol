pragma solidity ^0.5.3;

import "./debug/ERC20.sol";
import "./debug/ERC20Detailed.sol";
import "./debug/ERC20Mintable.sol";
import "./debug/ERC20Burnable.sol";


contract MyToken is ERC20Mintable, ERC20Detailed, ERC20Burnable{

constructor(string memory _name, string memory _symbol, uint8 _decimals)

    ERC20Detailed(_name, _symbol, _decimals)
    public

    {
        _mint(msg.sender, 1000);
    }


    function testApprove(address owner, address spender, uint value) public{

       _approve(owner,spender, value);
    }

     function testTransfer(address spender, address recipitent, uint value) public{

       _transfer(spender,recipitent, value);
    }
}

