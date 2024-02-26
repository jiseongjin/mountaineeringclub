export const formattedDate = (timestamp) => {
  if (timestamp instanceof Date) {
    // 이미 Date 객체인 경우 변환 필요 없음
    return new Date(timestamp).toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  } else if (timestamp.toDate instanceof Function) {
    // Firestore Timestamp 객체인 경우 toDate() 메서드 사용
    return timestamp.toDate().toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  } else {
    // 그 외의 경우 예외 처리 또는 기본값 반환
    console.error('Invalid timestamp:', timestamp);
    return '';
  }
};
