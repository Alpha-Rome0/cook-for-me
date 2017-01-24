import React from 'react';
import { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import Step from './step'
import InputStep from './input'

const propTypes = {
  steps: React.PropTypes.array.isRequired,
  addStep: React.PropTypes.func.isRequired,
  removeStep: React.PropTypes.func.isRequired,
  submitRecipe: React.PropTypes.func.isRequired
}

export default class App extends Component {

  render() {
    console.log(this.props.removeStep)
    const titleStyle = {
      fontSize: 30
    }

    const self = this;

    return (
      <div className="page">
        <AppBar title="Team 182 ECHOES" showMenuIconButton={false}/>
        <div className="content">
          <Card>
            <CardHeader
              titleStyle={titleStyle}
              title="New Recipe"
            />
            <CardText>
              <TextField hintText="Grandma's Cookies..." floatingLabelText="Recipe Name" floatingLabelFixed fullWidth/>
            </CardText>

          </Card>
          { this.props.steps.map((step, i) => 
              <Step removeStep={self.props.removeStep} id={i} content={step.content} />)
          }
          <InputStep submitRecipe={self.props.submitRecipe} addStep={self.props.addStep} />
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;
