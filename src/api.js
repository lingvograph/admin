import * as axios from 'axios';
import token from './token';

export const DEFAULT_LIMIT = 20;

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(config => {
  if (token.value && !config.auth) {
    config.headers['Authorization'] = `Bearer ${token.value}`;
  }
  return config;
});

export function login(username, password) {
  return axios
    .post('/api/login', undefined, {
      auth: { username, password },
    })
    .then(resp => {
      token.value = resp.data.token;
      return me();
    });
}

function makeCancelConfig(abortController) {
  if (abortController) {
    const source = axios.CancelToken.source();
    abortController.signal.addEventListener('abort', () => {
      source.cancel('canceled');
    });
    return {
      cancelToken: source.token,
    };
  }
  return {};
}

export function get(path, params = {}, config = {}) {
  const { abortController, ...axiosConfig } = config;
  const combinedConfig = {
    ...axiosConfig,
    ...makeCancelConfig(abortController),
  };
  return axios.get(path, { params, ...combinedConfig }).then(resp => resp.data);
}

export function me() {
  return get('/api/me');
}

export function paginationParams(qs, defaultLimit = DEFAULT_LIMIT) {
  const params = new URLSearchParams(qs);
  const page = parseInt(params.get('page'), 10);
  const limit = parseInt(params.get('limit'), 10);
  return {
    page: isNaN(page) || page <= 0 ? 1 : page,
    limit: isNaN(limit) || limit <= 0 ? defaultLimit : page,
  };
}

export function getList(path, {abortController, page = 1, limit = DEFAULT_LIMIT}) {
  const offset = (page - 1) * 100;
  const params = new URLSearchParams();
  params.append('offset', offset);
  params.append('limit', limit);
  return get(path, params, { abortController });
}

export const user = {
  get({id, abortController}) {
    return get(`/api/data/user/${id}`, {}, { abortController });
  },
  list({abortController, page = 1, limit = DEFAULT_LIMIT}) {
    return getList('/api/data/user/list', {abortController, page, limit});
  }
};

export const term = {
  // TODO custom queries
  get({id, abortController}) {
    return get(`/api/data/term/${id}`, {}, { abortController });
  },
  list({abortController, page = 1, limit = DEFAULT_LIMIT}) {
    return getList('/api/data/term/list', {abortController, page, limit});
  }
};
