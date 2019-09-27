var testMultiSig = artifacts.require("./MultiSigWallet.sol");
const Web3 = require("web3");
const { expectRevert } = require('openzeppelin-test-helpers');
let wallet

contract.only('testMultiSig test suite', function(accounts){
   // var Auction = artifacts.require(“Auction”);
    module.exports = function(deployer) {
      deployer.deploy(testMultiSig);
    };
    // beforeEach(async function () {
    //     wallet = await testMultiSig.new([accounts[0], accounts[1]], 2, {from: accounts[0], gas: 6721975});
    // })

    describe("constructor", function(){

        it("address should not be a zero address", async function(){
            expectRevert(testMultiSig.new(['0x0000000000000000000000000000000000000000'], 1), "Null address received");
        })

        it("deploy and get walle address", async function() {
            await testMultiSig.new([accounts[0], accounts[1]], 2, {from: accounts[0], gas: 6721975});
        })
    })

    describe("Transactions", function(){
        
        it("Submit Transaction", async function(){
        
        let encodedFunctionSignature = web3.eth.abi.encodeFunctionSignature('addOwner(address)');
        console.log("++++++++++++"+encodedFunctionSignature);
            
            // await wallet.submitTransaction(accounts[2], 10, "0x", {from:accounts[0]});
            // assert.equal(await wallet.getTransactionCount(true, false),1,"Fail");
            // console.log(await wallet.get)
            // await wallet.isConfirmed("0x4e8e6869fc163864be439c1164494b048d3ee117593f97d21080ae6b58c53e2a");
            // assert.equal();
             expectRevert(testMultiSig.new([accounts[0],accounts[1]], 2),"");
            console.log(">>>>>>>>"+wallet.address);
        const fs = require('fs');
        const contractabi = JSON.parse(fs.readFileSync('./build/contracts/gnosisWallet.json', 'utf8'));
        var contract = new web3.eth.Contract(contractabi.abi , wallet.address);
        // console.log("<<<<<"+JSON.stringify(contractabi.abi));
        var callData = contract.methods.addOwner(accounts[2]).encodeABI();
        console.log("????"+callData);
        await wallet.submitTransaction(wallet.address, 0, callData);
        //console.log(await wallet.getTransactionCount(false, true));
        //await wallet.submitTransaction(wallet.address, 0 , callData);
        //console.log(JSON.stringify(contractabi.abi));
        //var contract = web3.eth.contract(contractabi.abi).at(contractAddress);
        })
        
        
    })

//    describe("Owner", function(){
        
//         it("Should add specified owner",async function(){
           
//             //await wallet.addOwner(accounts[3]);
//             assert.equal((await wallet.isOwner(accounts[3])), true, "Owner is not added")
//             //expectRevert((wallet.addOwner(accounts[1])), "Owner exists")          
            
//         })

//         it("Should remove specifed owner", async function(){
//             //await wallet.addOwner(accounts[3]);
//             await wallet.removeOwner(accounts[3]);
//             assert.equal((await wallet.isOwner(accounts[3])), false, "Owner is not removed")
//             expectRevert((wallet.removeOwner(accounts[3])), "Owner does not exist")
//         })


//         it("Should replace specifed owner", async function(){
//             //await wallet.addOwner(accounts[3]);
//             await wallet.replaceOwner(accounts[3], accounts[4]);
//             assert.equal((await wallet.isOwner(accounts[3])), false, "Owner 3 is not removed")
//             assert.equal((await wallet.isOwner(accounts[4])), true, "Owner 4 is replaced owner")
//         })
       
//     })

   

})

