import React from 'react';
import { Component } from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const propTypes = {
    recipe: React.PropTypes.object.isRequired
}

export default class RecipeCard extends Component {
  render() {
    const delimit = this.props.recipe.image.split('/')
    const recipeString = delimit[delimit.length - 1].split('.')[0]
    const link = `https://spoonacular.com/recipe/${recipeString}`
    return (
      <div>
        <a href={link}>
        <Card>
          <CardMedia
            overlay={<CardTitle title={this.props.recipe.title} />} >
            <img src={this.props.recipe.image} />
          </CardMedia>
        </Card>
        </a>
      </div>
    )
  }
}

RecipeCard.propTypes = propTypes