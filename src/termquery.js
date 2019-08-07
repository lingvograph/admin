import _ from 'lodash';

const isWord = s => s && s.match(/^[^\s]+$/);

export const relationMap = {
  translated_as: {
    label: 'Translations',
    count: 'translated_as_count',
  },
  definition: {
    label: 'Definitions',
    count: 'definition_count',
    reverseEdge: 'definition_of',
  },
  definition_of: {
    label: 'Definition for',
    count: 'definition_of_count',
  },
  in: {
    label: 'Used in',
    count: 'in_count',
  },
  related: {
    label: 'Related Terms',
    count: 'related_count',
  },
  synonym: {
    label: 'Synonyms',
    count: 'synonym_count',
  },
  antonym: {
    label: 'Antonyms',
    count: 'antonym_count',
  },
};

const KIND = ['term', 'terms', 'audio', 'visual'].concat(Object.keys(relationMap));

const TAG = `tag {
        uid
        text
        lang
        transcript@ru
        transcript@en
      }`;

const TERM_BODY = `{
    uid
    text
    lang
    transcript@ru
    transcript@en
    created_at
    created_by {
      uid
      name
    }
    ${TAG}
  }`;

const FILE_BODY = `{
    uid
    url
    source
    content_type
    views: count(see)
    likes: count(like)
    dislikes: count(dislike)
    created_at
    created_by {
      uid
      name
    }
    ${TAG}
  }`;

export function makeTermQuery({
  kind = 'terms',
  termUid,
  offset = 0,
  limit = 10,
  lang,
  searchString,
  tags,
  onlyTags = false,
}) {
  if (!kind || !KIND.includes(kind)) {
    throw new Error(`invalid kind ${kind}`);
  }
  if (kind === 'term' && !termUid) {
    throw new Error('termUid is required');
  }

  const hasTermType = 'has(Term)';
  const matchFn = termUid ? `uid(${termUid})` : hasTermType;
  const isTermList = kind === 'terms';
  const isTerm = kind === 'term';
  const hasTagType = isTermList && onlyTags ? 'has(Tag)' : '';
  const params = {};

  function makeSearchFilter() {
    if (!isTermList) {
      return '';
    }

    const str = (searchString || '').trim();
    if (!str) {
      return '';
    }

    // too small word fails with 'regular expression is too wide-ranging and can't be executed efficiently'
    const useRegexp = isWord(str) && str.length >= 3;

    params.$searchString = str;

    if (useRegexp) {
      params.$regexp = `${str}.*`;
    }

    const regexp = useRegexp ? `regexp(text, /$regexp/i)` : '';
    const anyoftext = `anyoftext(text, $searchString)`;
    const exprs = [anyoftext, regexp].filter(s => !!s);
    if (exprs.length > 1) {
      return `(${exprs.join(' or ')})`;
    }
    return exprs[0];
  }

  const range = `offset: ${offset}, first: ${limit}`;
  const termRange = isTermList ? `, ${range}` : '';

  const brace = s => `(${s})`;
  const searchFilter = makeSearchFilter();
  const langFilter = lang ? `eq(lang, "${lang}")` : '';
  const tagFilter = !_.isEmpty(tags) ? brace(tags.map(t => `uid_in(tag, ${t.uid})`).join(' or ')) : '';

  const filterExpr = [hasTermType, hasTagType, langFilter, tagFilter, searchFilter].filter(s => !!s).join(' and ');
  const termFilter = isTermList ? `@filter(${filterExpr})` : '';

  const args = _.keys(params)
    .map(k => `${k}: string`)
    .join();
  const paramQuery = args ? `query terms(${args}) ` : '';

  const fileEdges = ['audio', 'visual'];
  const makeEdge = name => {
    const isFile = fileEdges.includes(name);
    const myrange = kind === name ? `(${range})` : '(first: 10)';
    const body = isFile ? FILE_BODY : TERM_BODY;
    return `${name} ${myrange} ${body}`;
  };

  const allEdgeKeys = Object.keys(relationMap).concat(fileEdges);
  const edges = allEdgeKeys.map(makeEdge).join('\n');

  const makeTotal = (pred, name) => {
    if (!name) {
      name = `${pred}_count`;
    }
    return `${name}: count(${pred})`;
  };
  const totals = isTerm ? allEdgeKeys.map(k => makeTotal(k)).join('\n') : '';

  const text = `${paramQuery}{
    terms(func: ${matchFn}${termRange}) ${termFilter} {
      Tag
      uid
      text
      lang
      transcript@ru
      transcript@en
      created_at
      created_by {
        uid
        name
      }
      tag {
        uid
        text
        lang
        transcript@ru
        transcript@en
      }
      ${edges}
    }
    count(func: ${matchFn}) ${termFilter} {
      ${isTerm ? '' : makeTotal(isTermList ? 'uid' : kind, 'total')}
      ${totals}
    }
  }`;

  console.log(text);

  return {
    text: text.replace(/^\s*[\r\n]/gm, ''),
    params,
  };
}
