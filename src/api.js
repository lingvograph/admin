import * as axios from 'axios';
import token from './token';
import { makeTermQuery } from './termquery';

export const DEFAULT_LIMIT = 11;

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

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

function makeAxiosConfig(options = {}) {
  const { abortController, ...axiosConfig } = options;
  return {
    ...axiosConfig,
    ...makeCancelConfig(abortController),
  };
}

export function get(path, params = {}, options = {}) {
  const config = makeAxiosConfig(options);
  return axios.get(path, { params, ...config }).then(resp => resp.data);
}

export function post(path, data, options = {}) {
  const config = makeAxiosConfig(options);
  return axios.post(path, data, config).then(resp => resp.data);
}

export function put(path, data, options = {}) {
  const config = makeAxiosConfig(options);
  return axios.put(path, data, config).then(resp => resp.data);
}

export function query(queryString, options = {}) {
  const config = makeAxiosConfig(options);
  return axios.post('/api/query', queryString, config).then(resp => resp.data);
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

export function getList(path, { abortController, page = 1, limit = DEFAULT_LIMIT }) {
  const offset = (page - 1) * limit;
  const params = new URLSearchParams();
  params.append('offset', offset);
  params.append('limit', limit);
  return get(path, params, { abortController });
}

export const user = {
  get({ id, abortController }) {
    return get(`/api/data/user/${id}`, {}, { abortController });
  },
  list({ abortController, page = 1, limit = DEFAULT_LIMIT }) {
    return getList('/api/data/user/list', { abortController, page, limit });
  },
};

export const tag = {
  get({ id, abortController }) {
    return get(`/api/data/tag/${id}`, {}, { abortController });
  },
  list({ abortController, page = 1, limit = DEFAULT_LIMIT }) {
    return getList('/api/data/tag/list', { abortController, page, limit });
  },
  update({ id, data, abortController }) {
    return put(`/api/data/tag/${id}`, data, { abortController });
  },
};

export const term = {
  get({ id, abortController }) {
    const q = makeTermQuery({ kind: 'audioList', termUid: id });
    return query(q, { abortController }).then(data => {
      const term = data.terms[0];
      if (!term) {
        return null;
      }
      term.audioTotal = data.count[0].total;
      return term;
    });
  },

  list({ abortController, page = 1, limit = DEFAULT_LIMIT, lang, searchString }) {
    const offset = (page - 1) * limit;
    const q = makeTermQuery({ offset, limit, lang, searchString });
    return query(q, { abortController }).then(data => ({
      items: data.terms,
      total: data.count[0].total,
      page,
      limit,
    }));
  },

  update({ id, data, abortController }) {
    return put(`/api/data/term/${id}`, data, { abortController });
  },
};
