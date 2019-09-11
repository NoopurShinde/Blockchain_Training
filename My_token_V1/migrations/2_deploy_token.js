const HelloWorld = artifacts.require("./HelloWorld.sol");
const Bank = artifacts.require("./Bank.sol");
const ArrayExample = artifacts.require("./ArrayExample.sol");
const FloodDonation = artifacts.require("./FloodReliefDonation.sol");

module.exports = function(deployer, accounts) {

   
    deployer.deploy(HelloWorld);
    deployer.deploy(Bank);
    deployer.deploy(ArrayExample);
    deployer.deploy(FloodDonation);
};
