import React, { PureComponent } from 'react';
import Aux from '../../../hoc/Auxillary';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
class UserDetails extends PureComponent {

    checkInvalid = (fieldName) => {
        return !this.props.authForm[fieldName].valid && this.props.authForm[fieldName].dirty;
    }

    currencyItems = () => {
        return this.props.currencyArray.map(currency => {
            return <MenuItem value={currency} key={currency.id} selected={currency.id === this.props.authForm.currency.value.id}>{currency.currencyName}</MenuItem>
        });
    }

    render() {
        return (
            <Aux>
                <div className="row">
                    <div className="col-6 text-center">
                        <TextField helperText={this.checkInvalid('firstName') ? 'First Name should not be empty' : ' '}
                            error={this.checkInvalid('firstName')} inputProps={{ maxLength: 30 }}
                            id="first-name" label="First Name" variant="filled" color="primary"
                            value={this.props.authForm.firstName.value} onChange={(event) => this.props.inputChangeHandler(event, 'firstName', 'authForm')} fullWidth />
                    </div>
                    <div className="col-6 text-center">
                        <TextField helperText={this.checkInvalid('lastName') ? 'Last Name should not be empty' : ' '}
                            error={this.checkInvalid('lastName')} inputProps={{ maxLength: 30 }}
                            id="last-name" label="Last Name" variant="filled" color="primary"
                            value={this.props.authForm.lastName.value} onChange={(event) => this.props.inputChangeHandler(event, 'lastName', 'authForm')} fullWidth />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-6 text-center">
                        <TextField id="email" helperText={this.checkInvalid('email') ? 'Invalid Email' : ' '}
                            error={this.checkInvalid('email')}
                            label="E-Mail" variant="filled" color="primary" inputProps={{ maxLength: 255 }}
                            value={this.props.authForm.email.value} onChange={(event) => this.props.inputChangeHandler(event, 'email', 'authForm')} fullWidth />
                    </div>
                    <div className="col-6 text-center">
                        <TextField id="phone-number" helperText={this.checkInvalid('phoneNumber') ? 'Phone Number is of 10 numbers' : ' '}
                            error={this.checkInvalid('phoneNumber')} inputProps={{ maxLength: 10 }}
                            label="Phone Number" variant="filled" color="primary"
                            value={this.props.authForm.phoneNumber.value} onChange={(event) => this.props.inputChangeHandler(event, 'phoneNumber', 'authForm')} fullWidth />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-6 text-center">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                disableFuture
                                openTo="year"
                                format="dd/MM/yyyy"
                                label="Date of Birth"
                                variant="filled"
                                views={["year", "month", "date"]}
                                value={this.props.authForm.dateOfBirth.value}
                                fullWidth
                                onChange={(event) => this.props.dateChangeHandler(event, 'dateOfBirth', 'authForm')}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="col-6 text-center">
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">Currency</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={this.props.authForm.currency.value}
                                onChange={(event) => this.props.inputChangeHandler(event, 'currency', 'authForm')}>
                                {this.currencyItems()}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-6 text-center">
                        <TextField helperText={this.checkInvalid('password') ? 'Password should be of 8-16 characters' : ' '}
                            error={this.checkInvalid('password')}
                            id="password" type="password" label="Password" variant="filled" color="primary"
                            value={this.props.authForm.password.value} onChange={(event) => this.props.inputChangeHandler(event, 'password', 'authForm')} fullWidth />
                    </div>
                    <div className="col-6 text-center">
                        <TextField error={this.checkInvalid('confirmPassword')}
                            helperText={this.checkInvalid('confirmPassword') ? 'Password should be of 8-16 characters' : ' '}
                            id="confirm-password" type="password" label="Confirm Password" variant="filled" color="primary"
                            value={this.props.authForm.confirmPassword.value} onChange={(event) => this.props.inputChangeHandler(event, 'confirmPassword', 'authForm')} fullWidth />
                    </div>
                </div>
            </Aux>
        );
    }
}

export default UserDetails