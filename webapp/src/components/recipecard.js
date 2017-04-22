import React from 'react';
import { Component } from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Grade from 'material-ui/svg-icons/action/grade';
import Language from 'material-ui/svg-icons/action/language';
import { yellow500, grey300 } from 'material-ui/styles/colors';

import { bookmarkRecipe } from '../actions/ext.js';

const propTypes = {
    recipe: React.PropTypes.object.isRequired,
    size: React.PropTypes.string,
    bookmarked: React.PropTypes.bool.isRequired
}

export default class RecipeCard extends Component {
  constructor(props) {
    super(props)
    this.handleBookmark = this.handleBookmark.bind(this)
    this.state={
      bookmarked: this.props.bookmarked
    }
  }
  handleBookmark() {
    bookmarkRecipe(this.props.recipe)
    const newState = this.state
    newState.bookmarked = !newState.bookmarked
    this.setState(newState)
  }
  render() {
    const delimit = this.props.recipe.image.split('/')
    const recipeString = delimit[delimit.length - 1].split('.')[0]
    const link = `https://spoonacular.com/recipe/${recipeString}`
    const cardStyle = {
      marginTop: 10,
      maxWidth: (typeof this.props.size === undefined)?'250px':this.props.size
    }
    const iconStyle = {
      fill: this.state.bookmarked?yellow500:grey300
    }
    const self=this
    return (
      <div className="recipeCard">
        <Card>
          <CardActions>
            <IconButton tooltip="View">
              <a href={link}>
                <Language />
              </a>
            </IconButton>
            <IconButton tooltip="Bookmark" onTouchTap={this.handleBookmark} iconStyle={iconStyle}>
              <Grade/>
            </IconButton>
          </CardActions>
          <CardMedia
            overlay={<CardTitle title={this.props.recipe.title} />} >
              <img src={this.props.recipe.image} />
          </CardMedia>
        </Card>
      </div>
    )
  }
}

RecipeCard.propTypes = propTypes