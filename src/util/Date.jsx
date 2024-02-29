export const formattedDate = (timestamp) => {
  if (!timestamp) {
    return 'Invalid Date';
  }

  if (timestamp instanceof Date) {
    // timestamp가 JS의 'Date' 객체일 때
    return timestamp.toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  } else if (timestamp.toDate && typeof timestamp.toDate === 'function') {
    // timestamp가 firestore의 timestamp 객체일 때
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
  } else {
    return 'Invalid Date';
  }
};
