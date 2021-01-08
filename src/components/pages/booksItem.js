import React, {Component} from 'react';
import GotService from '../../services/gotService';
import CharDetails, {Field} from '../charDetails/charDetails';

export default class BooksItem extends Component {
  GotService = new GotService();

    render() {
      return (
        <CharDetails
        itemId={this.props.bookId}
        getData={this.GotService.getBook}>
          <Field field='numberOfPages' label='Number of Pages'></Field>
          <Field field='publisher' label='Publisher'></Field>
          <Field field='released' label='Released'></Field>
        </CharDetails>
      )
    }
}

