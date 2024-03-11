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

export const formatRelativeDate = (date) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thisYear = new Date(now.getFullYear(), 0, 1);
  const dateObj = new Date(date);

  // Format for time
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  // Format for dd/mm
  const dayMonthOptions = { day: "2-digit", month: "2-digit" };
  // Format for dd/mm/yy
  const dayMonthYearOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };

  // If the date is today and not in the future
  if (dateObj >= today && dateObj.getDate() === now.getDate()) {
    return new Intl.DateTimeFormat("default", timeOptions).format(dateObj);
  }
  // If the date is this year but not today or in the future
  else if (dateObj >= thisYear && dateObj < now) {
    return new Intl.DateTimeFormat("default", dayMonthOptions).format(dateObj);
  }
  // If the date is before this year, or in the future
  else {
    return new Intl.DateTimeFormat("default", dayMonthYearOptions).format(
      dateObj,
    );
  }
};
