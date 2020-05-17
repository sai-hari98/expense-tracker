export const authFormGenerator = () => {
    return {
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
}