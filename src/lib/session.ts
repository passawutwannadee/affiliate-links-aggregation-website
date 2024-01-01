export const session = () => {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [cookieName] = cookie.split('=');
    if (cookieName === 'session') {
      console.log(cookieName);
      return true;
    }
  }
  console.log('no cookie');
  return false;
};
