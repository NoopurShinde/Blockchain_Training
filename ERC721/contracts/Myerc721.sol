pragma solidity ^0.5.0;

import "./debug/ERC721Full.sol";
import "./debug/ERC721Burnable.sol";
import "./debug/ERC721Holder.sol";
import "./testContract_V1.sol";
import "./testContract.sol";

contract Myerc721 is ERC721Full, ERC721Burnable, ERC721Holder, testContract_V1 , testContract{
    
     constructor (string memory _name, string memory _symbol) public
        ERC721Full(_name, _symbol) 
    {
        
    }

    function mintUniqueTokenTo(
        address _to,
        uint256 _tokenId,
        string memory _uri
       
    ) public
    {
        _mint(_to, _tokenId);
        _setTokenURI(_tokenId, _uri);
    }

    function testtokensOfOwner(address) public{
        mintUniqueTokenTo(0x8D142AF19a2c90A861d36aC95cAf859aA0160Ca8, 10, "Demo token");
        _tokensOfOwner(0x8D142AF19a2c90A861d36aC95cAf859aA0160Ca8);
    }

    function testRegisterInterface(bytes4 _interfaceId) public{
        _registerInterface(_interfaceId);
    }

    function testInternalBurn(address _owner, uint _tokenId) public{
        _burn(_owner, _tokenId);
    }

    function testSetTokenURI(uint _tokenId, string memory _uri) public{
        _setTokenURI(_tokenId, _uri);
        
    }

}