import React from 'react';
import { Component } from 'react';

import {ALL_RECIPES, SEARCH_RECIPES} from '../env.js';

import AppBar from 'material-ui/AppBar';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import Step from './step'
import InputStep from './input'

const propTypes = {
  steps: React.PropTypes.array.isRequired,
  page: React.PropTypes.string,
  addStep: React.PropTypes.func.isRequired,
  removeStep: React.PropTypes.func.isRequired,
  submitRecipe: React.PropTypes.func.isRequired
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.makePage = this.makePage.bind(this)
    this.getRecipes = this.getRecipes.bind(this)
    this.state = {
      recipes:[]
    }
  }
  componentDidMount() {
    this.getRecipes()
  }
  getRecipes() {
    return fetch(ALL_RECIPES)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({recipes: responseJson})
        console.log(responseJson)
        return responseJson
      })
  }
  makePage() {
    const self = this;
    const titleStyle = {
          fontSize: 30
        }
    switch(this.props.page) {
      case 'newrecipe':
        return (
          <div className="page">
            <AppBar title="Cook For Me" showMenuIconButton={false}/>
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
        )
      case 'recipes':
        console.log(this.state.recipes)
        return (
          <div className="page">
            <AppBar title="CookForMe" showMenuIconButton={false}/>
            <div className="content">
              <Card>
                <CardHeader
                  titleStyle={titleStyle}
                  title="Saved Recipes"
                />
              </Card>
              { this.state.recipes.map((recipe, i) =>
                  <Card key={i}>
                    <CardHeader
                      titleStyle={titleStyle}
                      title={recipe.title}
                    />
                  </Card>)
              }
            </div>
          </div>
        )
      default:
        return (<div></div>);
    }
  }
  render() {
    const page = this.makePage()
    return page
  }
}

App.propTypes = propTypes;
