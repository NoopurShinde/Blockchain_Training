const hello = artifacts.require("HelloWorld");
const array = artifacts.require("ArrayExample");
const Bank = artifacts.require("Bank");
const FloodRelief = artifacts.require("FloodReliefDonation");

module.exports = function(deployer) {
  deployer.deploy(hello);
  deployer.deploy(array);
  deployer.deploy(Bank);
  deployer.deploy(FloodRelief);
};
