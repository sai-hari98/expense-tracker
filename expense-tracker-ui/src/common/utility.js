const authForm = {
    email: {
        value: '',
        validation: {
            required: true,
            email: true
        },
        valid: false,
        dirty: false
    },
    password: {
        value: '',
        validation: {
            required: true,
            maxlength: 16,
            minlength: 8
        },
        valid: false,
        dirty: false
    }
}
export const authFormGenerator = () => {
    return authForm;
}

export const signupFormGenerator = () => {
    return {
        ...authForm,
        firstName: {
            value: '',
            validation: {
                required: true,
                maxlength: 30,
            },
            valid: false,
            dirty: false
        },
        lastName: {
            value: '',
            validation: {
                required: true,
                maxlength: 30,
            },
            valid: false,
            dirty: false
        },
        phoneNumber: {
            value: '',
            validation: {
                required: true,
                maxlength: 10,
                numeric: true,
                minlength: 10
            },
            valid: false,
            dirty: false
        },
        dateOfBirth: {
            value: new Date(),
            validation: {
                required: true,
            },
            valid: true,
            dirty: false
        },
        currency: {
            value: '',
            validation: {
                required: true,
                dropDown: true
            },
            valid: false,
            dirty: false
        },
        confirmPassword: {
            value: '',
            validation: {
                required: true,
                maxlength: 16,
                minlength: 8
            },
            valid: false,
            dirty: false
        },
        incomeSources: {
            value: [],
            valid: false,
            dirty: false
        },
        billReminders: {
            value: [],
            valid: false,
            dirty: false
        }
    }
}

export const getIncomeSourceForm = () => {
    return {
        sourceName: {
            value: '',
            validation: {
                required: true,
                maxlength: 100,
                minlength: 1
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
        }
    }
}

export const getBillReminderForm = () => {
    let today = new Date();
    let defaultDate = new Date(today.getFullYear(), today.getMonth(), 5)
    return {
        billDescription: {
            value: '',
            validation: {
                required: true,
                maxlength: 100,
                minlength: 1
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
        deadlineDate: {
            value: defaultDate,
            validation: {
                required: true
            },
            dirty: false,
            valid: true
        },
        expenseCategory: {
            value: '',
            validation: {
                required: true,
                dropDown: true
            },
            valid: false,
            dirty: false
        }
    };
}
export const checkInvalid = (fieldName, form) => {
    return !form[fieldName].valid && form[fieldName].dirty;
}

const validateEmail = (email) => {
    let regEx = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    return regEx.test(email);
}

export const checkFormValidity = (form) => {
    let valid = true;
    for (let key of Object.keys(form)) {
        valid = valid && form[key].valid;
    }
    return valid;
}

export const validateFormField = (value, validation) => {
    let valid = true;
    if (validation.dropDown) {
        return valid && value !== null;
    }
    if (validation.required) {
        valid = valid && value.trim().length > 0;
    }
    if (validation.minlength) {
        valid = valid && value.trim().length >= validation.minlength;
    }
    if (validation.maxlength) {
        valid = valid && value.trim().length <= validation.maxlength;
    }
    if (validation.email) {
        valid = valid && validateEmail(value);
    }
    if (validation.numeric) {
        valid = valid && !isNaN(value);
    }
    return valid;
}

export const inputFieldStyle = (darkMode) => {
    return {
        color: darkMode ? '#ffffff' : '#000000',
        fontFamily: 'Noto Sans JP'
    }
};

export const setCredentials = (token, userId, loggedIn) => {
    if (loggedIn) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }
}