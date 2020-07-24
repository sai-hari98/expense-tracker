import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIncome from '../../components/Expense/AddIncome';
import AddMonthlyIncome from '../../components/Expense/AddMonthlyIncome';
import * as utility from '../../common/utility';
import axios from '../../expense-tracker-axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

class Income extends Component {

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
            incomeCategory: {
                value: '',
                validation: {
                    required: true,
                    dropDown: true
                },
                valid: false,
                dirty: false
            },
            date: {
                value: new Date(),
                validation: {
                    required: true
                },
                valid: true,
                dirty: false
            }
        },
        monthlyIncomeForm: utility.getIncomeSourceForm(),
        incomeCategories: [],
        openSnackbar: false,
        message: '',
        snackbarSeverity: ''
    }

    componentDidMount() {
        axios.get("/common-service/income-category").then(response => {
            this.setState({ incomeCategories: response.data });
        }).catch(error => {
            console.log(error.response);
        })
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
        axios.post("/expense-service/add-income", data, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }).then(response => {
            this.setState({openSnackbar:true, message:'Income Successfully Added', snackbarSeverity:'success'});
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                this.setState({ progress: false, openSnackbar: true, message: 'Session has expired. Please login again', snackbarSeverity: 'error' });
            } else {
                this.setState({ progress: false, openSnackbar: true, message: 'An Error Occurred. Try Again', snackbarSeverity: 'error' });
            }
        })
    }

    addMonthlyIncomeHandler = () => {
        let monthlyIncomeForm = this.state.monthlyIncomeForm;
        let data = {
            sourceName: monthlyIncomeForm.sourceName.value,
            amount: monthlyIncomeForm.amount.value,
            incomeCategory: monthlyIncomeForm.incomeCategory.value
        };
        let headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
        axios.post('/expense-service/monthly-income/add', data, { headers: headers }).then(response => {
            this.setState({openSnackbar:true, message:'Monthly Income Source Successfully Added', snackbarSeverity:'success'});
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                this.setState({ progress: false, openSnackbar: true, message: 'Session has expired. Please login again', snackbarSeverity: 'error' });
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
                        id="monthly-income">
                        <Typography>Add Monthly Income Details</Typography>
                    </AccordionSummary>
                    <AddMonthlyIncome
                        incomeCategories={this.state.incomeCategories}
                        form={this.state.monthlyIncomeForm}
                        inputChangeHandler={this.inputChangeHandler}
                        addHandler={this.addMonthlyIncomeHandler} />
                </Accordion>
            </div>
        );
    }
}

export default Income;