const Multisig = artifacts.require("./gnosisWallet.sol");

module.exports = function(deployer, accounts) {
  
  deployer.deploy(Multisig, ['0x8D142AF19a2c90A861d36aC95cAf859aA0160Ca8', '0x73b85972fd2bbB84cbf1CB261D2f3b291C170676'], 2, {from: "0x8D142AF19a2c90A861d36aC95cAf859aA0160Ca8"});
};
