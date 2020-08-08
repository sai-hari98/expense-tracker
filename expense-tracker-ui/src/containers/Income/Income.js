import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIncome from '../../components/Expense/AddIncome';
import * as utility from '../../common/utility';
import axios from '../../expense-tracker-axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AddExpense from '../../components/Expense/AddExpense';

class Income extends Component {

    state = {
        incomeForm: utility.getIncomeExpenseForm('income'),
        expenseForm: utility.getIncomeExpenseForm('expense'),
        incomeCategories: [],
        expenseCategories: [],
        openSnackbar: false,
        message: '',
        snackbarSeverity: ''
    }

    componentDidMount() {
        axios.get('/common-service/categories').then(response => {
            this.setState({ incomeCategories: response.data.incomeCategories, expenseCategories: response.data.expenseCategories });
        }).then(error => { });
    }

    dateChangeHandler = (date, fieldName, formName) => {
        let formCopy = { ...this.state[formName] };
        let inputFieldCopy = { ...formCopy[fieldName] };
        inputFieldCopy.value = date;
        formCopy[fieldName] = inputFieldCopy;
        this.setState({ [formName]: formCopy });
    }

    addIncomeHandler = () => {
        let incomeForm = this.state.incomeForm;
        let incomeDate = incomeForm.date.value;
        console.log(incomeDate);
        let month = incomeDate.getMonth() + 1 < 10 ? "0" + (incomeDate.getMonth() + 1) : (incomeDate.getMonth() + 1);
        let data = {
            description: incomeForm.description.value,
            amount: incomeForm.amount.value,
            incomeCategory: incomeForm.incomeCategory.value,
            date: incomeDate.getDate() + "/" + month + "/" + incomeDate.getFullYear()
        }
        let headers = utility.getHeaders();
        axios.post("/expense-service/income/add", data, headers ).then(response => {
            this.setState({ openSnackbar: true, message: 'Income Successfully Added', snackbarSeverity: 'success' });
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                this.setState({ progress: false, openSnackbar: true, message: 'Login session expired', snackbarSeverity: 'error' });
                setTimeout(() => {
                    utility.removeCredentialsAndRefresh();
                }, 4000);
            } else {
                this.setState({ progress: false, openSnackbar: true, message: 'An Error Occurred. Try Again', snackbarSeverity: 'error' });
            }
        })
    }

    addExpenseHandler = () => {
        let expenseForm = this.state.expenseForm;
        let data = {
            description: expenseForm.description.value,
            amount: expenseForm.amount.value,
            expenseCategory: expenseForm.expenseCategory.value,
            date: expenseForm.date.value
        };
        let headers = utility.getHeaders();
        axios.post('/expense-service/expense/add', data, headers).then(response => {
            this.setState({ openSnackbar: true, message: 'Expense added successfully', snackbarSeverity: 'success' });
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                this.setState({ progress: false, openSnackbar: true, message: 'Login session expired', snackbarSeverity: 'error' });
                setTimeout(() => {
                    utility.removeCredentialsAndRefresh();
                }, 4000);
            } else {
                this.setState({ progress: false, openSnackbar: true, message: 'An Error Occurred. Try Again', snackbarSeverity: 'error' });
            }
        });
    }

    inputChangeHandler = (event, fieldName, formName) => {
        let formCopy = { ...this.state[formName] };
        let inputFieldCopy = { ...formCopy[fieldName] };
        inputFieldCopy.value = event.target.value;
        inputFieldCopy.valid = utility.validateFormField(event.target.value, inputFieldCopy.validation);
        inputFieldCopy.dirty = true;
        console.log(formName);
        formCopy[fieldName] = inputFieldCopy;
        this.setState({ [formName]: formCopy });
    }

    handleSnackbarClose = () => {
        this.setState({ openSnackbar: false, errorMessage: '' });
    }

    render() {
        return (
            <div className="container mt-5 pt-4">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <Snackbar elevation={6} variant="filled" anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={this.state.openSnackbar} autoHideDuration={6000} onClose={this.handleSnackbarClose}>
                            <Alert onClose={this.handleSnackbarClose} severity={this.state.snackbarSeverity}>
                                {this.state.message}
                            </Alert>
                        </Snackbar>
                    </div>
                </div>
                <Accordion style={{ backgroundColor: 'inherit', padding: '10px' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="income">
                        <Typography>Add Income Details</Typography>
                    </AccordionSummary>
                    <AddIncome incomeCategories={this.state.incomeCategories}
                        inputChangeHandler={this.inputChangeHandler}
                        form={this.state.incomeForm}
                        dateChangeHandler={this.dateChangeHandler}
                        addHandler={this.addIncomeHandler} />
                </Accordion>
                <Accordion style={{ backgroundColor: 'inherit', padding: '10px' }}>
                    <AccordionSummary
                        style={{ marginLeft: '0px' }}
                        expandIcon={<ExpandMoreIcon />}
                        id="expense">
                        <Typography>Add Expense Details</Typography>
                    </AccordionSummary>
                    <AddExpense expenseCategories={this.state.expenseCategories}
                        inputChangeHandler={this.inputChangeHandler}
                        form={this.state.expenseForm}
                        dateChangeHandler={this.dateChangeHandler}
                        addHandler={this.addExpenseHandler} />
                </Accordion>
            </div>
        );
    }
}

export default Income;