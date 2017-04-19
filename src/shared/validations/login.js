import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  if (Validator.isNull(data.identifier)) {
    errors.identifier = 'Заполните поле';
  }

  if (Validator.isNull(data.password)) {
    errors.password = 'Заполните поле';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}