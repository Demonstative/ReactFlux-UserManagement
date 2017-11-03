
import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
//
import { User, Name, Address } from './';
import { $ } from '../../sandbox';

class UserComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = new User({ name: { first: props.name.first, last: props.name.last }, address: { line1: props.address.line1 } });
        return this;
    }
    
    squelchEvent(e) {
        e.preventDefault();
        e.stopPropagation();
        // e.stopImmediatePropagation();  // Not available on React Events???
        return false;
    }
    
    reset() {
        this.setState(new User());
    }
    
    handleChange(param, value) {
        var state = User.call(this.state, { [param]: value });
        this.setState(state);
    }
    handleNameChange(param, e) {
        var value = e.target.value, state = Name.call(this.state.name, { [param]: value });
        this.handleChange('name', state);
    }
    handleAddressChange(param, e) {
        var value = e.target.value, state = Address.call(this.state.address, { [param]: value });
        this.handleChange('address', state);
    }
    
    handleSubmit(e) {
        var data = this.state;
        
        $.dispatch({ type: 'USER:CREATE', data });
        this.reset();
        
        return this.squelchEvent(e);
    }
    
    render() {
        var children = React.Children.toArray(this.props.children);
        
        return (
            <form className="form form-inline" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-row">
                    <div className="col-auto">
                        <div className="input-group">
                            <input className="form-control" type="text" value={this.state.name.first} onChange={this.handleNameChange.bind(this, 'first')} />
                            <input className="form-control" type="text" value={this.state.name.last} onChange={this.handleNameChange.bind(this, 'last')} />
                            <input className="form-control" type="text" value={this.state.address.line1} onChange={this.handleAddressChange.bind(this, 'line1')} />
                        </div>
                    </div>
                    <div className="col-auto">
                        { [...children] }
                    </div>
                </div>
            </form>
        );
    }
}

export { UserComponent };
