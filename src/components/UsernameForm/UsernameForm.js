import React, { Component } from 'react';
import './uf-style.css';

class UsernameForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.username);
    }

    onChange(e) {
        this.setState({ username: e.target.value });
    }

    render() {
        return (
            <div>
                <div className='outer'>
                    <div className='middle'>
                        <div className='inner'>
                            <div className='button_box2' >
                                <h1 className='title'>Flixchat</h1>
                                <form className='form-wrapper-2 cf' onSubmit={this.onSubmit}>
                                    <div id='usernameForm'>
                                        <input type='text' placeholder='Username' onChange={this.onChange} />
                                        <button type='submit'>Name</button>
                                    </div>
                                </form>
                            </div >
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default UsernameForm;