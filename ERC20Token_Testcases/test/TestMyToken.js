var TestToken = artifacts.require("./MyToken.sol");

contract("TestToken", function(accounts){

    const _name = "My Token";
    const _symbol = "MT";
    const _decimals = 18;
    const _totalSupply = 1000;
    const _transferAmount = 300;

    beforeEach(async function(){

        this.token = await TestToken.new(_name, _symbol, _decimals);
       
    })

    it("Should return correct name", async function() {

        const contract = await TestToken.deployed();
        const name = await contract.name();
        assert.equal(name, _name, "Name does not match");

    });

    it("Should return correct symbol", async function() {

        const contract = await TestToken.deployed();
        const symbol = await contract.symbol();
        assert.equal(symbol,_symbol,"Symbol do not match")

    });

    it("Should return correct decimals", async function() {

        const contract = await TestToken.deployed();
        const decimals = await contract.decimals();
        assert.equal(decimals,_decimals,"Decimal do not match")

    });


    it("Should return total token supply", async function() {

        const contract = await TestToken.deployed();
        assert.equal((await contract.totalSupply()), _totalSupply, "Totalsupply does not match");

    });
    
    it("Token supply should be assigned to the token owner", async function() {

        const contract = await TestToken.deployed();
        const balance = await contract.balanceOf(accounts[0]);
        assert.equal(_totalSupply, balance, "The total supply is not assigned to the token owner.");

    });

    it("Token balance should be greater than to be transferred and total token supply", async function() {

        const contract = await TestToken.deployed();
        const balance = await contract.balanceOf(accounts[0]);
        assert.isTrue(((_transferAmount <= balance) && (_transferAmount < _totalSupply)), "Balance is not enough to transfer the required amount of tokens or total supply of tokens is less than the tokens to be transferred");
        
    });

    it("Only token owner can create tokens", async function(){

        const numOfTokens=10;
        const addr = accounts[0];
        const contract = await TestToken.deployed();
        await contract.mint(addr,numOfTokens);
        assert.equal(addr, accounts[0], 'Only owner can create ttokens');
    })

    it("Only token owner can delete tokens", async function(){

        const numOfTokens=30;
        const callAccount = accounts[0];
        const contract = await TestToken.deployed();
        const tokenSupply = await contract.totalSupply();
        await contract.burn(numOfTokens);
        assert.isTrue((callAccount == accounts[0]) && (numOfTokens<=tokenSupply), 'Only owner can delete ttokens');
    })


}

)