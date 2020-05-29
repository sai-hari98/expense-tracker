import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import * as utility from '../../../common/utility';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from '../../../expense-tracker-axios';
class Signup extends Component {

    state = {
        authForm: utility.signupFormGenerator(),
        currencyArray: [],
        formValid: false,
        openSnackbar: false,
        errorMessage: '',
        severity: '',
        progress: false
    }

    componentDidMount() {
        axios.get("/common-service/currency").then(response => {
            this.setState({ currencyArray: response.data });
        }).catch(error => {
            console.log(error);
        })
    }

    inputChangeHandler = (event, fieldName) => {
        let authFormCopy = { ...this.state.authForm };
        let inputFieldCopy = { ...authFormCopy[fieldName] };
        inputFieldCopy.value = event.target.value;
        inputFieldCopy.valid = utility.validateFormField(event.target.value, inputFieldCopy.validation);
        inputFieldCopy.dirty = true;
        authFormCopy[fieldName] = inputFieldCopy;
        this.setState({ authForm: authFormCopy }, () => {
            this.setState({ formValid: utility.checkFormValidity(this.state.authForm) });
        });
    }

    dateOfBirthChangeHandler = (date) => {
        let authFormCopy = { ...this.state.authForm };
        let inputFieldCopy = { ...authFormCopy['dateOfBirth'] };
        console.log(inputFieldCopy);
        inputFieldCopy.value = date;
        console.log(date);
        authFormCopy['dateOfBirth'] = inputFieldCopy;
        this.setState({ authForm: authFormCopy });
    }

    currencyItems = () => {
        return this.state.currencyArray.map(currency => {
            return <MenuItem value={currency} key={currency.id} selected={currency.id === this.state.authForm.currency.value.id}>{currency.currencyName}</MenuItem>
        });
    }

    checkInvalid = (fieldName) => {
        return !this.state.authForm[fieldName].valid && this.state.authForm[fieldName].dirty;
    }

    handleSnackbarClose = () => {
        this.setState({ openSnackbar: false });
    }

