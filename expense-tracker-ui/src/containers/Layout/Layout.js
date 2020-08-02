import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../../components/Site/NavBar/NavBar';
import NonUser from '../../components/Site/NonUser/NonUser';
import { Route, BrowserRouter } from 'react-router-dom';
import Auth from '../Auth/Auth';
import * as actions from '../../store/actions/index';
import Signup from '../Auth/Signup/Signup';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Income from '../Income/Income';
import User from '../User/User';
class Layout extends Component {

    state = {
        darkMode: false
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');
        if (token !== null) {
            this.props.setToken(token, userId);
        }
    }

    getThemeObject = () => {
        let theme = createMuiTheme({
            typography: {
                "fontFamily": `"Noto Sans JP",  sans-serif`,
                "fontSize":15,
                "fontWeightLight": 300,
                "fontWeightRegular": 400,
                "fontWeightMedium": 500
            },
            palette: {
                type: this.props.darkMode ? "dark" : "light"
            }
        });
        return theme;
    }
    darkModeHandler = () => {
        let darkMode = this.state.darkMode;
        this.setState({ darkMode: !darkMode });
        this.props.setDarkMode();
    }

    render() {
        if (this.state.darkMode) {
            document.body.style.backgroundColor = '#2f3640';
            document.body.style.color = '#ffffff';
        } else {
            document.body.style.backgroundColor = '#ffffff';
            document.body.style.color = '#000000';
        }
        return (
            <BrowserRouter>
                <ThemeProvider theme={this.getThemeObject()}>
                    <CssBaseline />
                    <NavBar darkMode={this.state.darkMode} darkModeToggler={this.darkModeHandler} />
                    {!this.props.loggedIn ? <Route path="/" exact component={NonUser}></Route> : null}
                    <Route path="/login" exact component={Auth}></Route>
                    <Route path="/signup" exact component={Signup}></Route>
                    <Route path="/income/add" exact component={Income}></Route>
                    <Route path="/user" exact component={User}></Route>
                </ThemeProvider>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        darkMode: state.app.darkMode
    }
}

const mapActionsToProps = dispatch => {
    return {
        setDarkMode: () => dispatch(actions.toggleDarkMode()),
        setToken: (token, userId) => dispatch(actions.setToken(token, userId))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Layout);