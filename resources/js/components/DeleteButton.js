import React, { Component } from 'react';
 
const DeleteButton = ({currentLoanApp, deleteFunction}) => {
 
  //if the current loan app is null, don't show the delete button
  if(!currentLoanApp) {
      return null;
  }
     
  //Else, display the delete button
    return(  
        <button onClick={deleteFunction}>Delete Loan Application</button>
    )
}
 
export default DeleteButton ;