var HelloWorld = artifacts.require("./HelloWorld.sol");

contract("HelloWorld", function (accounts) {
  it("Should return a correct string", async function () {
    const contract = await HelloWorld.deployed();
    const result = await contract.getstring.call();
    assert.equal(result, "Hello World!!", 'Expected and set strings do not match');
  });
});