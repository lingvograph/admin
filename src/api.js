import _ from 'lodash';
import * as axios from 'axios';
import { loadProgressBar } from 'axios-progress-bar';
import 'nprogress/nprogress.css';
import { confirm } from 'components';
import { navigate } from 'saga';
import store from 'store';
import token from './token';
import { history } from './history';
import { makeTermQuery, relationMap } from './termquery';

export const DEFAULT_LIMIT = 11;

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

loadProgressBar();

function extractErrorMessage(data) {
  return _.isString(data) ? data : data.error || data.error_message;
}

function handleApiError(error) {
  const status = _.get(error, 'response.status');
  if (401 === status) {
    if (!window.location.pathname.endsWith('/login')) {
      confirm({
        title: 'Session Expired',
        content: 'Your session has expired. Would you like to be redirected to the login page?',
        warning: true,
        okLabel: 'Yes',
        cancelLabel: 'No',
        apply: [navigate, '/login'],
      });
    } else {
      throw new Error(extractErrorMessage(error.response.data));
    }
  } else if (404 === status) {
    store.runSaga(navigate, '/404');
  } else if (status >= 500) {
    alert(extractErrorMessage(error.response.data));
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

axios.interceptors.response.use(response => {
  return response;
}, handleApiError);

export async function login(username, password) {
  const resp = await axios({
    url: '/api/login',
    method: 'POST',
    auth: { username, password },
  });
  token.value = resp.data.token;
  return me();
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

function makeAxiosConfig(options = {}, abortable = true) {
  const { abortController, ...axiosConfig } = options;
  return {
    ...axiosConfig,
    ...(abortable ? makeCancelConfig(abortController) : {}),
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

export function del(path, options = {}) {
  const config = makeAxiosConfig(options, false);
  return axios.delete(path, { ...config });
}

export function query(queryString, params = {}, options = {}) {
  const config = makeAxiosConfig(options);
  return axios.post('/api/query', queryString, { params, ...config }).then(resp => resp.data);
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

export function updateGraph(set, del, options = {}, abortable = true) {
  const data = {
    set: formatNquads(set),
    delete: formatNquads(del),
  };
  if (!data.set && !data.delete) {
    throw new Error('please specify set or delete mutations');
  }
  const config = makeAxiosConfig(options, abortable);
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
    const tkeys = ['en', 'ru'].map(t => ({ lang: t, key: `transcript@${t}` }));
    const payload = _.omit(data, tkeys.map(t => t.key));
    const transcript = tkeys.filter(t => !!data[t.key]).map(t => ({ text: data[t.key], lang: t.lang }));
    return post('/api/lingvo/term', payload, { abortController }).then(async term => {
      if (_.isEmpty(transcript)) {
        return term;
      }
      const transcriptions = await Promise.all(transcript.map(t => post('/api/pyadmin/term', t, { abortController })));
      const edges = _.flatten(
        transcriptions.map(t => [[term.uid, 'transcription', t.uid], [t.uid, 'transcription_of', term.uid]]),
      );
      await updateGraph(edges, undefined, { abortController });
      return term;
    });
  },

  get({ id, abortController }) {
    const q = makeTermQuery({ kind: 'term', termUid: id });
    return query(q.text, q.params, { abortController }).then(data => {
      const term = data.terms[0];
      if (!term) {
        return null;
      }
      Object.assign(term, data.count[0]);
      return term;
    });
  },

  getAudio({ id, abortController, offset = 0, limit = DEFAULT_LIMIT }) {
    const q = makeTermQuery({ kind: 'audio', termUid: id, offset, limit });
    return query(q.text, q.params, { abortController }).then(data => {
      const term = data.terms[0];
      if (!term) {
        return null;
      }
      return {
        items: term.audio,
        total: data.count[0].total,
      };
    });
  },

  list({
    abortController,
    termId,
    kind = 'terms',
    page = 1,
    limit = DEFAULT_LIMIT,
    lang,
    searchString,
    tags,
    onlyTags = false,
  }) {
    const offset = (page - 1) * limit;
    const q = makeTermQuery({ kind, termUid: termId, offset, limit, lang, searchString, tags, onlyTags });
    return query(q.text, q.params, { abortController }).then(data => ({
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
    const obj = await get(`/api/fileproxy/?url=${encodeURIComponent(url)}&remote=true`, {}, { abortController });
    const set = [[id, 'visual', obj.uid]];
    await updateGraph(set, undefined, { abortController });
    return await get(`/api/data/term/${id}`);
  },

  unlinkRelated({ termId, id, edge }) {
    const rel = relationMap[edge];
    const e1 = [termId, edge, id];
    const e2 = [id, rel.reverseEdge || edge, termId];
    return updateGraph(undefined, [e1, e2], {}, false);
  },

  linkRelated({ termId, id, edge }) {
    const rel = relationMap[edge];
    const e1 = [termId, edge, id];
    const e2 = [id, rel.reverseEdge || edge, termId];
    return updateGraph([e1, e2], undefined, {}, false);
  },

  toggleTagType({ termId, isTag }) {
    const e1 = [termId, 'Tag', isTag ? '""' : '*'];
    return updateGraph(isTag ? [e1] : undefined, isTag ? undefined : [e1], {}, false);
  },
};

export const file = {
  delete({ id }) {
    return del(`/api/data/file/${id}`);
  },
  async deleteAudio({ termId, id }) {
    try {
      // unlink audio
      const unlink = [termId, 'audio', id];
      await updateGraph(undefined, [unlink], {}, false);
    } catch (err) {
      throw err;
    }
    await del(`/api/data/file/${id}`);
  },
  unlinkVisual({ termId, visual }) {
    const unlink = visual.map(t => [termId, 'visual', t.uid]);
    return updateGraph(undefined, unlink, {}, false);
  },
};

export const admin = {
  searchAudio({ lang, text }) {
    return get(`/api/lingvo/search/audio/${decodeURIComponent(text)}`, { lang });
  },
  async restoreRemoteAudio({ term, userId }) {
    const currentUrls = new Set(_.map(term.audio, t => t.url));
    const data = await admin.searchAudio({ lang: term.lang, text: term.text });
    const mp3 = data.mp3.filter(t => !currentUrls.has(t.url));
    const set = [];
    const now = new Date().toISOString();
    for (let i = 0; i < mp3.length; i++) {
      const id = `_:a${i + 1}`;
      const url = new URL(mp3[i].url);
      const src = url.hostname;
      set.push(
        [id, 'File', '""'],
        [id, 'created_at', `"${now}"^^<xs:dateTime>`],
        [id, 'created_by', userId],
        [id, 'url', `"${mp3[i].url}"`],
        [id, 'source', `"${src}"`],
        [term.uid, 'audio', id],
      );
    }
    await updateGraph(set, undefined);
  },
};
