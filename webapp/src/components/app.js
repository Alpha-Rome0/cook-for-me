import React from 'react';
import { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import ContentAdd from 'material-ui/svg-icons/content/add';

import TabBar from './tabs'

import NewRecipe from './newrecipe'
import SearchRecipe from './searchrecipe'
import StoredRecipe from './storedrecipe'

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
         <SearchRecipe />
       )
      case 'newrecipe':
        return (
          <NewRecipe
            title={this.props.title}
            steps={this.props.steps}
            ingredients={this.props.ingredients}
            duration={this.props.duration}
            summary={this.props.summary}
            addStep={this.props.addStep}
            removeStep={this.props.removeStep}
            submitRecipe={this.props.submitRecipe}
            addIngredient={this.props.addIngredient}
            removeIngredient={this.props.removeIngredient}
            updateTitle={this.props.updateTitle}
            updateDuration={this.props.updateDuration}
            updateSummary={this.props.updateSummary} />

        )
      case 'recipes':
        return (
          <StoredRecipe />
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
