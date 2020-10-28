import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import InputMask from 'react-input-mask';

class CreateLoanApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newLoanApp: {
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                ssn: '',
                credit_score: ''
            }
        }

        //Boilerplate code for binding methods with `this`
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    /* This method dynamically accepts inputs and stores it in the state */
    handleInput(key, e) {
        
        /*Duplicating and updating the state */
        var state = Object.assign({}, this.state.newLoanApp); 
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
        this.props.onAdd(this.state.newLoanApp);
        this.props.close();
    }

    render() {
        if (!this.props.show) {
            return null;
        } 
        return(
            <div className="loan-form"> 
                <h2> Create a new Loan Application </h2>
                <div className="text-center"> 
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="first-name"> First Name: </label>
                                <input id="first-name" className="form-control" type="text" onChange={(e)=>this.handleInput('first_name',e)} />
                            </div>
                            
                            <div className="form-group col-md-6">
                                <label> Last Name: </label>
                                <input id="last-name" className="form-control" type="text" onChange={(e)=>this.handleInput('last_name',e)} />
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="email"> Email: </label>
                                <input id="email" className="form-control" type="email" onChange={(e)=>this.handleInput('email',e)} />
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="phone"> Phone: </label>
                                <InputMask mask="999 999 9999" maskChar='' id="phone" className="form-control"  type="text" onChange={(e)=>this.handleInput('phone',e)} />  
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="ssn"> SSN: </label>
                                <input id="ssn" className="form-control" type="password" onChange={(e)=>this.handleInput('ssn',e)} />
                            </div>
                            
                            <div className="form-group col-md-6">
                                <label htmlFor="credit-score"> Credit Score: </label>
                                <input id="credit-score" className="form-control" type="text" onChange={(e)=>this.handleInput('credit_score',e)} />
                            </div>
                        </div>

                        <button className="btn secondary-cta mt-3">Submit</button>       
                    </form>
                </div>
            </div>
        )
    }

}

export default CreateLoanApp;