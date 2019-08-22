pragma solidity ^0.5.0;

contract FloodReliefDonation {

   // STORAGE VARIABLES
   
    uint public totalContributors;    // TOTAL COUNT OF CONTRIBUTORS
    uint public raisedAmount = 0 ;    // AMOUNT RAISED
    address public admin;             // PROJECT OWNER
    uint id=0;  
    uint public donationsTotal;
    
    struct StateforDonations{
        string[] states;
        
        uint totalcontri;
    }
    
  
    
    struct donars{
       
        uint ID;
        string state;
        uint amt;
           
    }
   
    donars public Donar;
   StateforDonations statedonation;
   
    constructor() public{
        admin = msg.sender;
    }
   
    mapping(address=>uint) public contributions;
    
    mapping(uint => StateforDonations) count;
    uint[] public instructorAccts;


    function contribute(string memory state, uint _amt) public payable {
       
        // CHECKING WHETHER THIS IS THE FIRST TIME THAT APERSON IS CONTRIBUTING TO THIS CAMPAIGN
       
        if(contributions[msg.sender] == 0)
        {
           
        // IF ITS HIS FIRST CONTRIBUTION WE NEED TO INCREMENT THE totalContributors STORAGE VARIABLE BY 1
            totalContributors++;
            Donar.state = state;
            Donar.amt = _amt;
            Donar.ID = id;
            id++;
        }
       
        // IF ITS NOT HIS/HER FIRST TIME CONTRIBUTING  THEN WE SIMPLY ADD THE AMOUNT SENT TO HIS/HER PREVIOUS CONTRIBUTION
        // AND THEN ALSO ADD THE AMOUNT SENT TO THE raisedAmount STORAGE VARIABLE
       
        contributions[msg.sender] += _amt;
       
        raisedAmount+= _amt;
        statedonation.states.push(state);
    }
   
    function getContributorinfo(uint _id) public view returns(string memory){
        return statedonation.states[_id];
    }

}
