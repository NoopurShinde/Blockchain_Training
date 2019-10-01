pragma solidity ^0.5.1;

import "./MultiSigWallet.sol";

contract gnosisWallet is MultiSigWallet{

  constructor(address[] memory _owners, uint _required) public
    MultiSigWallet(_owners, _required){
  }
}