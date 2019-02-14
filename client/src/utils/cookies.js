export default function getCookieMap() {
  const rawCookies = document.cookie;
  return rawCookies.split(';').reduce((res, cookie) => {
    const trimCookie = cookie.trim();
    const splitCookie = trimCookie.split('=');

    const cookieKey = splitCookie[0];
    const cookieValue = splitCookie.slice(1).join('');

    return {
      ...res,
      [cookieKey]: cookieValue,
    };
  }, {});
}
