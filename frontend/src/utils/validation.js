export const isPositiveNumber = (value) => {
  const number = Number(value);

  return Number.isFinite(number) && number > 0;
};

export const isNonNegativeNumber = (value) => {
  const number = Number(value);

  return Number.isFinite(number) && number >= 0;
};

export const percentageIsValid = (value) => {
  const number = Number(value);

  return Number.isFinite(number) &&
    number >= 0 &&
    number <= 100;
};