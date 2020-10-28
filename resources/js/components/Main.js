import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import LoanApp from './LoanApp';

import axios from 'axios';

import Fuse from 'fuse.js';

const keys = {
    FIRST_NAME: "first_name",
    LAST_NAME: "last_name",
    EMAIL: "email",
    PHONE: "phone",
};

const { FIRST_NAME, LAST_NAME, EMAIL, PHONE } = keys;

const fuseOptions = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 50,
    maxPatternLength: 12,
    minMatchCharLength: 3,
    keys: [FIRST_NAME, LAST_NAME, EMAIL, PHONE]
};

/* Main Component */
class Main extends Component {

    constructor() {
        super();
        //Initialize the state
        this.state = {
            loanApps: [],
            currentLoanApp: null,
            query: ""
        }

        this.handleAddLoanApp = this.handleAddLoanApp.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }
    componentDidMount() {
        // get info from API
        axios.get('/api/loan-apps')
            .then(response => {
                return response.data;
            })
            .then(loanApps => {
                // Fetched loan app is stored in the state
                this.setState({ loanApps });
            });
    }
 
    renderLoanApps() {
        const fuse = new Fuse (this.state.loanApps, fuseOptions);
        let results;
        if (this.state.query) {
            results = fuse.search(this.state.query);
            results = results.map(loanApp => loanApp.item);
        } else {
            results = this.state.loanApps;
        }
        return results.map(loanApp => {
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    handleAddLoanApp(loanApp) {
     
        /*Fetch API for post request */
        axios({
            method:'post',
            url: '/api/loan-apps',
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
            data: loanApp
        })
        .then(response => {
            return response.data;
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
        axios.delete( '/api/loan-apps/' + this.state.currentLoanApp.id )
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
        axios({
            method:'put',
            url: '/api/loan-apps/' + currentLoanApp.id,
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
            data: loanApp
        })
        .then(response => {
            /* Updating the state */
            const data = response.data;
            let array = this.state.loanApps.filter(function(data) {
                return data !== currentLoanApp
            })
            array.push(loanApp)
            const sortedArray = array.sort((a, b) => (a.id > b.id) ? 1 : -1);
            this.setState((prevState)=> ({
                loanApps: sortedArray,
                currentLoanApp : loanApp
            }))
        }) 
    }

    onSearch({ currentTarget = {} }) {
        this.setState((prevState)=> ({
            query: currentTarget.value
        }))
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
                    <div className="loan-application-section col-md-4 order-md-1 order-12">
                        <div className="form-group search-wrapper">
                            <input placeholder="Search by first name, last name, email or phone" className="search-input" type="text" value={this.state.query} onChange={this.onSearch} />
                        </div>
                        <ul className="list-unstyled">
                            { this.renderLoanApps() }
                        </ul> 
                    </div> 
                    <div className="col-md-8 order-md-12 order-1">
                        <LoanApp 
                            handleAddLoanApp={ this.handleAddLoanApp }
                            handleDelete={ this.handleDelete }
                            handleUpdate={ this.handleUpdate }
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