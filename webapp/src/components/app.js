import React from 'react';
import { Component } from 'react';

import {ALL_RECIPES, SEARCH_RECIPES} from '../env.js';

import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import Step from './step'
import InputStep from './input'

const propTypes = {
  steps: React.PropTypes.array.isRequired,
  page: React.PropTypes.object.isRequired,
  addStep: React.PropTypes.func.isRequired,
  removeStep: React.PropTypes.func.isRequired,
  submitRecipe: React.PropTypes.func.isRequired,
  changePage: React.PropTypes.func.isRequired
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.makePage = this.makePage.bind(this)
    this.getRecipes = this.getRecipes.bind(this)
    this.newRecipe = this.newRecipe.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.state = {
      recipes:[],
      filter:''
    }
  }
  componentDidMount() {
    this.getRecipes()
  }
  getRecipes() {
    return fetch(ALL_RECIPES)
      .then((response) => response.json())
      .then((responseJson) => {
        const newState = this.state
        newState.recipes=responseJson
        this.setState(newState)
        console.log(responseJson)
        return responseJson
      })
  }
  handleFilterChange(e,v) {
    const newState = this.state
    newState.filter = v
    this.setState(newState)
  }
  newRecipe() {
    this.props.changePage('newrecipe')
  }
  makePage() {
    const self = this;
    const titleStyle = {
          fontSize: 30
        }
    const cardStyle = {
      marginTop: 10,
      marginBottom: 10
    }
    switch(this.props.page.page) {
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
        const fabStyle = {marginLeft: 20}
        return (
          <div className="page">
            <AppBar title="CookForMe" showMenuIconButton={false}/>
            <div className="content">
              <Card>
                <CardHeader
                  titleStyle={titleStyle}
                  title="Saved Recipes"
                />
                <CardText>
                  <TextField hintText='search' onChange={this.handleFilterChange} value={this.state.filter}/>
                </CardText>
              </Card>
              { this.state.recipes.filter((recipe) => recipe.title.includes(this.state.filter) || this.state.filter == '').map((recipe, i) =>
                  <Card key={i} style={cardStyle}>
                    <CardHeader
                      titleStyle={titleStyle}
                      title={recipe.title}
                    />
                  </Card>)
              }
            </div>
            <FloatingActionButton secondary style={fabStyle} onClick={this.newRecipe}>
              <ContentAdd />
            </FloatingActionButton>
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
