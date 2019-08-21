pragma solidity ^0.5.0;

contract Example1{
    
    uint[] arr1 = [1,2,3];
    
    function getarraylength() public view returns(uint){
        
        return arr1.length;
    }
    
    function setarray(uint element) public{
        arr1.push(element);
    }
    
    function removelastelement() public{
     
        arr1.pop();
    }
    
    function delvalue(uint index) public{
        assert(index<=arr1.length);
        delete arr1[index];
        arr1.length-=1;
    }
}
