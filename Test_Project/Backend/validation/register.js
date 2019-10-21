const Validator = require('validator');
const isEmpty =  require('./isEmpty');

module.exports = function validateRegisterInput(data) {

    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';


    if (!Validator.isLength(data.name, { min : 2, max: 30})) {
        errors.name = 'Le nom doit etre composé entre 2 et 30 caractères';
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Le nom est obligatoire';
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'L\'email est invalide';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'L\'email est obligatoire';
    }

    if (!Validator.isLength(data.password, { min : 6, max: 30})) {
        errors.password= 'Le mot de passe doit etre composé entre 6 et 30 caractères';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Le password est obligatoire';
    }

    if (!Validator.isLength(data.password_confirm, { min : 6, max: 30})) {
        errors.password_confirm = 'Le mot de passe doit etre composé entre 6 et 30 caractères';
    }

    if(!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'Le password et le password_confirm doivent etre identiques';
    }

    if (Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'La confirmation du password  est obligatoire';
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }

}