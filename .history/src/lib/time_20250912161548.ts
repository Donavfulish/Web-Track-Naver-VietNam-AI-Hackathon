function toVNDate(dateString: string): Date {
  const utcDate = new Date(dateString);

  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // "12/09/2025, 16:14:15"
  const parts = formatter.formatToParts(utcDate);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";

  const year = get("year");
  const month = get("month");
  const day = get("day");
  const hour = get("hour");
  const minute = get("minute");
  const second = get("second");

  return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}+07:00`);
}

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