// helper function to create a simple string date like "2020-01-01"
export function getDateString(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
