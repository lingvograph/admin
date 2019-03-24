import tokenStore from './token';

const stdHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export function fetchJSON(url, payload, options = {}) {
  const token = tokenStore.value;

  const headers = {
    ...stdHeaders,
    Authorization: token ? `Bearer ${token}` : undefined,
    ...(options.headers || {}),
  };

  return fetch(url, {
    method: options.method || (payload !== undefined ? 'POST' : 'GET'),
    headers,
    body: payload !== undefined ? JSON.stringify(payload) : undefined,
    ...options,
  }).then(resp => resp.json());
}

export function post(url, payload, options = {}) {
  return fetchJSON(url, payload, {
    ...options,
    method: 'POST',
  });
}

export function get(url, options = {}) {
  return fetchJSON(url, undefined, {
    ...options,
    method: 'GET',
  });
}

export function me() {
  return get('/api/me');
}

export function login(username, password) {
  const creds = btoa(`${username}:${password}`);
  return post('/api/login', undefined, {
    headers: {
      Authorization: `Basic ${creds}`,
    },
  }).then(resp => {
    tokenStore.value = resp.token;
    return me();
  });
}
