export const logout = () => {
  document.cookie = 'token=; Max-Age=0; Path=/';
  window.location.href = '/login';
};
