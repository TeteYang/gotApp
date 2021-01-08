import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import GotService from '../../services/gotService';
import PropTypes from 'prop-types';


const ItemList = ({data, onItemSelected, renderItem}) => {
    return(
        data.map((item) => {
            const label = renderItem(item);
            return (
                <ul className="item-list list-group" key={item.id}>
                    <li
                    className="list-group-item"
                    onClick={() => onItemSelected(item.id)}>
                        {label}
                    </li>
                </ul>
            )
        })
    )}

ItemList.defaultProps = {
    onItemSelected: () => {}
}

ItemList.propTypes = {
    onItemSelected: PropTypes.func,
    // getData: PropTypes.arrayOf(PropTypes.object),
}

const withData = (View, getData) => {
    return class extends Component{
        state = {
            data: null
        }

        componentDidMount() {
            getData()
            .then((data) => this.setState({data}))
            .catch(this.onErrors)
        }
        render() {
            const {data} = this.state;

            if(!data) {
                return <Spinner />
            }
            return <View {...this.props} data={data} />
        }
    }
}
const {getAllCharacters} = new GotService();
export default withData(ItemList, getAllCharacters);