import React, { Component } from 'react';

class NonUser extends Component {

    render() {
        return (
            <div className="container">
                <div className="row mt-5 pt-5">
                    <div className="col-12 text-center text-danger font-weight-bold">
                        Please Login to access the application
                </div>
                </div>
            </div>
        );
    }
}

export default NonUser;