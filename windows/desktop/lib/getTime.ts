export default function getTime(date: Date) {
  const formatter = new Intl.DateTimeFormat("de", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return formatter.format(date);
}
