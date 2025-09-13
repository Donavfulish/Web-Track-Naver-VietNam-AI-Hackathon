function timeAgo(dateString: string) {
  // Chuyển "HH:mm:ss dd/MM/yyyy" thành Date
  const [timePart, datePart] = dateString.split(' ');
  const [hours, minutes, seconds] = timePart.split(':').map(Number);
  const [day, month, year] = datePart.split('/').map(Number);

  const date = new Date(year, month - 1, day, hours, minutes, seconds); // JS tháng từ 0

  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const amount = Math.floor(secondsAgo / value);
    if (amount >= 1) {
      return `${amount} ${unit}${amount > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

export default timeAgo;
