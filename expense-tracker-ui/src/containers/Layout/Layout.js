import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../../components/Site/NavBar/NavBar';
import NonUser from '../../components/Site/NonUser/NonUser';
import Aux from '../../hoc/Auxillary';
class Layout extends Component {

    state = {
        darkMode: false
    }

    darkModeHandler = () => {
        let darkMode = this.state.darkMode;
        this.setState({ darkMode: !darkMode });
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
            <Aux>
                <NavBar darkMode={this.state.darkMode} darkModeToggler={this.darkModeHandler} />
                {!this.props.loggedIn ? <NonUser /> : null}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn
    }
}
export default connect(mapStateToProps, null)(Layout);