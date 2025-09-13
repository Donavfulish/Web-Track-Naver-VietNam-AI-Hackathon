function timeAgo(dateString: string) {
  const now = new Date();
  const utcDate = new Date(dateString);
  const localDate = new Date(
    utcDate.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
  );
  console.log(localDate, 'gat', now)
  const seconds = Math.floor((now.getTime() - localDate.getTime()) / 1000);
  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const amount = Math.floor(seconds / value);
    if (amount >= 1) {
      return `${amount} ${unit}${amount > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export default timeAgo;