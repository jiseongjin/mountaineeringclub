export const formattedDate = (timestamp) => {
  const dateObject = timestamp.toDate();
  return new Date(dateObject).toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};
