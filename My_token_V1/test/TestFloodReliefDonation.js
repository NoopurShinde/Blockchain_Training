var testFlood = artifacts.require("./FloodReliefDonation.sol");

contract ("TestFlood",function(accounts){

    const user1 = accounts[0];
    const user2 = accounts[1];
    let state;

    it(("Contribute: New vote should be added"), async() =>
    {
        const testfloodrelief = await testFlood.deployed();
        const name = "MAH";
        const amt = 10;
        const raisedamount = 0;
        state = await testfloodrelief.contribute(name, amt);
        assert.notEqual(amt, 0, "Fail");
        const info = await testfloodrelief.getContributorinfo(user2);
        assert.equal(info[0],0,'Id not updated');
        assert.equal(info[1],name,'Contributor name not same');
        assert.equal(info[2],amt,'Amount donated and amount updated do not match');
        assert.equal((await testfloodrelief.raisedAmount.call()), (Number(raisedamount)+Number(amt)));
        assert.equal(state.logs[0].event, "contributed", 'Contributed event should be emitted');

        const updatedStateCount = await testfloodrelief.getnumoffundcnt_state(name);
        assert.equal(updatedStateCount, 1, "Number of donors for state not updated");

        let updatedstateDonation=0;
        assert.equal((await testfloodrelief.get_totalFunds(name)), (Number(updatedstateDonation)+Number(amt)), "Donations not updated for state");
    })


    it(("chkspendings: Check funds utilization"), async() =>
    {
        const testfloodrelief = await testFlood.deployed();
        const name = "MAH";
        const receivedFunds = await testfloodrelief.get_totalFunds(name);

        assert.isTrue(((await testfloodrelief.chkspendings(name, 5)) < receivedFunds), 'Funds should be properly utilized');

    })
    
})