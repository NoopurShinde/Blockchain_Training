pragma solidity ^0.5.0;

contract FloodReliefDonation {

   // STORAGE VARIABLES
   
    uint public totalContributors = 0; // TOTAL COUNT OF CONTRIBUTORS
    uint public raisedAmount = 0 ;    // AMOUNT RAISED
    address public admin;             // FUND OWNER
    uint id = 0;
    uint spendamt;
  
    struct donors{
       
        uint ID;
        string state;
        uint amt;
           
    }
   
    donors public Donor;

    constructor() public{
        admin = msg.sender;
    }
   
    mapping(address=>uint) contributions;
    
    mapping(string => uint) statedonationcount;
    
    mapping(string => uint) statecontributionst;
    
    event contributed(string statename, uint id);

    function contribute(string memory state, uint _amt) public payable {
       
        // CHECKING WHETHER THIS IS THE FIRST TIME THAT APERSON IS CONTRIBUTING TO THIS CAMPAIGN
       

        if(contributions[msg.sender] == 0)
        {
           
        // IF ITS HIS FIRST CONTRIBUTION WE NEED TO INCREMENT THE totalContributors STORAGE VARIABLE BY 1
            totalContributors++;
            Donor.state = state;
            Donor.amt = _amt;
            Donor.ID = id;
            id++;
        }
       
        // IF ITS NOT HIS/HER FIRST TIME CONTRIBUTING  THEN WE SIMPLY ADD THE AMOUNT SENT TO HIS/HER PREVIOUS CONTRIBUTION
        // AND THEN ALSO ADD THE AMOUNT SENT TO THE raisedAmount STORAGE VARIABLE
        contributions[msg.sender] += _amt;
       
        raisedAmount += _amt;
        //statedonation.states.push(state);
        statedonationcount[state] = statedonationcount[state]+1;
        statecontributionst[state] = statecontributionst[state] + _amt;

        emit contributed(Donor.state,Donor.ID);
    }
   
    function getContributorinfo(uint) public view returns(uint ID, string memory stateDOnated, uint Amt){
        return (Donor.ID,Donor.state,Donor.amt);
    }
    
    function getnumoffundcnt_state(string memory _state) public view returns(uint){
        return statedonationcount[_state];
    }
    
    function get_totalFunds(string memory _state) public view returns(uint){
        return statecontributionst[_state];
    }
    
    function chkspendings(string memory _state, uint  requiredAmt) public view returns(bool){
        require(statecontributionst[_state]>=requiredAmt,"Funds not used in a proper way");
    }
   

}
