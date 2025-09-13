function timeAgo(dateString?: string) {
  if (!dateString || typeof dateString !== "string") {
    return "Invalid date";
  }

  // Tách theo khoảng trắng
  const parts = dateString.split(" ");
  if (parts.length < 2) return "Invalid date";

  const [timePart, datePart] = parts;

  // Tách giờ phút giây
  const timeParts = timePart.split(":").map(Number);
  if (timeParts.length < 3) return "Invalid date";
  const [hours, minutes, seconds] = timeParts;

  // Tách ngày tháng năm
  const dateParts = datePart.split("/").map(Number);
  if (dateParts.length < 3) return "Invalid date";
  const [day, month, year] = dateParts;

  const date = new Date(year, month - 1, day, hours, minutes, seconds);
  if (isNaN(date.getTime())) return "Invalid date";

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
      return `${amount} ${unit}${amount > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export default timeAgo;
