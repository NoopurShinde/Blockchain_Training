const MyToken = artifacts.require("./MyToken.sol");

module.exports = function(deployer, accounts) {

    const _name="My Token";
    const _symbol = "MT";
    const _decimals = 18;

    deployer.deploy(MyToken, _name, _symbol, _decimals);
};
