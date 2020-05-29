import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../../components/Site/NavBar/NavBar';
import NonUser from '../../components/Site/NonUser/NonUser';
import { Route, BrowserRouter } from 'react-router-dom';
import Auth from '../Auth/Auth';
import * as actions from '../../store/actions/index';
import Signup from '../Auth/Signup/Signup';

class Layout extends Component {

    state = {
        darkMode: false
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        if (token !== null) {
            this.props.setToken(token);
        }
    }

    darkModeHandler = () => {
        let darkMode = this.state.darkMode;
        this.setState({ darkMode: !darkMode });
        this.props.setDarkMode();
    }

    render() {
        if (this.state.darkMode) {
            document.body.style.backgroundColor = '#34495e';
            document.body.style.color = '#ffffff';
        } else {
            document.body.style.backgroundColor = '#ffffff';
            document.body.style.color = '#000000';
        }
        return (
            <BrowserRouter>
                <NavBar darkMode={this.state.darkMode} darkModeToggler={this.darkModeHandler} />
                {!this.props.loggedIn ? <Route path="/" exact component={NonUser}></Route> : null}
                <Route path="/login" exact component={Auth}></Route>
                <Route path="/signup" exact component={Signup}></Route>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

const mapActionsToProps = dispatch => {
    return {
        setDarkMode: () => dispatch(actions.toggleDarkMode()),
        setToken: (token) => dispatch(actions.setToken(token))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Layout);