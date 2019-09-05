var TestToken = artifacts.require("./MyToken.sol");

contract("TestToken", function(accounts){

    const _name = "My Token";
    const _symbol = "MT";
    const _decimals = 18;

    beforeEach(async function(){

        this.token = await TestToken.new(_name, _symbol, _decimals);
       
    })

    it("Should return correct name", async function() {

        const contract = await TestToken.deployed();
        const name = await this.token.name();
        assert.equal(name, _name, "Name does not match");

    });

    it("Should return correct symbol", async function() {

        const contract = await TestToken.deployed();
        const symbol = await this.token.symbol();
        assert.equal(symbol,_symbol,"Decimal do not match")

    });

    it("Should return correct decimals", async function() {

        const contract = await TestToken.deployed();
        const decimals = await this.token.decimals();
        assert.equal(decimals,_decimals,"Decimal do not match")

    });

    const user1 = accounts[0];
    it("Should return balace", async function() {

        const contract = await TestToken.deployed();
       
        const updatedBalance = await TestToken.balanceOf(user1);
        console.log(updatedBalance);

    });
    

}

)