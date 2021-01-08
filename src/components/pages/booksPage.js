import React, {Component} from 'react';
import ItemList from '../itemList/itemList';
import GotService from '../../services/gotService';
import ErrorMassage from '../errorMassage/errorMassage';
import {withRouter} from 'react-router-dom';

class BooksPage extends Component {
  state = {
    error: false
  }

  GotService = new GotService();

  componentDidCatch() {
    this.setState({error: true})
  }

  render() {
    if(this.state.error) {
      return <ErrorMassage />
    }

    return (
      <ItemList
      onItemSelected={(itemId) => {
        this.props.history.push(itemId)
      }}
      getData={this.GotService.getAllBooks}
      renderItem={(item) => `${item.name}`}
      />
    );
  }
}

export default withRouter(BooksPage);