import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Aux from '../../../../hoc/Auxillary';
import * as utility from '../../../../common/utility';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import classes from './MonthlyReminders.module.css';

class MonthlyReminders extends Component {

    addHandler = () => {
        console.log(this.props.form.deadlineDate);
        let data = {
            billDescription: this.props.form.billDescription.value,
            amount: this.props.form.amount.value,
            expenseCategory: this.props.form.expenseCategory.value,
            deadlineDate: this.props.form.deadlineDate.value.getDate()
        };
        this.props.add(data, 'billReminders');
    }

    getExpenseCategoryOptions = () => {
        return this.props.expenseCategories.map(category => {
            return <MenuItem value={category} key={category.id}>{category.categoryName}</MenuItem>
        });
    }

    getAddedReminders = () => {
        return this.props.billReminders.map((reminder, index) => {
            return (
                <Aux key={index}>
                    <div className="col-10 mt-1">
                        {"Bill Description: " + reminder.billDescription + " Amount: " + reminder.amount + " Category: " + reminder.expenseCategory.categoryName}
                    </div>
                    <div className="col-2 mt-1">
                        <Button className="bg-danger text-white" onClick={() => this.props.remove(index, 'billReminders')}>Remove</Button>
                    </div>
                </Aux>
            );
        })
    }
    render() {
        let today = new Date();
        return (
            <Aux>
                <div className={"row justify-content-center " + classes['max-height']}>
                    {this.props.billReminders.length > 0 ? this.getAddedReminders() : <span className="text-center mt-1 mb-1">Add atleast one Bill Reminder</span>}
                </div>
                <div className="row mt-2">
                    <div className="col-6 text-center">
                        <TextField helperText={utility.checkInvalid('billDescription', this.props.form) ? 'Bill Description should not be empty' : ' '}
                            error={utility.checkInvalid('billDescription', this.props.form)}
                            id="bill-description" label="Bill Description" variant="filled" color="primary"
                            value={this.props.form.billDescription.value} onChange={(event) => this.props.inputChangeHandler(event, 'billDescription', 'billReminderForm')} fullWidth />
                    </div>
                    <div className="col-6 text-center">
                        <TextField helperText={utility.checkInvalid('amount', this.props.form) ? 'Amount should be a number' : ' '}
                            error={utility.checkInvalid('amount', this.props.form)}
                            id="amount"
                            label="Amount" variant="filled" color="primary"
                            value={this.props.form.amount.value} onChange={(event) => this.props.inputChangeHandler(event, 'amount', 'billReminderForm')} fullWidth />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-6 text-center">
                        <FormControl variant="filled" fullWidth>
                            <InputLabel>Expense Category</InputLabel>
                            <Select
                                labelId="expense-category-label"
                                id="expense-category"
                                value={this.props.form.expenseCategory.value}
                                onChange={(event) => this.props.inputChangeHandler(event, 'expenseCategory', 'billReminderForm')}>
                                {this.getExpenseCategoryOptions()}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-6">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                minDate={new Date(today.getFullYear(), today.getMonth(), 1)}
                                maxDate={new Date(today.getFullYear(), today.getMonth() + 1, 0)}
                                openTo="year"
                                format="dd"
                                label="Deadline Date"
                                variant="filled"
                                views={["date"]}
                                value={this.props.form.deadlineDate.value}
                                fullWidth
                                onChange={(event) => this.props.dateChangeHandler(event, 'deadlineDate', 'billReminderForm')}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12 text-center">
                        <Button id="add-bill-reminder"
                            onClick={this.addHandler} disabled={!utility.checkFormValidity(this.props.form)}
                            variant="contained" color="default">Add</Button>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default MonthlyReminders;