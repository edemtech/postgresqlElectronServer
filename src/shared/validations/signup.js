import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
//функция валидации
export default function validateInput(data) {
	let errors = {};

	if (validator.isNull(data.username)) {
		errors.username = 'Заполните поле';
	}
	if (validator.isNull(data.email)) {
		errors.email = 'Заполните поле';
	}
	if (!validator.isEmail(data.email)){
		errors.email = 'Неправильный формат почты';
	}
	if (validator.isNull(data.password)) {
		errors.password = 'Заполните поле';
	}
	if (validator.isNull(data.passwordConfirmation)) {
		errors.passwordConfirmation = 'Заполните поле';
	}
	if (!validator.equals(data.password, data.passwordConfirmation)){
		errors.passwordConfirmation = 'Пароли должны совпадать';
	}
	if (validator.isNull(data.permission)) {
		errors.timezone = 'Заполните поле';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}