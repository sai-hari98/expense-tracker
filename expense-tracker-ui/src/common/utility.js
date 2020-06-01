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
        }
    }
}

const validateEmail = (email) => {
    let regEx = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    return regEx.test(email);
}

export const checkFormValidity = (form) => {
    let valid = true;
    for (let key of Object.keys(form)) {
        // console.log(key + ' : ' + form[key].valid);
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

export const inputFieldStyles = () => {
    return {
        color: '#000000'
    }
}

export const setCredentials = (token, userId, loggedIn) => {
    if (loggedIn) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }
}