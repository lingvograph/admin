import _ from 'lodash';

const isWord = s => s && s.match(/^[^\s]+$/);

export function makeTermQuery({
  kind = 'termList',
  termUid,
  offset = 0,
  limit = 10,
  lang,
  searchString,
  tags,
  onlyTags = false,
}) {
  const hasTermType = 'has(Term)';
  const matchFn = termUid ? `uid(${termUid})` : hasTermType;
  const isTermList = kind === 'termList';
  const isTerm = kind === 'term';
  const hasTagType = isTermList && onlyTags ? 'has(Tag)' : '';
  const params = {};

  function countBy() {
    switch (kind) {
      case 'audioList':
        return 'audio';
      case 'visualList':
        return 'visual';
      default:
        return 'uid';
    }
  }

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
  const audioRange = kind === 'audioList' ? `(${range})` : '(first: 10)';
  const visualRange = kind === 'visualList' ? `(${range})` : '(first: 10)';
  const translateRange = kind === 'translationList' ? `(${range})` : '(first: 10)';
  const termRange = isTermList ? `, ${range}` : '';

  const brace = s => `(${s})`;
  const searchFilter = makeSearchFilter();
  const langFilter = lang ? `eq(lang, "${lang}")` : '';
  const tagFilter = !_.isEmpty(tags) ? brace(tags.map(t => `uid_in(tag, ${t.uid})`).join(' or ')) : '';

  const filterExpr = [hasTermType, hasTagType, langFilter, tagFilter, searchFilter].filter(s => !!s).join(' and ');
  const termFilter = isTermList ? `@filter(${filterExpr})` : '';
  const makeTotal = (name, pred) => `${name}: count(${pred})`;
  const args = _.keys(params)
    .map(k => `${k}: string`)
    .join();
  const paramQuery = args ? `query terms(${args}) ` : '';

  const text = `${paramQuery}{
    terms(func: ${matchFn}${termRange}) ${termFilter} {
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
      translated_as ${translateRange} {
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
      }
      audio ${audioRange} {
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
      }
      visual ${visualRange} {
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
      }
    }
    count(func: ${matchFn}) ${termFilter} {
      ${isTerm ? '' : makeTotal('total', countBy())}
      ${isTerm ? makeTotal('audioTotal', 'audio') : ''}
      ${isTerm ? makeTotal('visualTotal', 'visual') : ''}
      ${isTerm ? makeTotal('translationTotal', 'translated_as') : ''}
    }
  }`;
  return {
    text: text.replace(/^\s*[\r\n]/gm, ''),
    params,
  };
}
