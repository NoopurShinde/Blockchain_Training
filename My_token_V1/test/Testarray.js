var TestArray = artifacts.require("./ArrayExample.sol");


contract("TestArray", function (accounts) {

  const indexval = 1;
  it("should return correct array length", async function () {
    const contract = await TestArray.deployed();
    const resultlength = await contract.getarraylength.call();
     assert.notStrictEqual(resultlength, 0,'Passed');
    
  });

  it("should delete if present ", async function () {
    
    const contract = await TestArray.deployed();
    const result = await contract.delvalue.call(2);
    const resultlength = await contract.getarraylength.call();
    assert.isTrue((indexval>=0 && indexval<=resultlength-1), "Array does not contain any element");
    

  });


  it("SetArray", async function () {
    const contract = await TestArray.deployed();
    const elementToBeAdded = 20;
    const initialresultlength = await contract.getarraylength.call();
    await contract.setarray(elementToBeAdded);
    const resultlength = await contract.getarraylength.call();
    assert.equal(resultlength, (Number(initialresultlength)+Number(1)), "Element not added in array");
  });


  it("RemoveLastElement", async function () {
    const contract = await TestArray.deployed();
    const initialresultlength = await contract.getarraylength.call();
    await contract.removelastelement();
    const resultlength = await contract.getarraylength.call();
    assert.equal(resultlength, (initialresultlength - 1), "Element not removed from array");
   

  });


  
});