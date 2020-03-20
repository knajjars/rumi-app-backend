export function getTodayDate(): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return today.toDateString();
}

export function getMaxDate(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  date.setHours(23, 59, 59, 999);

  return date.toDateString();
}
