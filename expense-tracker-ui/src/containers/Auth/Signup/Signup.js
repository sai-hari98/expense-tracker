import React, { PureComponent } from 'react';
import * as utility from '../../../common/utility';
import UserDetails from '../../../components/Site/Signup/UserDetails';
import MonthlyIncome from '../../../components/Site/Signup/MonthlyIncome/MonthlyIncome';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from '../../../expense-tracker-axios';
import Stepper from '../../../components/Site/Signup/Stepper';
import MonthlyReminders from '../../../components/Site/Signup/MonthlyReminders/MonthlyReminders';
class Signup extends PureComponent {

    state = {
        authForm: utility.signupFormGenerator(),
        incomeForm: utility.getIncomeSourceForm(),
        billReminderForm: utility.getBillReminderForm(),
        currencyArray: [],
        incomeCategories: [],
        expenseCategories: [],
        formValid: false,
        openSnackbar: false,
        errorMessage: '',
        severity: '',
        activeStep: 0,
        progress: false
    }

    componentDidMount() {
        axios.get("/common-service/signup/data").then(response => {
            let currencyArray = response.data.currencyArray;
            let incomeCategories = response.data.incomeCategories;
            let expenseCategories = response.data.expenseCategories;
            this.setState({ currencyArray: currencyArray, incomeCategories: incomeCategories, expenseCategories: expenseCategories });
        }).catch(error => {
            console.log(error);
        });
    }

    inputChangeHandler = (event, fieldName, formName) => {
        let formCopy = { ...this.state[formName] };
        let inputFieldCopy = { ...formCopy[fieldName] };
        inputFieldCopy.value = event.target.value;
        inputFieldCopy.valid = utility.validateFormField(event.target.value, inputFieldCopy.validation);
        inputFieldCopy.dirty = true;
        formCopy[fieldName] = inputFieldCopy;
        this.setState({ [formName]: formCopy }, () => {
            this.setState({ formValid: utility.checkFormValidity(this.state.authForm) });
        });
    }

    dateChangeHandler = (date, fieldName, formName) => {
        let formCopy = { ...this.state[formName] };
        let inputFieldCopy = { ...formCopy[fieldName] };
        inputFieldCopy.value = date;
        formCopy[fieldName] = inputFieldCopy;
        this.setState({ [formName]: formCopy });
    }

    nextHandler = (next) => {
        this.setState((prevState) => {
            let activeStp = next ? (prevState.activeStep + 1) : (prevState.activeStep - 1);
            return { ...prevState, activeStep: activeStp }
        });
    }

    handleSnackbarClose = () => {
        this.setState({ openSnackbar: false });
    }

    addMonthlyData = (data, arrayName) => {
        let formData = { ...this.state.authForm };
        let arrayData = [...formData[arrayName].value];
        arrayData.push(data);
        formData[arrayName].value = arrayData;
        formData[arrayName].dirty = true;
        formData[arrayName].valid = true;
        console.log('formData', formData);
        let newForm = arrayName === 'incomeSources' ? utility.getIncomeSourceForm() : utility.getBillReminderForm();
        let formName = arrayName === 'incomeSources' ? 'incomeForm' : 'billReminderForm';
        this.setState({ authForm: formData, [formName]: newForm, formValid: utility.checkFormValidity(this.state.authForm) });
    }

    removeMonthlyHandler = (index, arrayName) => {
        let formData = { ...this.state.authForm };
        let arrayData = [...formData[arrayName].value];
        arrayData.splice(index, 1);
        formData[arrayName].value = arrayData;
        if (arrayData.length <= 0) {
            formData[arrayName].valid = false;
        }
        this.setState({ authForm: formData, formValid: utility.checkFormValidity(this.state.authForm) });
    }

