import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Aux from '../../hoc/Auxillary';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { checkFormValidity, checkInvalid } from '../../common/utility';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default class AddExpense extends Component {

    getExpenseCategoriesOptions = () => {
        return this.props.expenseCategories.map(category => {
            return <MenuItem value={category} key={category.id} selected={category.id === this.props.form.expenseCategory.value.id}>{category.categoryName}</MenuItem>
        });
    } 

    render() {
        let today = new Date();
        return (
            <Aux>
                <div className="row">
                    <div className="col-6">
                        <TextField id="expense-desc" variant="filled" color="primary" label="Description" fullWidth
                            helperText={checkInvalid('description', this.props.form) ? 'Description should not be empty' : ' '}
                            error={checkInvalid('description', this.props.form)}
                            value={this.props.form.description.value}
                            onChange={(event) => this.props.inputChangeHandler(event, 'description', 'expenseForm')} />
                    </div>
                    <div className="col-6">
                        <TextField id="expense-amount" variant="filled" color="primary" label="Amount" fullWidth
                            helperText={checkInvalid('amount', this.props.form) ? 'Amount should be a valid number' : ' '}
                            error={checkInvalid('amount', this.props.form)}
                            value={this.props.form.amount.value}
                            onChange={(event) => this.props.inputChangeHandler(event, 'amount', 'expenseForm')} />
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
                                onChange={(event) => this.props.inputChangeHandler(event, 'expenseCategory', 'expenseForm')}>
                                {this.getExpenseCategoriesOptions()}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-6">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                minDate={new Date(today.getFullYear(), today.getMonth(), 1)}
                                maxDate={today}
                                openTo="year"
                                format="dd/MM/yyyy"
                                label="Date"
                                variant="filled"
                                views={["date"]}
                                value={this.props.form.date.value}
                                fullWidth
                                onChange={(event) => this.props.dateChangeHandler(event, 'date', 'expenseForm')}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12 text-center">
                        <Button className="ml-2" color="default" variant="contained"
                            disabled={!checkFormValidity(this.props.form)}
                            onClick={(event) => this.props.addHandler()}>Add</Button>
                    </div>
                </div>
            </Aux>
        )
    }
}