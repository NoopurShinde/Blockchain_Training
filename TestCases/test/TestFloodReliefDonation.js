var testFlood = artifacts.require("./FloodReliefDonation.sol");

contract ("TestFlood",function(accounts){

    const user1 = accounts[0];
    const user2 = accounts[1];

    it(("New vote should be added"), async() =>
    {
        const testfloodrelief = await testFlood.deployed();
        const name = "MAH";
        const amt = 10;
        
        await testfloodrelief.contribute(name, amt);
        assert.notEqual(amt, 0, "Fail");
        const info = await testfloodrelief.getContributorinfo(user2);
        assert.equal(info[0],0,'Pass1');
        assert.equal(info[1],name,'Pass2');
        assert.equal(info[2],amt,'Pass3');
    })
})