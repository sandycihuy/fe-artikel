export function isMockEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.location.hostname === 'localhost' ||
    localStorage.getItem('useMock') === 'true'
  );
}
