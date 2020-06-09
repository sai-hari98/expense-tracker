import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Aux from '../../../../hoc/Auxillary';
import * as utility from '../../../../common/utility';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import classes from './MonthlyIncome.module.css';

class MonthlyIncome extends Component {

    addHandler = () => {
        let data = {
            sourceName: this.props.form.sourceName.value,
            amount: this.props.form.amount.value,
            incomeCategory: this.props.form.incomeCategory.value
        };
        this.props.add(data, 'incomeSources');
    }

    getIncomeCategoryOptions = () => {
        return this.props.incomeCategories.map(category => {
            return <MenuItem value={category} key={category.id} selected={category.id === this.props.form.incomeCategory.value.id}>{category.categoryName}</MenuItem>
        });
    }

    getAddedSources = () => {
        return this.props.incomeSources.map((source, index) => {
            return (
                <Aux key={index}>
                    <div className="col-10 mt-1">
                        {"Source: " + source.sourceName + " Amount: " + source.amount + " Category: " + source.incomeCategory.categoryName}
                    </div>
                    <div className="col-2 mt-1">
                        <Button className="bg-danger text-white" onClick={() => this.props.remove(index, 'incomeSources')}>Remove</Button>
                    </div>
                </Aux>
            );
        })
    }
    render() {
        return (
            <Aux>
                <div className={"row justify-content-center " + classes['max-height']}>
                    {this.props.incomeSources.length > 0 ? this.getAddedSources() : <span className="text-center mt-1 mb-1">Add atleast one Income Source</span>}
                </div>
                <div className="row mt-2">
                    <div className="col-6 text-center">
                        <TextField helperText={utility.checkInvalid('sourceName', this.props.form) ? 'Source Name should not be empty' : ' '}
                            error={utility.checkInvalid('sourceName', this.props.form)}
                            id="source-name" label="Income Source Name" variant="filled" color="primary"
                            value={this.props.form.sourceName.value} onChange={(event) => this.props.inputChangeHandler(event, 'sourceName', 'incomeForm')} fullWidth />
                    </div>
                    <div className="col-6 text-center">
                        <TextField helperText={utility.checkInvalid('amount', this.props.form) ? 'Amount should be a number' : ' '}
                            error={utility.checkInvalid('amount', this.props.form)}
                            id="amount"
                            label="Amount" variant="filled" color="primary"
                            value={this.props.form.amount.value} onChange={(event) => this.props.inputChangeHandler(event, 'amount', 'incomeForm')} fullWidth />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-6 text-center">
                        <FormControl variant="filled" fullWidth>
                            <InputLabel>Income Category</InputLabel>
                            <Select
                                labelId="income-category-label"
                                id="income-category"
                                value={this.props.form.incomeCategory.value}
                                onChange={(event) => this.props.inputChangeHandler(event, 'incomeCategory', 'incomeForm')}>
                                {this.getIncomeCategoryOptions()}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-6 text-center">
                        <Button id="add-income-source"
                            onClick={this.addHandler} disabled={!utility.checkFormValidity(this.props.form)}
                            variant="contained" color="default">Add</Button>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default MonthlyIncome;