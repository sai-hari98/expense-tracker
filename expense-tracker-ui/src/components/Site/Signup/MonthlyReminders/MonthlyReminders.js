import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxillary';
import { Button } from '@material-ui/core';
import classes from './MonthlyReminders.module.css';
import AddMonthlyReminder from '../../../Expense/AddMonthlyReminder';
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
        return (
            <Aux>
                <div className={"row justify-content-center " + classes['max-height']}>
                    {this.props.billReminders.length > 0 ? this.getAddedReminders() : <span className="text-center mt-1 mb-1">Add atleast one Bill Reminder</span>}
                </div>
                <AddMonthlyReminder form={this.props.form}
                inputChangeHandler={this.props.inputChangeHandler}
                dateChangeHandler={this.props.dateChangeHandler}
                addHandler={this.addHandler}
                expenseCategories={this.props.expenseCategories}/>
            </Aux>
        );
    }
}

export default MonthlyReminders;