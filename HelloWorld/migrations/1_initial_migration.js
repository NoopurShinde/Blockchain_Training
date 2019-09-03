const hello = artifacts.require("HelloWorld");
const array = artifacts.require("ArrayExample");
const Bank = artifacts.require("Bank");

module.exports = function(deployer) {
  deployer.deploy(hello);
  deployer.deploy(array);
  deployer.deploy(Bank);
};
