export const session = () => {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [cookieName] = cookie.split('=');
    if (cookieName === 'session') {
      return true;
    }
  }
  return false;
};
