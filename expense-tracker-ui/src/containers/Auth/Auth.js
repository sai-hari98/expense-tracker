import React, { Component } from 'react';
import * as utility from '../../common/utility';
class Auth extends Component {

    state = {
        authForm: utility.authFormGenerator(),
        formValid: false
    }

    render() {
        return;
    }

}

export default Auth;