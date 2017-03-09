import React from 'react';
import { Component } from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {lightBlue700, gray300} from 'material-ui/styles/colors';


export default class App extends Component {
    render() {
        const muiTheme = getMuiTheme({
            palette: {
                canvasColor: gray300,
                primary1Color: lightBlue700,
            },
            appBar: {
                height: 50,
            },
        });
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>{this.props.children}</div>
            </MuiThemeProvider>
        )
    }
}