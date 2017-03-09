import React from 'react';
import { Component } from 'react';

import { Router, Link } from 'react-router';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';


export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.checkLogin = this.checkLogin.bind(this)
        this.handleUserChange = this.handleUserChange.bind(this)
        this.handlePassChange = this.handlePassChange.bind(this)
        this.state = {
            login: false,
            username: '',
            password: ''
        }
    }
    checkLogin() {
        console.log('check login')
        if (this.state.username == 'testuser' && this.state.password == 'password') {
            console.log(true)
            this.context.router.push('/home')
        }
    }
    handleUserChange(e) {
        this.setState({ username: e.target.value })
    }
    handlePassChange(e) {
        this.setState({ password: e.target.value })
    }
    render() {
        return (<div>
            <AppBar title="CookForMe" showMenuIconButton={false} />
            <div className="content">
                <Card>
                    <CardTitle title="Login" />
                    <CardText>
                        <TextField
                            hintText="Username"
                            value={this.state.username}
                            onChange={this.handleUserChange}
                            fullWidth
                        />
                        <TextField 
                            hintText="Username"
                            value={this.state.password}
                            onChange={this.handlePassChange}
                            type="password"
                            fullWidth
                        />
                        <RaisedButton
                            primary
                            label="Login"
                            onClick={this.checkLogin}
                        />
                    </CardText>
                </Card>
            </div>
            </div>)
    }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};