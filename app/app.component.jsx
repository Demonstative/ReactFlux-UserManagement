
import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
//
import { UserComponent } from './children/user/user.component';
//
import { User } from './children/common/models/user.model';
import { $ } from './sandbox';

// MOCK
var name = { first: 'Mob', last: 'Programming' };
var address = { line1: "https://en.wikipedia.org/wiki/Mob_programming" };

const main = document.getElementById('container');

class AppComponent extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = { user: new User({ name, address }), users: [] };
        $.getUsers().then(this.handleUsers.bind(this));
        $.subscribe('USERS:CHANGED', this.handleUsers.bind(this));
        
        return this;
    }
    
    handleUsers(users) {
        var user = this.state.user;
        this.setState({ user, users });
    }
    
    // LIFECYCLE METHODS
    componentWillUnmount() {
        // $.unsubscribe('USERS:CHANGED', this._handleUsers);  // TODO
    }
    render() {
        var children = this.state.users.map( (user, i) => <UserComponent {...user} key={user.id} /> );
        
        return (
            <div>
                <h3>Users</h3>
                { [ ...children ] }
                <h3>Create</h3>
                <UserComponent {...this.state.user}>
                    <button className="btn" type="submit">Add</button>
                </UserComponent>
            </div>
        );
    }
}

ReactDOM.render(<AppComponent />, main);
