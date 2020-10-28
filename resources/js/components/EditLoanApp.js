import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class EditLoanApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newLoanApp: {
                ...props.currentLoanApp
            }
        }

        //Boilerplate code for binding methods with `this`
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

      /* This method dynamically accepts inputs and stores it in the state */
    handleInput(key, e) {
        /*Duplicating and updating the state */

        let state = this.props.currentLoanApp; 
        state[key] = e.target.value;
        this.setState({newLoanApp: state });
    }

    /* This method is invoked when submit button is pressed */
    handleSubmit(e) {
        //preventDefault prevents page reload   
        e.preventDefault();
        /*A call back to the onAdd props. The current
        *state is passed as a param
        */
        this.props.onEdit(this.state.newLoanApp);
        this.props.close();
    }

    render() {
        if (!this.props.currentLoanApp) {
            return null;
        } else if (!this.props.show) {
            return null;
        }
        return(
            <div className="loan-form"> 
                <div className="text-center"> 
                <h2> Edit Loan Application </h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="first-name"> First Name: </label>
                                <input id="first-name" placeholder={this.props.currentLoanApp.first_name} className="form-control" type="text" onChange={(e)=>this.handleInput('first_name',e)} />
                            </div>
                            
                            <div className="form-group col-md-6">
                                <label> Last Name: </label>
                                <input id="last-name" placeholder={this.props.currentLoanApp.last_name} className="form-control" type="text" onChange={(e)=>this.handleInput('last_name',e)} />
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="email"> Email: </label>
                                <input id="email" placeholder={this.props.currentLoanApp.email} className="form-control" type="text" onChange={(e)=>this.handleInput('email',e)} />
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="phone"> Phone: </label>
                                <input id="phone" placeholder={this.props.currentLoanApp.phone} className="form-control" type="text" onChange={(e)=>this.handleInput('phone',e)} />  
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="ssn"> SSN: </label>
                                <input id="ssn" placeholder={this.props.currentLoanApp.ssn} className="form-control" type="password" onChange={(e)=>this.handleInput('ssn',e)} />
                            </div>
                            
                            <div className="form-group col-md-6">
                                <label htmlFor="credit-score"> Credit Score: </label>
                                <input id="credit-score" placeholder={this.props.currentLoanApp.credit_score} className="form-control" type="text" onChange={(e)=>this.handleInput('credit_score',e)} />
                            </div>
                        </div>

                        <button className="btn secondary-cta mt-3">Submit</button>       
                    </form>
                </div>
            </div>
        )
    }

}

export default EditLoanApp;