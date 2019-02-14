import getCookieMap from 'utils/cookies';

const API_ROOT = process.env.USER_FEEDBACK_SYSTEM_UI_API_ROOT;

export default function callApi(method, endpoint, body, shouldSendToken = true) {
  const cookieMap = getCookieMap();

  const token = 'apiToken' in cookieMap ? cookieMap.apiToken : '';

  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  const fetchOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (shouldSendToken) {
    fetchOptions.headers.Authorization = `Bearer ${token}`;
  }

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  return fetch(fullUrl, fetchOptions)
    .then((response) => {
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json().then(json => ({ json, response }));
      }
      return response.text().then(text => ({ text, response }));
    }).catch(error => console.error('Error:', error));
}
