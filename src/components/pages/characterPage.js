import React, {Component} from 'react';
import ItemList from '../itemList/itemList';
import CharDetails, {Field} from '../charDetails/charDetails';
import GotService from '../../services/gotService';
import ErrorMassage from '../errorMassage/errorMassage';
import RowBlock from '../rowBlock/rowBlock';

export default class CharacterPage extends Component {
  state = {
    selectedChar: 130,
    error: false
  }

  GotService = new GotService();

  onItemSelected = (id) => {
    this.setState({
        selectedChar: id
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
      onItemSelected={this.onItemSelected}
      getData={this.GotService.getAllCharacters}
      renderItem={(item) => `${item.name} (${item.gender})`}
      />
    );

    const charDetails = (
      <CharDetails
      itemId={this.state.selectedChar}
      getData={this.GotService.getCharacter}>
        <Field field='gender' label='Gender'></Field>
        <Field field='born' label='Born'></Field>
        <Field field='died' label='Died'></Field>
        <Field field='culture' label='Culture'></Field>
      </CharDetails>
    )

    return (
      <RowBlock left={itemList} right={charDetails} />
    )
  }
}