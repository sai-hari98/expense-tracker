import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxillary';
import { Button } from '@material-ui/core';
import classes from './MonthlyIncome.module.css';
import AddMonthlyIncome from '../../../Expense/AddMonthlyIncome';
class MonthlyIncome extends Component {

    addHandler = () => {
        let data = {
            sourceName: this.props.form.sourceName.value,
            amount: this.props.form.amount.value,
            incomeCategory: this.props.form.incomeCategory.value
        };
        this.props.add(data, 'incomeSources');
    }

    getAddedSources = () => {
        if (this.props.incomeSources) {
            if (this.props.incomeSources.length > 0) {
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
            } else {
                return <span className="text-center mt-1 mb-1">Add atleast one Income Source</span>;
            }
        } else {
            return null;
        }
    }
    render() {
        return (
            <Aux>
                <div className={"row justify-content-center " + classes['max-height']}>
                    {this.getAddedSources()}
                </div>
                <AddMonthlyIncome form={this.props.form}
                inputChangeHandler={this.props.inputChangeHandler}
                dateChangeHandler={this.props.dateChangeHandler}
                addHandler={this.addHandler}
                incomeCategories={this.props.incomeCategories}/>
            </Aux>
        );
    }
}

export default MonthlyIncome;