const { expectRevert } = require('openzeppelin-test-helpers');
var testERC721 = artifacts.require("./Myerc721.sol");
var testContract = artifacts.require("./testContract.sol");
var testContract_V1 = artifacts.require("./testContract_V1.sol");

contract(testERC721, function (accounts) {

    var _name = "Test ERC721";
    var _symbol = "ERC721";
    var tokenURI = "ERC721 Example Token 1";
    let tokenId = 1, totalTokens = 1;
    let token, addressTo = accounts[0], testToken;

    beforeEach(async function () {

        token = await testERC721.new(_name, _symbol);
        await token.mintUniqueTokenTo(addressTo, tokenId, tokenURI);
        testToken = new web3.eth.Contract(testERC721.abi , token.address);
    })
  
  
        it("Should execute as expected", async function(){
            let token1, token2;
            token1 = await testContract.new()
            token2 = await testContract_V1.new();
            expectRevert(token.safeTransferFrom(accounts[0], token2.address, 1, {from:accounts[0]}), "ERC721: to address does not implement ERC721Received interface");
        })        
   

    describe("ERC721 Metadata", function () {

        it("Should return correct name", async function () {

            assert.equal((await token.name()), _name, "Token name not returned as expected");

        })

        it("Should return correct symbol", async function () {

            assert.equal((await token.symbol()), _symbol, "Token symbol not returned as expected");

        })

        it("URI function", async function () {

            assert.equal((await token.tokenURI(1)), tokenURI, 'Token URI different from what is set');
            expectRevert(token.tokenURI(2), "ERC721Metadata: URI query for nonexistent token");
            expectRevert(token.testSetTokenURI(3, "No such token exists"), 'ERC721Metadata: URI set of nonexistent token')

        })

    })

    describe("ERC721", function () {

        it("Returns Balance of account", async function () {
            await token.mintUniqueTokenTo(accounts[0], 2, "Token 2");
            assert.equal((await token.balanceOf(accounts[0])), 2, "Token balance not updated")
        })

        it("Exception if token already minted", async function () {
            expectRevert(token.mintUniqueTokenTo(accounts[2], 1, "Test token"), 'ERC721: token already minted');
        })

        it("Should return the correct owner", async function () {
            assert.equal((await token.ownerOf(1)), accounts[0], "Correct owner not returned")
        })

        it("Approve function", async function () {

            expectRevert(token.approve(accounts[0], 1), "ERC721: approval to current owner");
            await token.approve(accounts[1], 1, { from: accounts[0] });
            assert.equal((await token.getApproved(1)), accounts[1], "Approval not updated");
            expectRevert(token.approve(accounts[2], 1, { from: accounts[3] }), "ERC721: approve caller is not owner nor approved for all");

        })

        it("getApproved", async function () {
            await token.approve(accounts[1], 1, { from: accounts[0] });
            expectRevert(token.getApproved(2), "ERC721: approved query for nonexistent token");
        })

        it("setApprovalForAll", async function () {
            await token.setApprovalForAll(accounts[2], true, { from: accounts[0] });
            assert.isTrue((await token.isApprovedForAll(accounts[0], accounts[2])), "ApprovalForAll not set for all");
            expectRevert(token.setApprovalForAll(accounts[2], true, { from: accounts[2] }), "ERC721: approve to caller")
        })

        it("TransferFrom", async function () {
            await token.approve(accounts[1], 1, { from: accounts[0] });
            await token.transferFrom(accounts[0], accounts[2], 1);
            assert.equal((await token.ownerOf(1)), accounts[2], "Ownership not transferred");
            expectRevert(token.transferFrom(accounts[0], accounts[1], 1, { from: accounts[5] }), "ERC721: transfer caller is not owner nor approved");
            expectRevert(token.transferFrom(accounts[0], accounts[2], 10), 'ERC721: operator query for nonexistent token');
            expectRevert(token.transferFrom(accounts[0], accounts[4], 1, { from: accounts[2] }), "ERC721: transfer of token that is not own");
            expectRevert(token.transferFrom(accounts[2], '0x0000000000000000000000000000000000000000', 1, { from: accounts[2] }), "ERC721: transfer to the zero address");

        })

        it("SafeTransferFrom", async function () {
            await token.safeTransferFrom(accounts[0], accounts[2], 1);

            //  expectRevert(token.safeTransferFrom(accounts[0],"0xA01e32D428351a356a28E7c7343457FFb044745A",2), "");
            // expectRevert(token.safeTransferFrom(accounts[1],accounts[2],1), "ERC721: transfer of token that is not own" );
            assert.equal((await token.ownerOf(1)), accounts[2], "Ownership not Safetransferred");

        })

        it("OnCheckERC721Received If", async function () {
            //await token.mintUniqueTokenTo(accounts[0],2,"");
            await token.safeTransferFrom(accounts[0], "0xA01e32D428351a356a28E7c7343457FFb044745A", 1), { from: accounts[0] };
           //await token.safeTransferFrom(accounts[0], "0x016f36D215788EE28cbA5eA09A656F2902D421a4", 2),{from:accounts[0]};
        })

        it("OnCheckERC721Received else", async function () {
            await token.mintUniqueTokenTo(accounts[0],2,"");
           // await token.safeTransferFrom(accounts[0], "0xA01e32D428351a356a28E7c7343457FFb044745A", 1), { from: accounts[0] };
        //expectRevert(token.safeTransferFrom(accounts[0],'0x016f36D215788EE28cbA5eA09A656F2902D421a4',2,{from:accounts[0]}), "ERC721: transfer to non ERC721Receiver implementer")
            await token.safeTransferFrom(accounts[0],'0x016f36D215788EE28cbA5eA09A656F2902D421a4',2,{from:accounts[0]});
        })

        it("owner Of", async function () {
            expectRevert((token.ownerOf(4)), "ERC721: owner query for nonexistent token")
        })



    })

    describe("Burnable function", async function () {

        it("burn function", async function () {
            await token.mintUniqueTokenTo(accounts[1], 2, "Example Token 2");
            await token.mintUniqueTokenTo(accounts[1], 3, "");
            await token.mintUniqueTokenTo(accounts[1], 4, "Example Token 4");
            await token.burn(2, { from: accounts[1] });
            await token.burn(3, { from: accounts[1] });
            assert.equal((await token.totalSupply()), 2, 'Token not burnt');
            expectRevert(token.testInternalBurn(accounts[2], 1), "ERC721: burn of token that is not own");
            expectRevert(token.burn(1, { from: accounts[9] }), "ERC721Burnable: caller is not owner nor approved")
        })


    })

    describe("Enumerable function", async function () {

        it("tokenOfOwnerByIndex", async function () {
            assert.equal((await token.tokenOfOwnerByIndex(accounts[0], 0)), 1, 'Correct token should be fetched');
            expectRevert(token.tokenOfOwnerByIndex(accounts[0], 1), 'ERC721Enumerable: owner index out of bounds');
        })

        it("tokenByIndex", async function () {
            await token.mintUniqueTokenTo(accounts[2], 2, "Example token");
            assert.equal((await token.tokenByIndex(1)), 2, 'Correct token should be fetched');
            expectRevert(token.tokenByIndex(3), 'ERC721Enumerable: global index out of bounds')
        })

        it("testtokensOfOwner function", async function () {

            await token.testtokensOfOwner(accounts[0]);
            assert.equal((await token.balanceOf(accounts[0])), 2, "Total number of tokens of accounts[0] not returned");
        })


    })

    describe("Account should not be zero address", function () {

        it("Mint function", async function () {
            expectRevert(token.mintUniqueTokenTo('0x0000000000000000000000000000000000000000', 12, "Test token"), 'ERC721: mint to the zero address');
        })

        it("BalanceOf function", async function () {
            expectRevert(token.balanceOf('0x0000000000000000000000000000000000000000'), 'ERC721: balance query for the zero address')
        })

        it("OwnerOf", async function () {

        })
    })

    describe("ERC165 ", async function () {

        it("Supports Interface", async function () {
            await token.testRegisterInterface('0x80ac58cd');
            assert.equal((await token.supportsInterface('0x80ac58cd')), true, "Interface not supported");
            //expectRevert((await token.testRegisterInterface('0xffffffff')), 'ERC165: invalid interface id');
        })

        it("Register Interface ", async function(){
            expectRevert(token.testRegisterInterface('0xffffffff'), 'ERC165: invalid interface id');
        })

    })

})