export const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

export const toPascalCase = (str) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    .join("");

export const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);

  return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
};
