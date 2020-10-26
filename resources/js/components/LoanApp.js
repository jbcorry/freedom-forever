import React, { Component } from 'react';
 
/* Stateless component or pure component
 * { product } syntax is the object destructing
 */
const LoanApp = ({loanApp}) => {
 
  //if the props loan app is null, return loan application doesn't exist
  if(!loanApp) {
      return(<div>  Loan Application Doesnt exist </div>);
  }
     
  //Else, display the loan application data
    return(  
        <div> 
            <h2> Loan Application for: {loanApp.first_name} </h2>
            <label htmlFor="p#email">Email</label>
            <p id="email">{loanApp.email}</p>
            <label htmlFor="p#phone">Phone</label>
            <p id="phone">{loanApp.phone}</p>
            <label htmlFor="p#ssn">Last 4 of SSN</label>
            <p id="ssn">{loanApp.ssn}</p>
            <label htmlFor="p#credit-score">Credit Score: </label>
            <p id="credit-score">{loanApp.credit_score}</p>
        </div>
    )
}
 
export default LoanApp ;