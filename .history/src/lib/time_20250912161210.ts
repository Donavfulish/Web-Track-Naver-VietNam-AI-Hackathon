function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const localDate = new Date(dateString);
const vnTime = localDate.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

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