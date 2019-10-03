const testMultiSig = artifacts.require("./gnosisWallet.sol");
const Web3 = require("web3");
const { expectRevert } = require('openzeppelin-test-helpers');
let wallet,contractTest, ERC20Test;

contract.only('testMultiSig test suite', function(accounts){
   
     beforeEach(async function () {
        wallet = await testMultiSig.new([accounts[0], accounts[1]], 2, {from: accounts[0]});
        contractTest = new web3.eth.Contract(testMultiSig.abi , wallet.address);
     })


     describe("ERC20 function", function(){

        it("Trasnfer function", async function() {
            const transferData = "0xa9059cbb000000000000000000000000d81a73fc640bf3387abbb2ace1ef87d367653ded000000000000000000000000000000000000000000000000000000000000000a";
            await wallet.submitTransaction("0xC0aC50dc5982394d01CCeC30e91407A33D42eA85", 0, transferData);
            await wallet.confirmTransaction(0, {from:accounts[1]})
        })

  })

    describe("Constructor and Fallback function", function(){

        it("deploy and get wallet address", async function() {
            wallet = await testMultiSig.new([accounts[2]], 1);
        })

        it("Fallback function", async function(){
            const eventFallBack = await wallet.sendTransaction({from:accounts[0], value:10});
            assert.equal((eventFallBack.logs[0].event), "Deposit", "Event Deposit not emitted")
            await wallet.sendTransaction({from:accounts[0], value:0})
        })
  })

    describe("Transactions", function(){

        it("Add owner Transaction", async function(){
            //let encodedFunctionSignature = web3.eth.abi.encodeFunctionSignature('addOwner(address)');
            //console.log("++++++++++++"+encodedFunctionSignature);
            //console.log(">>>>>>>>"+wallet.address);
            // const fs = require('fs');
            // const contractabi = JSON.parse(fs.readFileSync('./build/contracts/gnosisWallet.json', 'utf8'));
            // var contract = new web3.eth.Contract(contractabi.abi , wallet.address);
            // console.log("<<<<<"+JSON.stringify(contractabi.abi));
            var addOwnerData = contractTest.methods.addOwner(accounts[2]).encodeABI();
            //console.log("????"+callData);
            //console.log(await wallet.isOwner(accounts[1]));
            const eventAddOwner = await wallet.submitTransaction(wallet.address, 0, addOwnerData);
            assert.equal((eventAddOwner.logs[0].event), "Submission", "Submission event not emitted")
            assert.equal((eventAddOwner.logs[1].event), "Confirmation", "Confirmation event not emitted")
            assert.equal((await wallet.getTransactionCount(true, false)),1, "Transaction is not yet confirmed by both the owners");
            //console.log(await wallet.getConfirmationCount.call(0))
            assert.equal((await wallet.getConfirmationCount.call(0)), 1, "Only one owner who is calling this function has confirmed the transaction");
            const eventConfirmTransaction = await wallet.confirmTransaction(0, {from:accounts[1]});
            assert.equal(eventConfirmTransaction.logs[0].event, "Confirmation", "Confirmation event not emitted for addOwner fucntion");  
            expectRevert((wallet.revokeConfirmation(0, {from:accounts[0]})), "Transaction has been executed");
            assert.equal((await wallet.getTransactionCount(true, true)),1, "Transaction should be confimred by both the owners and then executed");
            assert.equal((await wallet.getTransactionCount(true, false)), 0, "Transactions which are pending and not yet executed should be returned");var callDataDemo = contractTest.methods.addOwner(accounts[0]).encodeABI();
            await wallet.submitTransaction(wallet.address, 0, addOwnerData);
            await wallet.confirmTransaction(1, {from:accounts[1]});
            const eventExecutionFailure = await wallet.executeTransaction(1);
            assert.equal(eventExecutionFailure.logs[0].event, "ExecutionFailure", "ExecutionFailure event should be emitted")
        })
        
        it("Revert function for modifiers", async function(){
            expectRevert(testMultiSig.new([accounts[0], accounts[1]], 4, {from: accounts[0]}), "Requirement should be changed");
            expectRevert(testMultiSig.new([accounts[0], '0x0000000000000000000000000000000000000000'], 2, {from: accounts[0]}), "Owner address should not be zero address");
            var callData = contractTest.methods.addOwner(accounts[1]).encodeABI();
            await wallet.submitTransaction(wallet.address, 0, callData);
            expectRevert((wallet.confirmTransaction(1, {from: accounts[1]})), "Transaction does not exists");
            expectRevert((wallet.revokeConfirmation(0, {from:accounts[2]})), "Owner does not exist");
            expectRevert((wallet.revokeConfirmation(0, {from:accounts[1]})), "Transaction not confirmed by msg.sender");
            expectRevert((wallet.confirmTransaction(0, {from: accounts[0]})), "Transaction already confirmed by msg.sender");
            var callDataAdress = contractTest.methods.addOwner(accounts[1]).encodeABI();
            expectRevert((wallet.submitTransaction('0x0000000000000000000000000000000000000000', 0, callData)), "Null address received");  
            expectRevert((wallet.addOwner(accounts[2], {from:accounts[0]})), "Not a wallet address");       
        })

        it("Remove Owner Function", async function(){
            var callData = contractTest.methods.addOwner(accounts[2]).encodeABI();
            await wallet.submitTransaction(wallet.address, 0, callData, {from:accounts[0]});
            await wallet.confirmTransaction(0, {from:accounts[1]});
            var removeOwnerCallData = contractTest.methods.removeOwner(accounts[2]).encodeABI();
            await wallet.submitTransaction(wallet.address, 0, removeOwnerCallData, {from:accounts[1]});
            const eventRemoveOwner = await wallet.confirmTransaction(1, {from:accounts[0]});
            assert.equal(eventRemoveOwner.logs[2].event, "Execution", "Execution event not emitted for removeOwner function");
            assert.equal(eventRemoveOwner.logs[1].event, "OwnerRemoval", "OwnerRemoval event not emitted for removeOwner function");
            assert.equal(eventRemoveOwner.logs[0].event, "Confirmation", "Confirmation event not emitted removeOwner function");
            var removeOwner0CallData = contractTest.methods.removeOwner(accounts[0]).encodeABI();
            await wallet.submitTransaction(wallet.address, 0, removeOwner0CallData, {from:accounts[1]});
            await wallet.confirmTransaction(2, {from:accounts[0]});
            assert.equal((await wallet.getTransactionIds(0,1, true, true)),0, "TransactionIDs not returned as expected");
            assert.equal((await wallet.getTransactionIds(0,1, true, false)), 0, "TransactionIDs for pending and not executed transactions should be returned")
        })

        it("Replace Owner function", async function(){
            var expectedOwner = [accounts[0], accounts[2]];
            var replaceOwnerCallData = contractTest.methods.replaceOwner(accounts[1], accounts[2]).encodeABI();
            await wallet.submitTransaction(wallet.address, 0, replaceOwnerCallData, {from:accounts[1]});
            const eventReplaceOWner = await wallet.confirmTransaction(0, {from:accounts[0]});
            assert.equal(eventReplaceOWner.logs[0].event, "Confirmation", "Confirmation event not emitted for replaceOwner function");
            assert.equal(eventReplaceOWner.logs[1].event, "OwnerRemoval", "OwnerRemoval event not emitted for replaceOwner function");
            assert.equal(eventReplaceOWner.logs[2].event, "OwnerAddition", "OwnerAddtion event not emitted for replaceOwner function");
            assert.equal(eventReplaceOWner.logs[3].event, "Execution", "Execution event not emitted for replaceOwner function");
            var actualOwner = await wallet.getOwners.call();
            assert.isTrue((actualOwner[0] == expectedOwner[0]) && (actualOwner[1] == expectedOwner[1]), "Account 1 not replaced with account 2")
        })

        it("Revoke confirmation", async function(){
            var replaceOwnerCallData = contractTest.methods.replaceOwner(accounts[1], accounts[2]).encodeABI();
            await wallet.submitTransaction(wallet.address, 0, replaceOwnerCallData, {from:accounts[0]});
            assert.equal((await wallet.getConfirmations(0)), accounts[0], "Transaction not confirmed by accounts[0]");
            const eventReplaceOwner = await wallet.revokeConfirmation(0, {from:accounts[0]});
            assert.equal(eventReplaceOwner.logs[0].event, "Revocation", "Revocation event not emitted for revoke confrimation function"       );
        })

        it("Change requirement function", async function(){
            var changeRequirementData = contractTest.methods.changeRequirement(1).encodeABI();
            await wallet.submitTransaction(wallet.address, 0, changeRequirementData, {from:accounts[0]});
            const eventChangeRequirement = await wallet.confirmTransaction(0, {from:accounts[1]});
            assert.equal(eventChangeRequirement.logs[0].event, "Confirmation", "Confirmation event not emitted for changeREquirement function");
            assert.equal(eventChangeRequirement.logs[1].event, "RequirementChange", "RequirementChange event not emitted for changeREquirement function");
            assert.equal(eventChangeRequirement.logs[2].event, "Execution", "Execution event not emitted for changeREquirement function");
            assert.equal((await wallet.required()), 1, "Requirement not updated");
        })

        it("Message sender function", async function(){
            const messageSender = await wallet.msgsender({from:accounts[0]});
            assert.equal(messageSender, accounts[0], "Correct message sender not returned")
        })

    })   

})

