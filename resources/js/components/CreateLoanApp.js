import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
        console.log('submitting form', this.state.newLoanApp);
        this.props.onAdd(this.state.newLoanApp);
    }

    render() {
         
        return(
            <div> 
                <h2> Create a new Loan Application </h2>
                <div> 
                    <form onSubmit={this.handleSubmit}>
                        <label> First Name: 
                        { /*On every keystroke, the handeInput method is invoked */ }
                            <input type="text" onChange={(e)=>this.handleInput('first_name',e)} />
                        </label>
                        
                        <label> Last Name: 
                            <input type="text" onChange={(e)=>this.handleInput('last_name',e)} />
                        </label>

                        <label> Email: 
                            <input type="text" onChange={(e)=>this.handleInput('email',e)} />
                        </label>

                        <label> Phone: 
                            <input type="text" onChange={(e)=>this.handleInput('phone',e)} />
                        </label>

                        <label> SSN: 
                            <input type="password" onChange={(e)=>this.handleInput('ssn',e)} />
                        </label>

                        <label> Credit Score: 
                            <input type="text" onChange={(e)=>this.handleInput('credit_score',e)} />
                        </label>
                                        
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }

}

export default CreateLoanApp;