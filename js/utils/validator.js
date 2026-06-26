export function required(value) {
  return String(value || "").trim().length > 0;
}

export function validateRequired(data, fields) {
  return fields.reduce((errors, field) => {
    if (!required(data[field])) {
      errors[field] = "This field is required.";
    }
    return errors;
  }, {});
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
