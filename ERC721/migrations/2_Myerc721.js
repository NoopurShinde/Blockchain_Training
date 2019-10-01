const MyERC721 = artifacts.require("./Myerc721.sol");
const testContract = artifacts.require("./testContract.sol");
const testcontract_V1 = artifacts.require("./testContract_V1.sol");

module.exports = function(deployer, accounts) {

    const _name="My ERC721Token";
    const _symbol = "MT721";
   
    deployer.deploy(MyERC721, _name, _symbol);
    deployer.deploy(testContract);
    deployer.deploy(testcontract_V1);
};
