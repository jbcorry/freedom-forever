import React, { Component } from 'react';

import CreateLoanApp from './CreateLoanApp';
import DeleteButton from './DeleteButton';
import EditLoanApp from './EditLoanApp';
 
/* Stateless component or pure component
 * { product } syntax is the object destructing
 */

 

class LoanApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowing: false,
      updateIsShowing: false,
    };

    //Boilerplate code for binding methods with `this`
    this.openModalHandler = this.openModalHandler.bind(this);
    this.closeModalHandler = this.closeModalHandler.bind(this);
    this.openUpdateModalHandler = this.openUpdateModalHandler.bind(this);
    this.closeUpdateModalHandler = this.closeUpdateModalHandler.bind(this);
  }

  openModalHandler() {
      console.log('show');
      this.setState({
          isShowing: true
      });
  }

  closeModalHandler() {
      this.setState({
          isShowing: false
      });
  }

  openUpdateModalHandler() {
    console.log('showing update');
    this.setState({
        updateIsShowing: true
    });
  }

  closeUpdateModalHandler() {
      this.setState({
          updateIsShowing: false
      });
  }
  render() {
    //if the props loan app is null, return loan application doesn't exist
    let currentLoanApp = {first_name:'',last_name:'',ssn:'',email:'',phone:'',credit_score:''};
    if (this.props.currentLoanApp) {
        currentLoanApp = this.props.currentLoanApp;
    }
    if(!this.props.currentLoanApp) {
      return(
        <div className="loan-app-info text-center">
          <h4>
            View, edit, or delete a Loan Application <br className="d-none d-md-block"/>by selecting one from the list.
          </h4> 

          <h5 className="mt-5">
            ...Or click this button to create a new Loan Application
          </h5>
          <button className="btn main-cta mt-3 open-modal-btn" onClick={ this.openModalHandler }>Create a New Loan Application</button>
          <CreateLoanApp 
            className="modal" 
            show={this.state.isShowing}
            close={this.closeModalHandler}
            onAdd={ this.props.handleAddLoanApp } />
        </div>
      );
    }
    //Else, display the loan application data
    return(  
      <div className="loan-app-info"> 
        <h4 className="green">{this.props.currentLoanApp.first_name} {this.props.currentLoanApp.last_name}'s Loan Application Info </h4>
        <div className="info-group">
          <label>First Name</label>
          <p>{this.props.currentLoanApp.first_name}</p>
        </div>
        <div className="info-group">
          <label>Last Name</label>
          <p>{this.props.currentLoanApp.last_name}</p>
        </div>
        <div className="info-group">
          <label>Email</label>
          <p>{this.props.currentLoanApp.email}</p>
        </div>
        <div className="info-group">
          <label>Phone</label>
          <p>{this.props.currentLoanApp.phone}</p>
        </div>
        <div className="info-group">
          <label>Last 4 of SSN</label>
          <p id="ssn">{this.props.currentLoanApp.ssn}</p>
        </div>
        <div className="info-group">
          <label>Credit Score </label>
          <p id="credit-score">{this.props.currentLoanApp.credit_score}</p>  
        </div>

        <div className="button-group text-center">
          <button className="btn main-cta mt-3 col-md-5" onClick={this.props.handleDelete}>Delete Loan Application</button>
          <button className="btn main-cta mt-3 open-modal-btn col-md-5 offset-md-1" onClick={this.openUpdateModalHandler}>Edit Loan App</button>
        </div>

        

        <EditLoanApp 
          className="modal" 
          show={this.state.updateIsShowing}
          close={this.closeUpdateModalHandler}
          onEdit={ this.props.handleUpdate } 
          currentLoanApp={ this.props.currentLoanApp } />

        <div className="add-loan-app text-center">
          <button className="btn secondary-cta mt-3 open-modal-btn" onClick={ this.openModalHandler }>Create a New Loan Application</button>
          <CreateLoanApp 
            className="modal" 
            show={this.state.isShowing}
            close={this.closeModalHandler}
            onAdd={ this.props.handleAddLoanApp } />
        </div>
      </div>
    )
  }
    
}
  
export default LoanApp ;