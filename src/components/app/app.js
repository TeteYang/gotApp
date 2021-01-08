import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage, HousesPage, BooksPage, BooksItem} from '../pages';
import ErrorMassage from '../errorMassage';
import GotService from '../../services/gotService';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import './app.css';

export default class App extends Component {
    state = {
        showRandomChar: true,
        error: false
    }

    GotService = new GotService();

    componentDidCatch() {
        this.setState({error: true})
    }

    onHideComponent = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render() {
        const char = this.state.showRandomChar ? <RandomChar interval={1500} /> : null;
        if(this.state.error) {
            return <ErrorMassage />
        }
        return (
            <Router>
            <div className="app">
                <Container>
                    <Header />
                    {/* <GotService /> */}
                </Container>

                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                        </Col>
                    </Row>
                    <Row >
                        <Col>
                            <Button onClick={this.onHideComponent} color="info">Hide me</Button>{' '}
                        </Col>
                    </Row>
                    <Route path="/" exact component={() => <h1>Welcome to GOT</h1>}/>
                    <Route path="/characters" component={CharacterPage}/>
                    <Route path="/houses" component={HousesPage}/>
                    <Route path="/books" exact component={BooksPage}/>
                    <Route path="/books/:id" render={
                        ({match}) => {
                            const {id} = match.params;
                        return <BooksItem bookId={id} />
                    }
                    }/>
                </Container>
            </div>
            </Router>
        );
    }
};