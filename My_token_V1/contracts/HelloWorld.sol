pragma solidity ^0.5.0;
contract HelloWorld{
 
  string str;

    constructor() public  {
        str = "Hello World!!";
    }

    function getstring() public view returns(string memory) {
        return str;
    }

    function setstring(string memory _str) public{
        str = _str;
    }
}