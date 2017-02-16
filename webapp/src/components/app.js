import React from 'react';
import { Component } from 'react';

import {ALL_RECIPES, SEARCH_RECIPES, SEARCH_ONLINE} from '../env.js';

import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';

import Step from './step'
import InputStep from './input'
import TabBar from './tabs'
import RecipeCard from './recipecard'
import ExpandableCard from './expandablecard'
import Ingredient from './ingredient'

const propTypes = {
  title: React.PropTypes.string.isRequired,
  steps: React.PropTypes.array.isRequired,
  ingredients: React.PropTypes.array.isRequired,
  duration: React.PropTypes.string.isRequired,
  summary: React.PropTypes.string.isRequired,
  page: React.PropTypes.object.isRequired,
  addStep: React.PropTypes.func.isRequired,
  removeStep: React.PropTypes.func.isRequired,
  submitRecipe: React.PropTypes.func.isRequired,
  changePage: React.PropTypes.func.isRequired,
  addIngredient: React.PropTypes.func.isRequired,
  removeIngredient: React.PropTypes.func.isRequired,
  updateTitle: React.PropTypes.func.isRequired,
  updateDuration: React.PropTypes.func.isRequired,
  updateSummary: React.PropTypes.func.isRequired
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.makePage = this.makePage.bind(this)
    this.getRecipes = this.getRecipes.bind(this)
    this.getResults = this.getResults.bind(this)
    this.newRecipe = this.newRecipe.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSummaryChange = this.handleSummaryChange.bind(this)
    this.handleDurationChange = this.handleDurationChange.bind(this)
    this.handleIngredientChange = this.handleIngredientChange.bind(this)
    this.handleAddIngredient = this.handleAddIngredient.bind(this)
    this.state = {
      recipes:[],
      searchResults:[],
      filter:'',
      search:'',
      ingredient:''
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
  getResults() {
    return fetch(`${SEARCH_ONLINE}?ingredients=${this.state.search}`)
      .then((response) => response.json()).then((responseJson) => {
        console.log(responseJson)
        const newState = this.state
        newState.searchResults=responseJson
        this.setState(newState)
        return responseJson
      })
  }
  handleFilterChange(e,v) {
    const newState = this.state
    newState.filter = v
    this.setState(newState)
  }
  handleSearchChange(e,v) {
    const newState = this.state
    newState.search = v
    this.setState(newState)
  }
  handleTitleChange(e,v) {
    this.props.updateTitle(v)
  }
  handleDurationChange(e,v) {
    this.props.updateDuration(v)
  }
  handleSummaryChange(e,v) {
    this.props.updateSummary(v)
  }
  handleIngredientChange(e,v) {
    const newState = this.state
    newState.ingredient = v
    this.setState(newState)
  }
  handleAddIngredient(e) {
    this.props.addIngredient(this.state.ingredient)
    const newState = this.state
    newState.ingredient = ''
    this.setState(newState)
    e.preventDefault()
  }
  
  newRecipe() {
    this.props.changePage('newrecipe')
  }
  makePage() {
    const self = this;
    const titleStyle = {
      fontSize: 25
    }
    const cardStyle = {
      marginTop: 10,
      marginBottom: 10
    }
    switch(this.props.page.page) {
      case 'searchrecipes':
       return(
         <div className="page">
          <div className="content">
            <Card>
              <CardHeader
                titleStyle={titleStyle}
                title="Search Recipes Online"
              />
              <CardText>
                  <TextField hintText='search' onChange={this.handleSearchChange} value={this.state.search}/>
                  <FlatButton secondary label="search" onClick={this.getResults} />
              </CardText>
            </Card>
            {
              this.state.searchResults.map((recipe, i) =>
                <RecipeCard recipe={recipe} />)
            }
          </div>
         </div>
       )
      case 'newrecipe':
        const wrapperStyle = {
          display: 'flex',
          flexWrap: 'wrap',
        }
        return (
          <div className="page">
            <div className="content">
              <Card>
                <CardText>
                  <TextField hintText="Grandma's Cookies..." floatingLabelText="Recipe Name" floatingLabelFixed fullWidth onChange={this.handleTitleChange} value={this.props.title}/>
                  <TextField hintText="Delicious and warm cookies that are easy to bake!" floatingLabelText="Summary" floatingLabelFixed fullWidth onChange={this.handleSummaryChange} value={this.props.summary} />
                  <TextField floatingLabelText="Duration (minutes)" floatingLabelFixed onChange={this.handleDurationChange} value={this.props.duration} type="number" />
                </CardText>
              </Card>
              <Card style={cardStyle}>
                <CardText>
                  <form onSubmit={this.handleAddIngredient}>
                    <TextField floatingLabelText="Add Ingredients" floatingLabelFixed fullWidth onChange={this.handleIngredientChange} value={this.state.ingredient} />
                    <input type="submit" style={{visibility: 'hidden'}} />
                  </form>
                  <div style={wrapperStyle}>
                  {
                    this.props.ingredients.map((ingredient, i) =>
                      <Ingredient id={i} removeIngredient={this.props.removeIngredient} content={ingredient} />)
                  }
                  </div>
                </CardText>
              </Card>
              { this.props.steps.map((step, i) =>
                  <Step removeStep={self.props.removeStep} id={i} content={step} />)
              }
              <InputStep submitRecipe={self.props.submitRecipe} addStep={self.props.addStep} />
            </div>
          </div>
        )
      case 'recipes':
        return (
          <div className="page">
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
                  <ExpandableCard recipe={recipe} expanded={false} />
                )
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
    return (<div>
    <AppBar title="CookForMe" showMenuIconButton={false} />
    <TabBar page={this.props.page.page} changePage={this.props.changePage} />
    {page}
    </div>)
  }
}

App.propTypes = propTypes;
