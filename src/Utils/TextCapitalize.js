export const textCapitalize = (value) => {
  try {
    return value[0].toUpperCase() + value.slice(1).toLowerCase();
  } catch (error) {
    return value;
  }
};
