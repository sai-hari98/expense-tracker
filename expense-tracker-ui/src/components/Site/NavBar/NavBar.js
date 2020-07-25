import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import classes from './NavBar.module.css';
import { connect } from 'react-redux';
import * as utility from '../../../common/utility';
import * as actions from '../../../store/actions/index';
import SideDrawer from './SideDrawer/SideDrawer';
const nonUserLinks = [

];

const userLinks = [
    [{to:"/income/add",text:"Add Income/Expense"}],
    [{to:"",text:"My Profile"}]
]

class NavBar extends Component {

    state = {
        showSideDrawer: false
    }

    routingHandler = (route)=>{
        this.props.history.push(route);
    }

    logoutHandler = () => {
        console.log(this.props);
        this.props.logout();
        utility.setCredentials(null, null, false);
        this.props.history.replace("/");
    }

    toggleDrawer = (show) => {
        this.setState({ showSideDrawer: show });
    }

    render() {
        let path = !this.props.darkMode ? <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"></path> :
            <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path>
        let navClass = !this.props.darkMode ? classes['light-mode'] : classes['dark-mode'];
        return (
            <div className={"navbar navbar-expand-lg navbar-dark " + navClass}>
                <a className="navbar-brand" href="/">Expense Tracker</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {this.props.loggedIn ? <a className="nav-link text-white ml-auto" style={{ cursor: 'pointer' }} onClick={this.logoutHandler}>Logout</a> : <Link className="nav-link text-white ml-auto" to="/login">Login</Link>}
                    </ul>
                </div>
                <SideDrawer showDrawer={this.state.showSideDrawer} 
                toggleDrawer={this.toggleDrawer} 
                links={this.props.loggedIn ? userLinks : nonUserLinks} 
                toggleHandler={this.toggleHandler}
                routingHandler={this.routingHandler}/>
                <IconButton className="ml-auto text-white" style={{ 'outline': 'none', 'fontSize': '25' }} onClick={this.props.darkModeToggler}>
                    <SvgIcon>
                        {path}
                    </SvgIcon>
                </IconButton>
                <Button className="text-white ml-auto" onClick={() => this.toggleDrawer(true)} style={{ 'fontSize': '25' }}
                    data-toggle="collapse">
                    <MenuIcon />
                </Button>
            </div>
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
        logout: () => dispatch(actions.logout())
    }
}
export default connect(mapStateToProps, mapActionsToProps)(withRouter(NavBar));