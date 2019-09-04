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
          "Initial balance for account[0] should be 1000"
        );
      }));

      it("Balance should be 0 for accounts other than calling", () =>
      TestBank.deployed()
        .then(instance => instance.displayBalance.call(user2))
        .then(balance => {
          assert.equal(
            balance.valueOf(),
            0,
            "Initial balance for accounts other than calling  should be 0"
          );
        }));

        it(("Should deposit valid balance"), async() => {
            const depositamt = 100;
            const initialBalance = 0;
            const bank = await TestBank.deployed();
            await bank.deposit(user2,depositamt);
            const updatedBalance = await bank.displayBalance(user2);
            assert.isTrue(((updatedBalance == initialBalance+depositamt) && (depositamt>0)),"Deposit amount should be greater than 0");
        })

        it(("Should withdraw proper amount"),async() => {
            const withdraw_amt = 10;
            const bank = await TestBank.deployed();
            const balance = await bank.displayBalance(user1);
            await bank.withdraw(user1, withdraw_amt);
            const updatedBalance = await bank.displayBalance(user1);
            //assert.equal(updatedBalance, balance-withdraw_amt,'Fail2');
        })

        it(("Should revert balance"),async() => {
            const bank = await TestBank.deployed();            
            const sendamt = 200;
            await bank.sendbal(user2,sendamt,{from:user1});
           
        })
})