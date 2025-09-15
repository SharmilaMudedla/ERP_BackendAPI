const parseValidations = (errorsArray) => {
  const errors = {};
  for (const error of errorsArray) {
    errors[error.path.split(".").pop()] = error.msg;
  }
  return errors;
};

export default parseValidations;
