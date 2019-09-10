var TestToken = artifacts.require("./MyToken.sol");

contract("TestToken", function(accounts){

    const _name = "My Token";
    const _symbol = "MT";
    const _decimals = 18;
    const _totalSupply = 1000;
    const _transferAmount = 300;
    const _transferFromAmount = 20;
    let token, state;

    beforeEach(async function(){

        token = await TestToken.new(_name, _symbol, _decimals);
       
    })

    describe("Constructor ERC20 Detailed", function(){

        it("Should return correct name", async function() {
    
          const name = await token.name.call();
          assert.equal(name, _name, "Name does not match");

        });

        it("Should return correct symbol", async function() {

          const symbol = await token.symbol();
          assert.equal(symbol,_symbol,"Symbol do not match")

        });

      it("Should return correct decimals", async function() {

          const decimals = await token.decimals();
          assert.equal(decimals,_decimals,"Decimal do not match")

        });

    })
    

    describe("Approval and allowances Function", function(){

      it("Amount to be approved should be less that the token balance", async function() {

          const approveAmount = 100;
          const initialAllowance = await token.allowance(accounts[0],accounts[1]);
          state = await token.approve(accounts[1], approveAmount);
          assert.isTrue(((await token.balanceOf(accounts[0]) >= approveAmount) && (approveAmount>0)),"The amount to be approved should be less than account[0] balance.")
          assert.equal((await token.allowance(accounts[0],accounts[1])),(Number(initialAllowance) + Number(approveAmount)),"True");
          assert.equal((state.logs[0].event), 'Approval', 'Event not emitted');
      });

      it("Decrease allowance",async function(){
        const decreaseAllowancAmt = 20;
        await token.approve(accounts[1], 100);
        var allowanceAmount = await token.allowance(accounts[0],accounts[1]);
        state = await token.decreaseAllowance(accounts[1],decreaseAllowancAmt);
        assert.isTrue((allowanceAmount >= decreaseAllowancAmt) && (decreaseAllowancAmt>0),"Allowance to be decreased should be less than the allowance.");
        allowanceAmount = allowanceAmount - decreaseAllowancAmt;
        assert.equal((await token.allowance(accounts[0],accounts[1])), allowanceAmount, "Fail");
        assert.equal((state.logs[0].event), 'Approval', 'Event not emitted');

      })

      it("Increase allowance",async function(){
          const increaseAllowancAmt = 20;
          await token.approve(accounts[1], 100);
          const allowanceAmount = await token.allowance(accounts[0],accounts[1]);
          state = await token.increaseAllowance(accounts[1],increaseAllowancAmt);
          assert.isTrue(((await token.balanceOf(accounts[0])) > (Number(increaseAllowancAmt)+Number(allowanceAmount)) && (increaseAllowancAmt>0)) && (((Number(allowanceAmount)+Number(increaseAllowancAmt)) < await token.totalSupply())),"Allowance to be increased should not exceed the total supply.");
          const updatedAllowanceAmount = Number(allowanceAmount) + Number(increaseAllowancAmt);
          assert.equal((await token.allowance(accounts[0],accounts[1])), updatedAllowanceAmount, "Fail");
          assert.equal((state.logs[0].event), 'Approval', 'Event not emitted');

      })

    })
    

    describe("TokenSupply function",function(){

      it("TotalSupply should be set to 1000 initially", async function() {

        assert.equal((await token.totalSupply()), _totalSupply, "Totalsupply not set");

      })

      it("Token supply should be assigned to the token owner", async function() {

        const balance = await token.balanceOf(accounts[0]);
        assert.equal(_totalSupply, balance, "The total supply is not assigned to the token owner.");

      });

    });
    

    describe("Transfer Functions", function(){

      it("Amount transferred as well as the balances of sender's and recipitent's accounts should be updated", async function() {

        const balance = await token.balanceOf(accounts[0]);
        assert.isTrue(((_transferAmount <= balance) && (_transferAmount < _totalSupply)), "Balance is not enough to transfer the required amount of tokens or total supply of tokens is less than the tokens to be transferred");

        state = await token.transfer(accounts[1], _transferAmount);
        assert.equal((await token.balanceOf(accounts[0])), (balance - _transferAmount), "Account0 balance is wrong");
        assert.equal((await token.balanceOf(accounts[1])), _transferAmount, "Account1 balance is wrong");
        assert.equal((state.logs[0].event), 'Transfer', 'Event not emitted');
        
      });

      it("TransferFrom function: Should give accounts[1] authority to spend accounts[0] tokens", async function(){

        await token.approve(accounts[1], 100);
        const intialBalance = await token.balanceOf(accounts[0]);
        const allowanceAmount = await token.allowance(accounts[0],accounts[1]);
        assert.equal(allowanceAmount,100,"Allowance should be equal to the approved token numbers initially");
        state  = await token.transferFrom(accounts[0], accounts[2], _transferFromAmount,{from: accounts[1]});
        assert.isTrue((allowanceAmount >= _transferFromAmount),"Transfer amount exceeds approved amount.");
        assert.equal((await token.balanceOf(accounts[2])), _transferFromAmount,"Token balance for accounts[2] is not updated");
        assert.equal((await token.balanceOf(accounts[0])), (intialBalance - _transferFromAmount),"Token balance for accounts[0] is not updated");
        assert.equal((state.logs[0].event), 'Transfer', 'Event not emitted');
        assert.equal((state.logs[1].event), 'Approval', 'Event not emitted');

      })

    })
   

    describe("Burn functions", function(){

      it("After deletion of tokens, account balance and totalsupply should be updated", async function(){

        const numOfTokens=30;
        const callAccount = accounts[0];
        const balanceAccount = await token.balanceOf(accounts[0]);
        const tokenSupply = await token.totalSupply();
        state = await token.burn(numOfTokens);
        assert.isTrue((numOfTokens <= tokenSupply), 'Tokens to be deleted should be less than tokensupply');
        assert.equal((await token.totalSupply()), (tokenSupply-numOfTokens), "Total token supply count should be updated");
        assert.equal((await token.balanceOf(accounts[0])), (balanceAccount - numOfTokens), 'The intial account balance should be updated');
        assert.equal((state.logs[0].event), 'Transfer', 'Event not emitted');
      })

      it("BurnFrom function", async function(){

        const tokensToBeBurnt = 10;
        const initialTokens = await token.totalSupply();
        const intialTokenBalance = await token.balanceOf(accounts[0]);
        await token.approve(accounts[1], 100);
        const state = await token.burnFrom(accounts[0],tokensToBeBurnt,{from:accounts[1]});
        assert.isTrue((await token.balanceOf(accounts[0]) >= tokensToBeBurnt),"No enough tokens to burn");
        assert.equal((await token.totalSupply()),(initialTokens-tokensToBeBurnt) , 'Total supply not updated')
        assert.equal((await token.balanceOf(accounts[0])),(intialTokenBalance-tokensToBeBurnt),"Accounts[0] balance not updated");

      })

    })


    it("Minter Function", async function(){

        const numOfTokens=10;
        const addr = accounts[0];
        state = await token.mint(addr,numOfTokens);
        assert.equal(addr, accounts[0], 'Only owner can create ttokens');
        assert.equal((state.logs[0].event), 'Transfer', 'Event not emitted');
    })
})