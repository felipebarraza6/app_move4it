// Parse "YYYY-MM-DD" as a local date (no timezone shift)
export function parseDateYMDLocal(dateString) {
  if (!dateString || typeof dateString !== "string") return null;
  const parts = dateString.split("-");
  if (parts.length !== 3) return new Date(dateString);
  const year = Number(parts[0]);
  const monthIndex = Number(parts[1]) - 1; // 0-based
  const day = Number(parts[2]);
  const d = new Date(year, monthIndex, day);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function normalizeDateOnly(date) {
  if (!(date instanceof Date)) return date;
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}
