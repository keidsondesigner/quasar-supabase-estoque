export function validateEmail(email) {
  return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
}

export function validateText(name, minLength) {
  return [
    (val) => val.length || `${name} é obrigatório`,
    (val) => val.length >= minLength || `${name} deve conter ${minLength} ou mais caracteres`,
  ];
}
