export const required = (value) => value.trim() !== "";

export const length = (config) => (value) => {
  let isValid = true;
  if (config.min) {
    isValid = isValid && value.trim().length >= config.min;
  }
  if (config.max) {
    isValid = isValid && value.trim().length <= config.max;
  }
  return isValid;
};

export const range = (config) => (value) => {
  let isValid = true;
  if (config.min) {
    isValid = isValid && value >= config.min;
  }
  if (config.max) {
    isValid = isValid && value <= config.max;
  }
  return isValid;
};

export const validDate = (value) => {
  const currentDate = new Date();
  const submmitedDate = new Date(value);
  return currentDate < submmitedDate;
};

export const emailValidate = (value) =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    value
  );

export const passwordValidate = (value) =>
  value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/);
