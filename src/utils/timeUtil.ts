export const convertDateToFormattedString = (date: Date | string) => {
  if (typeof date === 'string') date = new Date(date);

  const yy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return `${yy}/${mm}/${dd}`;
};
