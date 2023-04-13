export function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date: Date) {
  return [
    padTo2Digits(date.getDate()),
    date.toLocaleString('en', { month: 'long' })

  ].join(' ');
}

export function changeDate(dateString: string) {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}, 
  ${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
  return formattedDate;
}