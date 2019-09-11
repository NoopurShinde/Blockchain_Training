var HelloWorld = artifacts.require("./HelloWorld.sol");

contract("HelloWorld", function (accounts) {
  it("Should return a correct string", async function () {
    const contract = await HelloWorld.deployed();
    const result = await contract.getstring.call();
    assert.equal(result, "Hello World!!", 'Expected and set strings do not match');
  });

  it("Should set correct string", async function () {
    const contract = await HelloWorld.deployed();
    const stringtobeSet = "Hello World!!";
    const setString = await contract.setstring(stringtobeSet);
    assert.equal((await contract.getstring.call()), stringtobeSet, 'String not set');
  });
});