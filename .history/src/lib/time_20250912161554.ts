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


export default timeAgo;