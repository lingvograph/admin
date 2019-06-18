import _ from 'lodash';
import * as axios from 'axios';
import { confirm } from 'components';
import { navigate } from 'saga';
import store from 'store';
import token from './token';
import { history } from './history';
import { makeTermQuery } from './termquery';

export const DEFAULT_LIMIT = 11;

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

function handleApiError(error) {
  const status = error.response.status;
  if (401 === status) {
    confirm({
      title: 'Session Expired',
      content: 'Your session has expired. Would you like to be redirected to the login page?',
      warning: true,
      okLabel: 'Yes',
      cancelLabel: 'No',
      apply: [navigate, '/login'],
    });
  } else if (404 === status) {
    store.runSaga(navigate, '/404');
  } else if (status >= 500) {
    store.runSaga(navigate, '/500');
  } else {
    return Promise.reject(error);
  }
}

axios.interceptors.request.use(config => {
  if (token.value && !config.auth) {
    config.headers['Authorization'] = `Bearer ${token.value}`;
  }
  return config;
});

function isEmpty(data) {
  return _.every(data, (val, key) => {
    if (Array.isArray(val)) {
      if (val.length === 1) {
        if (key === 'count') {
          return _.every(val[0], t => t === 0);
        }
        return _.isEqual(_.keys(val[0]), ['uid']);
      }
      return val.length === 0;
    }
    return false;
  });
}

axios.interceptors.response.use(response => {
  if (isEmpty(response.data)) {
    store.runSaga(navigate, '/404');
  }
  return response;
}, handleApiError);

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
  if (!abortController) {
    const path = history.location.pathname;

    abortController = new AbortController();

    history.listen(location => {
      if (location.pathname !== path) {
        abortController.abort();
      }
    });
  }

  const source = axios.CancelToken.source();

  abortController.signal.addEventListener('abort', () => {
    source.cancel('canceled');
  });

  return {
    cancelToken: source.token,
  };
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

function formatNquad(value) {
  if (_.isString(value)) {
    return value;
  }

  const wrapId = v => (v.startsWith('0x') ? `<${v}>` : v);
  const format = (subject, predicate, object) => `${wrapId(subject)} <${predicate}> ${wrapId(object)} .`;

  if (_.isArray(value)) {
    if (value.length !== 3 || value.some(s => !s)) {
      throw new Error('unexpected nquad array');
    }
    return format(value[0], value[1], value[2]);
  }

  if (_.isObject(value)) {
    if (!value.subject || !value.predicate || !value.object) {
      throw new Error('invalid nquad object');
    }
    return format(value.subject, value.predicate, value.object);
  }

  throw new Error('unexpected nquad value');
}

function formatNquads(value) {
  if (!value) {
    return undefined;
  }
  if (_.isString(value)) {
    return value;
  }
  if (!_.isArray(value)) {
    throw new Error('unexpected value');
  }
  return value.map(formatNquad).join('\n');
}

export function updateGraph(set, del, options = {}) {
  const data = {
    set: formatNquads(set),
    delete: formatNquads(del),
  };
  if (!data.set && !data.delete) {
    throw new Error('please specify set or delete mutations');
  }
  const config = makeAxiosConfig(options);
  return axios.post('/api/nquads', data, config).then(resp => resp.data);
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
  updateObjectTags({ id, oldTags = [], newTags = [], abortController }) {
    const removedTags = oldTags.filter(t => !newTags.some(q => q.uid === t.uid));
    const addedTags = newTags.filter(t => !oldTags.some(q => q.uid === t.uid));
    const set = addedTags.map(t => [id, 'tag', t.uid]);
    const del = removedTags.map(t => [id, 'tag', t.uid]);
    return updateGraph(set, del, { abortController });
  },
};

export const term = {
  create({ data, abortController }) {
    return post('/api/data/term', data, { abortController });
  },

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

  list({ abortController, page = 1, limit = DEFAULT_LIMIT, lang, searchString, tags }) {
    const offset = (page - 1) * limit;
    const q = makeTermQuery({ offset, limit, lang, searchString, tags });
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

  async addVisualURL({ id, url, abortController }) {
    const obj = await get(`/api/fileproxy/${url}`, {}, { abortController });
    const set = [[id, 'visual', obj.uid]];
    await updateGraph(set, undefined, { abortController });
    return await get(`/api/data/term/${id}`);
  },
};
