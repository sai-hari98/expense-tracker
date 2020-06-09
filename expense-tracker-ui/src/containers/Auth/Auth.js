import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import * as utility from '../../common/utility';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import axios from '../../expense-tracker-axios';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
class Auth extends Component {

    state = {
        authForm: utility.authFormGenerator(),
        formValid: false,
        progress: false,
        openSnackbar: false,
        errorMessage: '',
        snackbarSeverity: ''
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

    checkInvalid = (fieldName) => {
        return !this.state.authForm[fieldName].valid && this.state.authForm[fieldName].dirty;
    }

    handleSnackbarClose = () => {
        this.setState({ openSnackbar: false, errorMessage: '' });
    }

    loginHandler = () => {
        let encodedAuth = new Buffer(this.state.authForm.email.value + ':' + this.state.authForm.password.value).toString('base64');
        this.setState({ progress: true });
        axios.get('/user-service/login', { headers: { 'Authorization': 'Basic ' + encodedAuth } }).then(response => {
            utility.setCredentials(response.data.token, response.data.userId, true);
            this.props.setToken(response.data.token, response.data.userId);
            this.setState({ progress: false });
            this.props.history.replace('/');
        }).catch(error => {
            if (error.response.status === 401) {
                this.setState({ progress: false, openSnackbar: true, errorMessage: 'Invalid Username or Password', snackbarSeverity: 'error' });
            } else {
                this.setState({ progress: false, openSnackbar: true, errorMessage: 'Issue in server side', snackbarSeverity: 'error' });
            }
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <Snackbar elevation={6} variant="filled" anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={this.state.openSnackbar} autoHideDuration={6000} onClose={this.handleSnackbarClose}>
                            <Alert onClose={this.handleSnackbarClose} severity={this.state.snackbarSeverity}>
                                {this.state.errorMessage}
                            </Alert>
                        </Snackbar>
                        <div className="row mt-5">
                            <div className="col-12">
                                {this.state.progress ? <LinearProgress /> : " "}
                            </div>
                        </div>
                        <div className="row mt-2">
                            <h4 className="col-12 text-center">
                                Login
                    </h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-12 text-center">
                                <TextField id="email" helperText={this.checkInvalid('email') ? 'Invalid Email' : ' '}
                                    error={this.checkInvalid('email')}
                                    label="E-Mail"
                                    variant="filled"
                                    value={this.state.authForm.email.value}
                                    onChange={(event) => this.inputChangeHandler(event, 'email')} fullWidth />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-12 text-center">
                                <TextField id="password"
                                    helperText={this.checkInvalid('password') ? 'Password should be of 8-16 characters' : ' '}
                                    error={this.checkInvalid('password')}
                                    type="password"
                                    label="Password"
                                    variant="filled"
                                    value={this.state.authForm.password.value}
                                    onChange={(event) => this.inputChangeHandler(event, 'password')} fullWidth />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-12 text-center">
                                <Button variant="contained" disabled={!this.state.formValid} onClick={this.loginHandler}>Login</Button> <br /><br />
                                <Link to="/signup" style={{ textDecoration: 'none' }}>New User? Click here to signup</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapActionsToProps = dispatch => {
    return {
        setToken: (token, userId) => dispatch(actions.setToken(token, userId))
    }
}
const mapStateToProps = state => {
    return {
        darkMode: state.app.darkMode
    }
}
export default connect(mapStateToProps, mapActionsToProps)(Auth);