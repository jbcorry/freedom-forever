import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import CreateLoanApp from './CreateLoanApp';
import DeleteButton from './DeleteButton';
import EditLoanApp from './EditLoanApp';
import LoanApp from './LoanApp';
 
/* Main Component */
class Main extends Component {
 
    constructor() {
    
        super();
        //Initialize the state
        this.state = {
            loanApps: [],
            currentLoanApp: null,
            isShowing: false
        }

        this.handleAddLoanApp = this.handleAddLoanApp.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.openModalHandler = this.openModalHandler.bind(this);
        this.closeModalHandler = this.closeModalHandler.bind(this);
    }
    componentDidMount() {
        // get info from API
        fetch('/api/loan-apps')
            .then(response => {
                return response.json();
            })
            .then(loanApps => {
                // Fetched loan app is stored in the state
                this.setState({ loanApps });
            });
    }
 
    renderLoanApps() {
        return this.state.loanApps.map(loanApp => {
            return (
                <li key={loanApp.id} onClick={ () => this.handleClick(loanApp) }>
                    { loanApp.first_name } { loanApp.last_name } 
                </li>      
            );
        })
    }

    handleClick(loanApp) {
        this.setState({
            currentLoanApp: loanApp
        });
    }

    handleAddLoanApp(loanApp) {
     
        /*Fetch API for post request */
        fetch( 'https://freedom-forever.herokuapp.com/api/loan-apps/', {
            method:'post',
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify(loanApp)
        })
        .then(response => {
            return response.json();
        })
        .then( data => {
            //update the state of loanApps and currentLoanApp
            this.setState((prevState)=> ({
                loanApps: prevState.loanApps.concat(data),
                currentLoanApp : data
            }))
        })
    
    }

    handleDelete() {
        const currentLoanApp = this.state.currentLoanApp;
        fetch( 'api/loan-apps/' + this.state.currentLoanApp.id, 
            { method: 'delete' })
            .then(response => {
              /* Duplicate the array and filter out the item to be deleted */
              var array = this.state.loanApps.filter(function(item) {
              return item !== currentLoanApp
            });
          
            this.setState({ loanApps: array, currentLoanApp: null});
        
        });
    }

    handleUpdate(loanApp) {
 
        const currentLoanApp = this.state.currentLoanApp;
        fetch( 'api/loan-apps/' + currentLoanApp.id, {
            method:'put',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(loanApp)
        })
        .then(response => {
            return response.json();
        })
        .then( data => {
            /* Updating the state */
            var array = this.state.loanApps.filter(function(item) {
              return item !== currentLoanApp
          })
            this.setState((prevState)=> ({
                loanApps: array.concat(loanApp),
                currentLoanApp : loanApp
            }))
        }) 
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

    render() {
        let currentLoanApp = {first_name:'',last_name:'',ssn:'',email:'',phone:'',credit_score:''};
        let modalButton;
        if (this.state.currentLoanApp) {
            currentLoanApp = this.state.currentLoanApp;
            modalButton = <button className="open-modal-btn" onClick={this.openModalHandler}>Edit Loan App</button>

        }
        return (
            <div className="container">

                <div className="row">
                    <div className="col-md-3">
                        <h3> All Loan Applications </h3>
                        <ul>
                            { this.renderLoanApps() }
                        </ul> 
                    </div> 
                    <div className="col-md-9">
                        <LoanApp 
                            loanApp={ this.state.currentLoanApp } />

                        <CreateLoanApp 
                            onAdd={ this.handleAddLoanApp } />

                        <DeleteButton 
                            deleteFunction={this.handleDelete} 
                            currentLoanApp={ this.state.currentLoanApp } />

                        {modalButton}

                        <EditLoanApp 
                            className="modal" 
                            show={this.state.isShowing}
                            close={this.closeModalHandler}
                            onEdit={ this.handleUpdate } 
                            currentLoanApp={ this.state.currentLoanApp } />
                            
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
 
/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";  
*/
 
if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}