var TestArray = artifacts.require("./ArrayExample.sol");

contract("TestArray", function (accounts) {

  const indexval = 1;
  it("should return correct array length", async function () {
    const contract = await TestArray.deployed();
    const resultlength = await contract.getarraylength.call();


    console.log("result:"+resultlength);
    assert.notStrictEqual(resultlength, 0,'Passed');
    
  });

  it("should delete if present ", async function () {
    const contract = await TestArray.deployed();
    const result = await contract.delvalue.call(2);
    const resultlength = await contract.getarraylength.call();
    assert.isTrue(indexval>=0 && indexval<=resultlength-1);
  });
  
});