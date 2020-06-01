import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

class SideDrawer extends Component {

    render() {
        return (
            <SwipeableDrawer
                anchor='right'
                open={this.props.showDrawer}
                onClose={() => this.props.toggleDrawer(false)}
                onOpen={() => this.props.toggleDrawer(true)}>
                <div
                    // className={clsx(classes.list)}
                    role="presentation"
                    onClick={() => this.props.toggleDrawer(false)}
                    onKeyDown={() => this.props.toggleDrawer(false)}
                >
                    <List>
                        {this.props.links.map((link, index) => {
                            return (
                                <ListItem button key={index} onClick={() => this.props.routingHandler(link.props.to)}>
                                    {link.props.children}
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
            </SwipeableDrawer>
        )
    }
}

export default SideDrawer;