    signupHandler = () => {
        let authForm = this.state.authForm;
        if (authForm.password.value !== authForm.confirmPassword.value) {
            this.setState({ openSnackbar: true, errorMessage: 'Passwords do not match', severity: 'error' });
        } else {
            this.setState({ progress: true });
            let dob = this.state.authForm.dateOfBirth.value;
            let dobMonth = dob.getMonth() + 1 < 10 ? "0" + (dob.getMonth() + 1) : (dob.getMonth() + 1);
            let data = {
                firstName: this.state.authForm.firstName.value,
                lastName: this.state.authForm.lastName.value,
                email: this.state.authForm.email.value,
                phoneNumber: this.state.authForm.phoneNumber.value,
                dateOfBirth: dob.getDate() + "/" + dobMonth + "/" + dob.getFullYear(),
                currency: this.state.authForm.currency.value,
                password: this.state.authForm.password.value,
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
            ).catch()
        }
    }
    render() {
        let textFieldStyle = utility.inputFieldStyles();
        return (
            <div className="container">
                <Snackbar elevation={6} variant="filled" anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={this.state.openSnackbar} autoHideDuration={6000} onClose={this.handleSnackbarClose}>
                    <Alert onClose={this.handleSnackbarClose} severity={this.state.severity}>
                        {this.state.errorMessage}
                    </Alert>
                </Snackbar>
                <div className="row justify-content-center">
                    <div className="col-6">
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
                        <div className="row mt-2">
                            <div className="col-6 text-center">
                                <TextField helperText={this.checkInvalid('firstName') ? 'First Name should not be empty' : ' '} error={this.checkInvalid('firstName')} id="first-name" InputProps={{ style: { ...textFieldStyle, backgroundColor: '#ffffff', fontFamily: 'Noto Sans JP' } }} InputLabelProps={{ style: { ...textFieldStyle, fontFamily: 'Noto Sans JP' } }} label="First Name" variant="filled" color="primary" value={this.state.authForm.firstName.value} onChange={(event) => this.inputChangeHandler(event, 'firstName')} fullWidth />
                            </div>
                            <div className="col-6 text-center">
                                <TextField helperText={this.checkInvalid('lastName') ? 'Last Name should not be empty' : ' '} error={this.checkInvalid('lastName')} id="last-name" InputProps={{ style: { ...textFieldStyle, backgroundColor: '#ffffff', fontFamily: 'Noto Sans JP' } }} InputLabelProps={{ style: { ...textFieldStyle, fontFamily: 'Noto Sans JP' } }} label="Last Name" variant="filled" color="primary" value={this.state.authForm.lastName.value} onChange={(event) => this.inputChangeHandler(event, 'lastName')} fullWidth />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 text-center">
                                <TextField id="email" helperText={this.checkInvalid('email') ? 'Invalid Email' : ' '} error={this.checkInvalid('email')} InputProps={{ style: { ...textFieldStyle, backgroundColor: '#ffffff', fontFamily: 'Noto Sans JP' } }} InputLabelProps={{ style: { ...textFieldStyle, fontFamily: 'Noto Sans JP' } }} label="E-Mail" variant="filled" color="primary" value={this.state.authForm.email.value} onChange={(event) => this.inputChangeHandler(event, 'email')} fullWidth />
                            </div>
                            <div className="col-6 text-center">
                                <TextField id="phone-number" helperText={this.checkInvalid('phoneNumber') ? 'Phone Number is of 10 numbers' : ' '} error={this.checkInvalid('phoneNumber')} InputProps={{ style: { ...textFieldStyle, backgroundColor: '#ffffff', fontFamily: 'Noto Sans JP' } }} InputLabelProps={{ style: { ...textFieldStyle, fontFamily: 'Noto Sans JP' } }} label="Phone Number" variant="filled" color="primary" value={this.state.authForm.phoneNumber.value} onChange={(event) => this.inputChangeHandler(event, 'phoneNumber')} fullWidth />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-6 text-center">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        style={{ ...textFieldStyle, backgroundColor: '#ffffff', fontFamily: 'Noto Sans JP', borderRadius: '3px' }}
                                        InputProps={{ style: { fontFamily: 'Noto Sans JP' }, className: 'pl-1 pb-1 pt-1' }}
                                        InputLabelProps={{ style: { fontFamily: 'Noto Sans JP' }, className: 'mt-1 ml-1' }}
                                        disableFuture
                                        openTo="year"
                                        format="dd/MM/yyyy"
                                        label="Date of Birth"
                                        views={["year", "month", "date"]}
                                        value={this.state.authForm.dateOfBirth.value}
                                        fullWidth
                                        onChange={this.dateOfBirthChangeHandler}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="col-6 text-center">
                                <FormControl variant="filled" fullWidth>
                                    <InputLabel id="demo-simple-select-filled-label" style={{ ...textFieldStyle, backgroundColor: '#ffffff', fontFamily: 'Noto Sans JP' }}>Currency</InputLabel>
                                    <Select style={{ ...textFieldStyle, backgroundColor: '#ffffff', fontFamily: 'Noto Sans JP' }}
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={this.state.authForm.currency.value}
                                        onChange={(event) => this.inputChangeHandler(event, 'currency')}>
                                        {this.currencyItems()}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-6 text-center">
                                <TextField helperText={this.checkInvalid('password') ? 'Password should be of 8-16 characters' : ' '} error={this.checkInvalid('password')} id="password" InputProps={{ style: { ...textFieldStyle, backgroundColor: '#ffffff', fontFamily: 'Noto Sans JP' } }} InputLabelProps={{ style: { ...textFieldStyle, fontFamily: 'Noto Sans JP' } }} type="password" label="Password" variant="filled" color="primary" value={this.state.authForm.password.value} onChange={(event) => this.inputChangeHandler(event, 'password')} fullWidth />
                            </div>
                            <div className="col-6 text-center">
                                <TextField error={this.checkInvalid('confirmPassword')} helperText={this.checkInvalid('confirmPassword') ? 'Password should be of 8-16 characters' : ' '} id="confirm-password" InputProps={{ style: { ...textFieldStyle, backgroundColor: '#ffffff', fontFamily: 'Noto Sans JP' } }} InputLabelProps={{ style: { ...textFieldStyle, fontFamily: 'Noto Sans JP' } }} type="password" label="Confirm Password" variant="filled" color="primary" value={this.state.authForm.confirmPassword.value} onChange={(event) => this.inputChangeHandler(event, 'confirmPassword')} fullWidth />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-12 text-center">
                                <Button variant="contained" style={{ backgroundColor: '#E0E0E0' }} disabled={!this.state.formValid} onClick={this.signupHandler}>Signup</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Signup;