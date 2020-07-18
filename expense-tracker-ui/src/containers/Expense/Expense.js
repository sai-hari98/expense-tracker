import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIncome from '../../components/Expense/AddIncome';
import { Button } from '@material-ui/core';

class Expense extends Component {

    state = {
        incomeForm: {
            description: {
                value: '',
                validation: {
                    required: true
                },
                dirty: false,
                valid: false
            },
            amount: {
                value: '',
                validation: {
                    required: true,
                    numeric: true
                },
                dirty: false,
                valid: false
            },
            formValid: false
        }
    }

    render() {
        return (
            <div className="container mt-5 pt-4">
                <ExpansionPanel style={{ backgroundColor: 'inherit' }}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="income">
                        <Typography>Add Income Details</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <AddIncome />
                        <Button className="ml-2" color="default" variant="contained">Add</Button>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default Expense;