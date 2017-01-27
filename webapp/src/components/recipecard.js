import React from 'react';
import { Component } from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const propTypes = {
    recipe: React.PropTypes.object.isRequired
}

export default class RecipeCard extends Component {
  render() {
    return (
      <div>
        <Card>
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