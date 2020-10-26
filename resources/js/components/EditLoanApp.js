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
        console.log(state);
        this.setState({newLoanApp: state });
    }

    /* This method is invoked when submit button is pressed */
    handleSubmit(e) {
        //preventDefault prevents page reload   
        e.preventDefault();
        /*A call back to the onAdd props. The current
        *state is passed as a param
        */
        console.log('submitting form', this.state.newLoanApp);
        this.props.onEdit(this.state.newLoanApp);
    }

    render() {
        if (!this.props.currentLoanApp) {
            return null;
        } else if (!this.props.show) {
            return null;
        }
        return(
            <div> 
                <div className="modal-wrapper">
                    <h2> Edit Loan Application </h2>
                    <div> 
                        <form onSubmit={this.handleSubmit}>
                            <label> First Name: 
                            { /*On every keystroke, the handeInput method is invoked */ }
                                <input type="text" placeholder={this.props.currentLoanApp.first_name} onChange={(e)=>this.handleInput('first_name',e)} />
                            </label>
                            
                            <label> Last Name: 
                                <input type="text" placeholder={this.props.currentLoanApp.last_name} onChange={(e)=>this.handleInput('last_name',e)} />
                            </label>

                            <label> Email: 
                                <input type="text" placeholder={this.props.currentLoanApp.email} onChange={(e)=>this.handleInput('email',e)} />
                            </label>

                            <label> Phone: 
                                <input type="text" placeholder={this.props.currentLoanApp.phone} onChange={(e)=>this.handleInput('phone',e)} />
                            </label>

                            <label> SSN: 
                                <input type="password" placeholder={this.props.currentLoanApp.ssn} onChange={(e)=>this.handleInput('ssn',e)} />
                            </label>

                            <label> Credit Score: 
                                <input type="text" placeholder={this.props.currentLoanApp.credit_score} onChange={(e)=>this.handleInput('credit_score',e)} />
                            </label>
                                            
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default EditLoanApp;