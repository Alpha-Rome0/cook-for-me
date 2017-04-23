import React from 'react';
import { Component } from 'react';

import { Router, Link } from 'react-router';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';

import { LOGIN } from '../env.js'
import { login, register, checkuser } from '../actions/ext.js' 


export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.checkLogin = this.checkLogin.bind(this)
        this.handleUserChange = this.handleUserChange.bind(this)
        this.handlePassChange = this.handlePassChange.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleRegPassChange = this.handleRegPassChange.bind(this)
        this.handleRegUserChange = this.handleRegUserChange.bind(this)
        this.handleAmazonIDChange = this.handleAmazonIDChange.bind(this)
        this.state = {
            login: false,
            username: '',
            password: '',
            amazonID: '',
            registerUser: '',
            registerPass: '',
            open: false,
            error: ''
        }
    }
    checkLogin() {
        console.log('trying to log in')
        login(this.state.username, this.state.password).then((response) => {
          if(response) {
              console.log(true)
              this.context.router.push('/home')
          } else {
              console.log('bad info')
          }
        })
    }
    handleUserChange(e) {
        this.setState({ username: e.target.value })
    }
    handlePassChange(e) {
        this.setState({ password: e.target.value })
    }
    handleOpen() {
        this.setState({ open: true })
    }
    handleCancel() {
        this.handleClose()
    }
    handleRegister() {
        checkuser(this.state.registerUser, this.state.registerPass, this.state.amazonID).then((response) => {
          console.log("RESPONSE")
          console.log(response)
          if (!response) {
            register(this.state.registerUser, this.state.registerPass, this.state.amazonID).then((response) => {
              if(response) {
                  this.handleClose()
                  console.log(true)
                  const newState = this.state
                  newState.error = ''
                  this.setState(newState)
              } else {
                  console.log('error occured with registration.') 
                  const newState = this.state
                  newState.error = 'An error occured with registration.'
                  this.setState(newState)
              }
            }) 
          } else {
            console.log('user already exists.')
            const newState = this.state
            newState.error = 'This user id has already been registered.'
            this.setState(newState)
          }
        })
    }
    handleClose() {
        this.setState({open: false})
    }
    handleRegPassChange(e) {
        this.setState({ registerPass: e.target.value })
    }
    handleRegUserChange(e) {
        this.setState({ registerUser: e.target.value })
    }
    handleAmazonIDChange(e) {
        this.setState({ amazonID: e.target.value })
    }
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary
                onTouchTap={this.handleCancel}
                />,
            <RaisedButton
                label="Register"
                primary
                onTouchTap={this.handleRegister}
                />
        ]
        return (<div>
            <AppBar title="CookForMe" showMenuIconButton={false} />
            <div className="content">
                <Card>
                    <CardTitle title="Login" />
                    <CardText>
                        <TextField
                            floatingLabelText="Username"
                            value={this.state.username}
                            onChange={this.handleUserChange}
                            fullWidth
                        />
                        <TextField 
                            floatingLabelText="Password"
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
                        <FlatButton
                            primary
                            label="Register"
                            onClick={this.handleOpen}
                        />
                    </CardText>
                </Card>
                <Dialog
                    title="Registration"
                    actions={actions}
                    modal
                    open = {this.state.open}>
                        <TextField
                            floatingLabelText="AmazonID"
                            value={this.state.amazonID}
                            onChange={this.handleAmazonIDChange}
                            fullWidth
                            errorText={this.state.error}
                        />
                        <p>
                            An AmazonID is a alphanumeric string associated with your Amazon Echo and your Amazon Account - it's what we use to find your Echo! Go to this link to find out what your AmazonID is, and paste it into the box above.
                        </p>
                        <TextField
                            floatingLabelText="User Name"
                            value={this.state.registerUser}
                            onChange={this.handleRegUserChange}
                            fullWidth
                        />
                        <TextField
                            floatingLabelText="Password"
                            value={this.state.registerPass}
                            onChange={this.handleRegPassChange}
                            type="password"
                            fullWidth
                        />
                </Dialog>
            </div>
            </div>)
    }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};
