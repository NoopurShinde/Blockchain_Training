pragma solidity ^0.5.3;

import "/home/noopur/Blockchain/05Sept_ERC20Token/My_token/node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "/home/noopur/Blockchain/05Sept_ERC20Token/My_token/node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "/home/noopur/Blockchain/05Sept_ERC20Token/My_token/node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "/home/noopur/Blockchain/05Sept_ERC20Token/My_token/node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";


contract MyToken is ERC20Mintable, ERC20Detailed, ERC20Burnable{

constructor(string memory _name, string memory _symbol, uint8 _decimals)

    ERC20Detailed(_name, _symbol, _decimals)
    public

    {
        _mint(msg.sender, 1000);
    }

}