    signupHandler = () => {
        let authForm = this.state.authForm;
        if (authForm.password.value !== authForm.confirmPassword.value) {
            this.setState({ openSnackbar: true, errorMessage: 'Passwords do not match', severity: 'error' });
        } else {
            console.log("Password: " + this.state.authForm.password.value);
            this.setState({ progress: true });
            let dob = this.state.authForm.dateOfBirth.value;
            let dobMonth = dob.getMonth() + 1 < 10 ? "0" + (dob.getMonth() + 1) : (dob.getMonth() + 1);
            let data = {
                user: {
                    firstName: this.state.authForm.firstName.value,
                    lastName: this.state.authForm.lastName.value,
                    phoneNumber: this.state.authForm.phoneNumber.value,
                    email: this.state.authForm.email.value,
                    dateOfBirth: dob.getDate() + "/" + dobMonth + "/" + dob.getFullYear(),
                    currency: this.state.authForm.currency.value,
                    password:this.state.authForm.password.value
                },
                currency: this.state.authForm.currency.value,
                password: this.state.authForm.password.value,
                incomeSources: this.state.authForm.incomeSources.value,
                billReminders: this.state.authForm.billReminders.value,
            }
            axios.post('/user-service/users/create', data).then(
                response => {
                    if (response.data.status) {
                        this.setState({ openSnackbar: true, errorMessage: 'User Created Successfully. Redirecting to Login Screen...', severity: 'success', progress: false });
                        setTimeout(() => {
                            this.props.history.push("/login");
                        }, 5000);
                    } else {
                        this.setState({ openSnackbar: true, errorMessage: response.data.message, severity: 'error', progress: false });
                    }
                }
            ).catch((error) => {
                this.setState({ openSnackbar: true, errorMessage: 'An Error Occurred. Try Again', severity: 'error', progress: false })
            });
        }
    }

    getStepContent = () => {
        let stepContent = [
            <UserDetails
                authForm={this.state.authForm}
                inputChangeHandler={this.inputChangeHandler}
                dateChangeHandler={this.dateChangeHandler}
                currencyArray={this.state.currencyArray}
            />,
            <MonthlyIncome
                incomeSources={this.state.authForm.incomeSources.value}
                form={this.state.incomeForm}
                inputChangeHandler={this.inputChangeHandler}
                incomeCategories={this.state.incomeCategories}
                add={this.addMonthlyData} remove={this.removeMonthlyHandler} />,
            <MonthlyReminders
                billReminders={this.state.authForm.billReminders.value}
                form={this.state.billReminderForm}
                inputChangeHandler={this.inputChangeHandler}
                expenseCategories={this.state.expenseCategories}
                dateChangeHandler={this.dateChangeHandler}
                add={this.addMonthlyData} remove={this.removeMonthlyHandler} />
        ];
        return stepContent;
    }

    render() {
        return (
            <div className="container">
                <Snackbar elevation={6} variant="filled" anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={this.state.openSnackbar} autoHideDuration={6000} onClose={this.handleSnackbarClose}>
                    <Alert onClose={this.handleSnackbarClose} severity={this.state.severity}>
                        {this.state.errorMessage}
                    </Alert>
                </Snackbar>
                <div className="row justify-content-center">
                    <div className="col-8">
                        <div className="row mt-5">
                            <div className="col-12">
                                {this.state.progress ? <LinearProgress /> : " "}
                            </div>
                        </div>
                        <div className="row mt-2">
                            <h4 className="col-12 text-center">
                                Signup
                        </h4>
                        </div>
                        <Stepper stepContent={this.getStepContent()} activeStep={this.state.activeStep} />
                        <div className="row mt-2">
                            <div className="col-6">
                                <Button variant="contained" disabled={this.state.activeStep <= 0} onClick={() => this.nextHandler(false)}>Back</Button>
                                <Button className="ml-1" variant="contained" disabled={this.state.activeStep >= 2} onClick={() => this.nextHandler(true)}>Next</Button>
                            </div>
                            <div className="col-6 justify-content-right">
                                <Button className="text-right" variant="contained" disabled={!this.state.formValid} onClick={this.signupHandler}>Signup</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Signup;