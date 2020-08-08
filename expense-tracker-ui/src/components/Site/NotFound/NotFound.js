import React, { Component } from 'react';
import classes from './NotFound.module.css';

export default class NotFound extends Component {
    render() {
        return (
            <div className="container justify-content-center">
                <div className="row mt-5 justify-content-center">
                    <div className={classes.background}>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12 text-center text-danger">
                        Oops! Page Not Found.
                    </div>
                </div>
            </div>
        );
    }
}