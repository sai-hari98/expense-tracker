import React, { Component } from 'react';
import { TextField } from '@material-ui/core';

class AddIncome extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-6">
                    <TextField id="income-desc" variant="filled" color="primary" label="Description" fullWidth/>
                </div>
                <div className="col-6">
                    <TextField id="income-amount" variant="filled" color="primary" label="Amount" fullWidth/>
                </div>
            </div>
        )
    }
}

export default AddIncome;