import React, {Component} from 'react';
import './charDetails.css';
import GotService from '../../services/gotService';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
};

export default class CharDetails extends Component {
    GotService = new GotService();
    state = {
        item: null,
    }
    componentDidMount() {
        this.updateChar();
    }
    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId) {
            this.updateChar();
        }
    }
    updateChar() {
        const {itemId, getData} = this.props;
        if(!itemId) {
            return
        }
        getData(itemId)
            .then((item) => {
                this.setState({item})
            })
    }
    render() {
        if(!this.state.item) {
            return <span className='select-error'>
                Please select a character
            </span>
        }
        const {item} = this.state;
        const {name} = item;
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            const render = React.cloneElement(child, {item});
                            return render;
                        })
                    }
                </ul>
            </div>
        );
    }
}