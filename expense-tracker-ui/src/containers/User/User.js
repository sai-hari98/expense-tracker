import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import classes from './User.module.css';
import Box from '@material-ui/core/Box';
import { Button, LinearProgress } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import axios from '../../expense-tracker-axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import Auxilliary from '../../hoc/Auxillary';
import { validateFormField, getIncomeSourceForm, getBillReminderForm } from '../../common/utility'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import CategoryIcon from '@material-ui/icons/Category';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddMonthlyIncome from '../../components/Expense/AddMonthlyIncome';
import AddMonthlyReminder from '../../components/Expense/AddMonthlyReminder';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default class User extends Component {
    state = {
        tabValue: 0,
        firstName: {
            value: '',
            editMode: false,
            validation: {
                required: true,
                maxlength: 30,
            },
            valid: false,
            dirty: false
        },
        lastName: {
            value: '',
            editMode: false,
            validation: {
                required: true,
                maxlength: 30,
            },
            valid: false,
            dirty: false
        },
        dateOfBirth: {
            value: '',
            editMode: false
        },
        email: {
            value: '',
            editMode: false,
            validation: {
                required: true,
                email: true
            },
            valid: false,
            dirty: false
        },
        phoneNumber: {
            value: '',
            editMode: false,
            validation: {
                required: true,
                maxlength: 10,
                numeric: true,
                minlength: 10
            },
            valid: false,
            dirty: false
        },
        currency: {
            value: '',
            editMode: false
        },
        spinner: true,
        submitSpinner: false,
        monthlyIncomeForm: getIncomeSourceForm(),
        billReminderForm: getBillReminderForm(),
        monthlyIncomeSources: [],
        monthlyBillReminders: [],
        incomeCategories: [],
        expenseCategories: [],
        openSnackbar: false,
        openDialog: false,
        dialogContent: null,
        dialogTitle: '',
        snackbarSeverity: '',
        snackbarMessage: '',
        initialData: {}
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        let headers = {
            'Authorization': 'Bearer ' + token
        };
        axios.get('/common-service/categories').then(response => {
            this.setState({ incomeCategories: response.data.incomeCategories, expenseCategories: response.data.expenseCategories });
        }).then(error => { });
        axios.get('/user-service/users/get', { headers: headers }).then(response => {
            if (response.data !== null) {
                let data = response.data;
                let firstName = { ...this.state.firstName };
                firstName.value = data.firstName;
                firstName.valid = true;
                let lastName = { ...this.state.lastName };
                lastName.value = data.lastName;
                lastName.valid = true;
                let email = { ...this.state.email };
                email.value = data.email;
                email.valid = true;
                let phoneNumber = { ...this.state.phoneNumber };
                phoneNumber.value = data.phoneNumber;
                phoneNumber.valid = true;
                let dateOfBirth = { ...this.state.dateOfBirth };
                dateOfBirth.value = data.dateOfBirth;
                dateOfBirth.valid = true;
                let currency = { ...this.state.currency };
                currency.value = data.currency.currencyName;
                currency.valid = true;
                this.setState({
                    firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber,
                    dateOfBirth: dateOfBirth, currency: currency,
                    spinner: false, initialData: response.data
                }, () => { this.fetchMonthlyIncomeSources(); this.fetchMonthlyBillReminders() });
            } else {
                this.setState({ openSnackbar: true, snackbarSeverity: 'error', snackbarMessage: 'An error occurred while fetching User details' });
            }
        }).catch(error => {
            this.setState({ openSnackbar: true, snackbarSeverity: 'error', snackbarMessage: 'An error occurred while fetching User details' });
        })
    }

    getHeaders = () => {
        let token = localStorage.getItem('token');
        let headers = {
            'Authorization': 'Bearer ' + token
        };
        return { headers: headers };
    }

    fetchMonthlyIncomeSources = () => {
        axios.get('/expense-service/monthly-income/get', this.getHeaders()).then(response => {
            if (response.data !== null) {
                this.setState({ monthlyIncomeSources: response.data });
            } else {
                this.setState({ openSnackbar: true, snackbarSeverity: 'error', snackbarMessage: 'An error occurred while fetching Monthly Income Details' });
            }
        }).catch(error => {
            this.setState({ openSnackbar: true, snackbarSeverity: 'error', snackbarMessage: 'An error occurred while fetching Monthly Income details' });
        });
    }

    fetchMonthlyBillReminders = () => {
        axios.get('/expense-service/bill-reminder/get', this.getHeaders()).then(response => {
            if (response.data !== null) {
                this.setState({ monthlyBillReminders: response.data });
            } else {
                this.setState({ openSnackbar: true, snackbarSeverity: 'error', snackbarMessage: 'An error occurred while fetching Bill Reminder details' });
            }
        }).catch(error => {
            this.setState({ openSnackbar: true, snackbarSeverity: 'error', snackbarMessage: 'An error occurred while fetching Bill Reminder details' });
        });
    }

    handleTabChange = (event, newValue) => {
        this.setState({ tabValue: newValue });
    }

    changeInputValue = (event, fieldName) => {
        let field = { ...this.state[fieldName] }
        field.value = event.target.value;
        field.valid = validateFormField(field.value, field.validation);
        field.dirty = this.state.initialData[fieldName] !== field.value;
        this.setState({ [fieldName]: field });
    }

    toggleEdit = (fieldName, edit) => {
        let field = { ...this.state[fieldName] };
        if (field.edit !== edit) {
            field.editMode = edit;
            this.setState({ [fieldName]: field });
        }
    }

    checkFormDirty = () => {
        return this.state.email.dirty || this.state.firstName.dirty || this.state.lastName.dirty || this.state.phoneNumber.dirty;
    }

    checkFormEdit = () => {
        return this.state.email.editMode || this.state.firstName.editMode || this.state.lastName.editMode || this.state.phoneNumber.editMode;
    }

    handleSnackbarClose = () => {
        this.setState({ openSnackbar: false });
    }

    getPersonalInfoTabItems = () => {
        if (this.state.spinner) {
            return (
                <div className="row">
                    <div className="col-12 text-center">
                        <CircularProgress />
                    </div>
                </div>
            );
        } else {
            return (
                <Auxilliary>
                    <div className="row">
                        <label htmlFor="first-name" className="col-4 col-sm-4 col-md-3 col-lg-3">First Name</label>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                            <Input id="first-name"
                                value={this.state.firstName.value} disabled={!this.state.firstName.editMode}
                                onChange={(event) => this.changeInputValue(event, 'firstName')} fullWidth />
                        </div>
                        <div className="col-2">
                            {!this.state.firstName.editMode ? <Button onClick={() => this.toggleEdit('firstName', true)}><EditIcon /></Button> :
                                <Button onClick={() => this.toggleEdit('firstName', false)} disabled={!this.state.firstName.valid}><CheckIcon /></Button>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center text-danger">
                            {this.state.firstName.valid ? <span>&nbsp;</span> :
                                <span className={classes['error-font']}>First Name is mandatory</span>}
                        </div>
                    </div>
                    <div className="row mt-1">
                        <label htmlFor="last-name" className="col-4 col-sm-4 col-md-3 col-lg-3">Last Name</label>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                            <Input id="last-name"
                                value={this.state.lastName.value} disabled={!this.state.lastName.editMode}
                                onChange={(event) => this.changeInputValue(event, 'lastName')} fullWidth />
                        </div>
                        <div className="col-2">
                            {!this.state.lastName.editMode ? <Button onClick={() => this.toggleEdit('lastName', true)}><EditIcon /></Button> :
                                <Button onClick={() => this.toggleEdit('lastName', false)} disabled={!this.state.lastName.valid}><CheckIcon /></Button>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center text-danger">
                            {this.state.lastName.valid ? <span>&nbsp;</span> : <span className={classes['error-font']}>Last Name is mandatory</span>}
                        </div>
                    </div>
                    <div className="row mt-1">
                        <label htmlFor="date-of-birth" className="col-4 col-sm-4 col-md-3 col-lg-3">Date of Birth</label>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                            <Input id="date-of-birth"
                                value={this.state.dateOfBirth.value} disabled={!this.state.dateOfBirth.editMode}
                                onChange={(event) => this.changeInputValue(event, 'dateOfBirth')} fullWidth />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 text-right text-danger">
                            &nbsp;
                        </div>
                    </div>
                    <div className="row mt-1">
                        <label htmlFor="phone-number" className="col-4 col-sm-4 col-md-3 col-lg-3">Phone Number</label>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                            <Input id="phone-number"
                                value={this.state.phoneNumber.value} disabled={!this.state.phoneNumber.editMode}
                                onChange={(event) => this.changeInputValue(event, 'phoneNumber')} fullWidth />
                        </div>
                        <div className="col-2">
                            {!this.state.phoneNumber.editMode ? <Button onClick={() => this.toggleEdit('phoneNumber', true)}><EditIcon /></Button> :
                                <Button onClick={() => this.toggleEdit('phoneNumber', false)} disabled={!this.state.phoneNumber.valid}><CheckIcon /></Button>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center text-danger">
                            {this.state.phoneNumber.valid ? <span>&nbsp;</span> :
                                <span className={classes['error-font']}>Phone number is mandatory and should be numeric</span>}
                        </div>
                    </div>
                    <div className="row mt-1">
                        <label htmlFor="email" className="col-4 col-sm-4 col-md-3 col-lg-3">Email</label>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                            <Input id="email"
                                value={this.state.email.value} disabled={!this.state.email.editMode}
                                onChange={(event) => this.changeInputValue(event, 'email')} fullWidth />
                        </div>
                        <div className="col-2">
                            {!this.state.email.editMode ? <Button onClick={() => this.toggleEdit('email', true)}><EditIcon /></Button> :
                                <Button onClick={() => this.toggleEdit('email', false)} disabled={!this.state.email.valid}><CheckIcon /></Button>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center text-danger">
                            {this.state.email.valid ? <span>&nbsp;</span> : <span className={classes['error-font']}>Email is invalid</span>}
                        </div>
                    </div>
                    <div className="row mt-1">
                        <label htmlFor="name" className="col-4 col-sm-4 col-md-3 col-lg-3">Currency</label>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                            <Input id="currency"
                                value={this.state.currency.value} disabled={!this.state.currency.editMode}
                                onChange={(event) => this.changeInputValue(event, 'currency')} fullWidth />
                        </div>
                    </div>
                </Auxilliary>
            );
        }
    }

    updateUser = () => {
        let data = {
            firstName: this.state.firstName.value,
            lastName: this.state.lastName.value,
            dateOfBirth: this.state.dateOfBirth.value,
            phoneNumber: this.state.phoneNumber.value,
            email: this.state.email.value,
            currency: this.state.initialData.currency,
        }
        let headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
        axios.put('/user-service/users/update', data, { headers: headers }).then(response => {
            let initialData = {
                firstName: this.state.firstName.value,
                lastName: this.state.lastName.value,
                dateOfBirth: this.state.dateOfBirth.value,
                phoneNumber: this.state.phoneNumber.value,
                email: this.state.email.value,
                currency: this.state.initialData.currency
            };
            let firstName = { ...this.state.firstName };
            firstName.dirty = false;
            let lastName = { ...this.state.lastName };
            lastName.dirty = false;
            let email = { ...this.state.email };
            email.dirty = false;
            let phoneNumber = { ...this.state.phoneNumber };
            phoneNumber.dirty = false;
            this.setState({
                initialData: initialData, openSnackbar: true, snackbarMessage: 'User updated successfully',
                snackbarSeverity: 'success', firstName: firstName, lastName: lastName,
                email: email, phoneNumber: phoneNumber
            });
        }).catch(error => {

        })
    }

    inputChangeHandler = (event, fieldName, formName) => {
        let formCopy = { ...this.state[formName] };
        let inputFieldCopy = { ...formCopy[fieldName] };
        inputFieldCopy.value = event.target.value;
        inputFieldCopy.valid = validateFormField(event.target.value, inputFieldCopy.validation);
        inputFieldCopy.dirty = true;
        formCopy[fieldName] = inputFieldCopy;
        this.setState({ [formName]: formCopy }, () => {
            this.openDialog(formName === 'monthlyIncomeForm' ? 'monthlyIncome' : 'billReminder');
        });
    }

    dateChangeHandler = (date, fieldName, formName) => {
        let formCopy = { ...this.state[formName] };
        let inputFieldCopy = { ...formCopy[fieldName] };
        inputFieldCopy.value = date;
        formCopy[fieldName] = inputFieldCopy;
        this.setState({ [formName]: formCopy }, () => {
            this.openDialog(formName === 'monthlyIncomeForm' ? 'monthlyIncome' : 'billReminder');
        });
    }

    addMonthlyIncome = () => {
        this.setState({ submitSpinner: true, openDialog: false });
        let monthlyIncomeForm = { ...this.state.monthlyIncomeForm };
        let data = {
            sourceName: monthlyIncomeForm.sourceName.value,
            amount: monthlyIncomeForm.amount.value,
            incomeCategory: monthlyIncomeForm.incomeCategory.value
        }
        let headers = this.getHeaders();
        axios.post('/expense-service/monthly-income/add', data, headers).then(response => {
            let monthlyIncomeSources = [...this.state.monthlyIncomeSources];
            monthlyIncomeSources.push(data);
            this.setState({
                monthlyIncomeSources: monthlyIncomeSources, openSnackbar: true,
                snackbarMessage: 'Monthly Income added Succesfully', snackbarSeverity: 'success',
                submitSpinner: false
            });
        }).catch(error => {
            alert('failure');
            this.setState({
                snackbarMessage: 'An Error occurred while adding monthly income', openSnackbar: true, snackbarSeverity: 'error',
                submitSpinner: false
            });
        })
    }

    addBillReminder = () => {
        this.setState({ submitSpinner: true, openDialog: false });
        let billReminderForm = { ...this.state.billReminderForm };
        let data = {
            billDescription: billReminderForm.billDescription.value,
            amount: billReminderForm.amount.value,
            expenseCategory: billReminderForm.expenseCategory.value,
            deadlineDate: billReminderForm.deadlineDate.value.getDate()
        }
        let headers = this.getHeaders();
        axios.post('/expense-service/bill-reminder/add', data, headers).then(response => {
            let monthlyBillReminders = [...this.state.monthlyBillReminders];
            monthlyBillReminders.push(data);
            this.setState({
                monthlyBillReminders: monthlyBillReminders, openSnackbar: true,
                snackbarMessage: 'Bill Reminder added Succesfully', snackbarSeverity: 'success',
                submitSpinner: false
            });
        }).catch(error => {
            this.setState({
                snackbarMessage: 'An Error occurred while adding bill reminder', openSnackbar: true, snackbarSeverity: 'error',
                submitSpinner: false
            });
        })
    }

    removeBillReminder = (id) => {
        this.setState({ submitSpinner: true });
        let headers = this.getHeaders();
        console.log('billReminders', this.state.monthlyBillReminders);
        axios.delete('/expense-service/bill-reminder/delete?id=' + id, headers).then(response => {
            let monthlyBillReminders = [...this.state.monthlyBillReminders];
            let index = monthlyBillReminders.findIndex(reminder => reminder.id === id);
            monthlyBillReminders.splice(index, 1);
            this.setState({
                monthlyBillReminders: monthlyBillReminders, openSnackbar: true, submitSpinner: false,
                snackbarMessage: 'Bill Reminder removed Succesfully', snackbarSeverity: 'success'
            });
        }).catch(error => {
            this.setState({
                openSnackbar: true, snackbarMessage: 'An Error occurred while removing Bill Reminder', snackbarSeverity: 'error',
                submitSpinner: false
            });
        });
    }

    openDialog = (dialogTitle) => {
        let component = null;
        if (dialogTitle === 'monthlyIncome') {
            component = <AddMonthlyIncome form={this.state.monthlyIncomeForm}
                inputChangeHandler={this.inputChangeHandler}
                dateChangeHandler={this.dateChangeHandler}
                addHandler={this.addMonthlyIncome}
                incomeCategories={this.state.incomeCategories} />
        } else {
            component = <AddMonthlyReminder form={this.state.billReminderForm}
                inputChangeHandler={this.inputChangeHandler}
                dateChangeHandler={this.dateChangeHandler}
                addHandler={this.addBillReminder}
                expenseCategories={this.state.expenseCategories} />
        }
        this.setState({ openDialog: true, dialogTitle: dialogTitle, dialogContent: component });
    }

    handleDialogClose = () => {
        this.setState({ openDialog: false }, () => {
            this.setState({ monthlyIncomeForm: getIncomeSourceForm(), billReminderForm: getBillReminderForm() })
        });
    }

    render() {
        let today = new Date();
        return (
            <div className="container-fluid">
                <Snackbar open={this.state.openSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={6000} onClose={this.handleSnackbarClose}>
                    <Alert onClose={this.handleSnackbarClose} severity={this.state.snackbarSeverity}>
                        {this.state.snackbarMessage}
                    </Alert>
                </Snackbar>
                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleDialogClose}
                    aria-labelledby="dialog"
                >
                    <DialogTitle id="dialog">
                        {this.state.dialogTitle}
                    </DialogTitle>
                    <DialogContent>
                        {this.state.dialogContent}
                    </DialogContent>
                </Dialog>
                <div className="row mt-3">
                    <div className="col-12">
                        {this.state.submitSpinner ? <LinearProgress className="bg-primary" /> : <span>&nbsp;</span>}
                    </div>
                </div>
                <div className="row mt-3 justify-content-center">
                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                        <Tabs
                            orientation="horizontal"
                            variant="scrollable"
                            value={this.state.tabValue}
                            onChange={this.handleTabChange}
                        >
                            <Tab label="Personal Information" id='tab-0' aria-controls='tabpanel-0' />
                            <Tab label="Monthly Income Sources" id='tab-1' aria-controls='tabpanel-1' />
                            <Tab label="Monthly Bill Reminders" id='tab-2' aria-controls='tabpanel-2' />
                        </Tabs>
                        <TabPanel value={this.state.tabValue} index={0}>
                            {this.getPersonalInfoTabItems()}
                            <div className="row mt-2">
                                <div className="col-12 text-center">
                                    <Button variant="contained" disabled={!this.checkFormDirty() || this.checkFormEdit()}
                                        onClick={this.updateUser}>Save</Button>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={this.state.tabValue} index={1}>
                            <div className="row">
                                <div className={"col-12 text-center p-0 " + classes['list-group']}>
                                    {this.state.monthlyIncomeSources.length > 0 ? (
                                        <ul className="list-group">
                                            {this.state.monthlyIncomeSources.map((source, key) => {
                                                return (
                                                    <li className={"list-group-item list-group-item-action " + classes['list-item']} key={"source-" + key}>
                                                        <div className="row">
                                                            <div className="col-8 text-left">{source.sourceName}</div>
                                                            <div className="col-4 text-right">
                                                                <Button onClick={(event) => this.removeMonthlyIncome(source.id)}
                                                                    className="bg-danger text-white" size="small" variant="contained">Remove</Button>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-5 text-left">
                                                                <small><AccountBalanceWalletIcon /> {source.amount}</small>
                                                            </div>
                                                            <div className="col-5 text-left">
                                                                <small><CategoryIcon /> {source.incomeCategory.categoryName}</small>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    ) : <span>No Income Sources are added</span>}
                                </div>
                                <div className="col-12 text-center mt-1">
                                    <Button className="bg-primary text-white" size="medium" variant="contained"
                                        onClick={(event) => this.openDialog('monthlyIncome')}>Add Income Source</Button>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={this.state.tabValue} index={2}>
                            <div className="row">
                                <div className={"col-12 text-center p-0 " + classes['list-group']}>
                                    {this.state.monthlyBillReminders.length > 0 ? (
                                        <ul className="list-group">
                                            {this.state.monthlyBillReminders.map((reminder, key) => {
                                                return (
                                                    <li className={"list-group-item list-group-item-action " + classes['list-item']} key={"source-" + key}>
                                                        <div className="row">
                                                            <div className="col-8 text-left">{reminder.billDescription}</div>
                                                            <div className="col-4 text-right">
                                                                <Button
                                                                    onClick={(event) => this.removeBillReminder(reminder.id)}
                                                                    className="bg-danger text-white" size="small" variant="contained">Remove</Button>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-8 text-left">
                                                                <small><AccountBalanceWalletIcon /> {reminder.amount} &nbsp; <CategoryIcon /> {reminder.expenseCategory.categoryName}</small>
                                                            </div>
                                                            <div className="col-4 text-right">
                                                                <small>Deadline Date:{reminder.deadlineDate + "/" + today.getMonth() + "/" + today.getFullYear()}</small>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    ) : <span>No Bill Reminders are added</span>}
                                </div>
                                <div className="col-12 text-center mt-1">
                                    <Button className="bg-primary text-white" size="medium" variant="contained"
                                        onClick={(event) => this.openDialog('billReminder')}>Add Bill Reminder</Button>
                                </div>
                            </div>
                        </TabPanel>
                    </div>
                </div>
            </div>
        )
    }
}