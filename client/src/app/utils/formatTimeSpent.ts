export function formatTimeSpent(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  } else if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${minutes}m`;
  }
}

export function convertToMinutes(timeString:string): number {
  if (!timeString) {
    return 0;
  }

  const timePattern = /^\s*(?:(\d{1,2})h)?\s*(?:(\d{1,2})m)?\s*$/;
  const matches = timeString.match(timePattern);

  if (!matches) {
    return 0;
  }

  const hours = parseInt(matches[1], 10) || 0;
  const minutes = parseInt(matches[2], 10) || 0;
  return hours * 60 + minutes;
}