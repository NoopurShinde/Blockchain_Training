var TestBank = artifacts.require("./Bank.sol");

contract ("TestBank",function(accounts){

    const user1 = accounts[0];
    const user2 = accounts[1];

    it("Balance should be 1000 for calling account", () =>
    TestBank.deployed()
      .then(instance => instance.displayBalance.call(user1))
      .then(balance => {
        assert.equal(
          balance.valueOf(),
          1000,
          "1000 wasn't in the first account"
        );
      }));

     

})