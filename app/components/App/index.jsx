import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { getArticles } from '../../api';
import { fetchData } from '../../actions';
import Titles from '../../pages/Titles';
import Home from '../../pages/Home';

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            error: '',
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        getArticles()
            .then(res => {
                const { fetchData } = this.props;
                fetchData(res.data[0]);
            })
            .catch(error => {
                this.setState({
                    error,
                });
            });
    };

    render() {
        return (
            <Router>
                <main>
                    <nav className="nav">
                        <ul className="navList">
                            <li className="listItem">
                                <NavLink activeClassName="activeLink" to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li className="listItem">
                                <NavLink
                                    activeClassName="activeLink"
                                    to="/titles">
                                    Titles
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <Route path="/" exact component={Home} />
                    <Route path="/titles" component={Titles} />
                </main>
            </Router>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: data => dispatch(fetchData(data)),
});

export default connect(null, mapDispatchToProps)(App);
