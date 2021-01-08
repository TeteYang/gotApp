import React, {Component} from 'react';
import ItemList from '../itemList/itemList';
import CharDetails, {Field} from '../charDetails/charDetails';
import GotService from '../../services/gotService';
import ErrorMassage from '../errorMassage/errorMassage';
import RowBlock from '../rowBlock/rowBlock';

export default class BooksPage extends Component {
  state = {
    selectedHouse: null,
    error: false
  }

  GotService = new GotService();

  onItemSelected = (id) => {
    this.setState({
        selectedHouse: id
    })
  }

  componentDidCatch() {
    this.setState({error: true})
  }

  render() {
    if(this.state.error) {
      return <ErrorMassage />
    }

    const itemList = (
      <ItemList
      // onItemSelected={this.onItemSelected}
      getData={this.GotService.getAllHouses}
      renderItem={(item) => `${item.name}`}
      />
    );

    const charDetails = (
      <CharDetails
      itemId={this.state.selectedBook}
      getData={this.GotService.getHouse} />
    )

    return (
      <RowBlock left={itemList} right={charDetails} />
    )
  }
}