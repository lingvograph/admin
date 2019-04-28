import _ from 'lodash';

const isWord = s => s && s.match(/^\w+$/);

export function makeTermQuery({ kind = 'termList', termUid, offset = 0, limit = 10, lang, searchString, tags }) {
  const matchFn = termUid ? `uid(${termUid})` : 'has(Term)';
  const isTermList = kind === 'termList';

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
    const regexp = isWord(str) && str.length >= 3 ? `regexp(text, /${str}.*/i)` : '';
    const anyoftext = `anyoftext(text, "${str}")`;
    const exprs = [anyoftext, regexp].filter(s => !!s);
    if (exprs.length > 1) {
      return `(${exprs.join(' or ')})`;
    }
    return exprs[0];
  }

  const range = `offset: ${offset}, first: ${limit}`;
  const audioRange = kind === 'audioList' ? `(${range})` : '(first: 1)';
  const visualRange = kind === 'visualList' ? `(${range})` : '(first: 10)';
  const termRange = isTermList ? `, ${range}` : '';

  const brace = s => `(${s})`;
  const searchFilter = makeSearchFilter();
  const langFilter = lang ? `eq(lang, "${lang}")` : '';
  const tagFilter = !_.isEmpty(tags) ? brace(tags.map(t => `uid_in(tag, ${t.uid})`).join(' or ')) : '';

  const filterExpr = ['has(Term)', langFilter, tagFilter, searchFilter].filter(s => !!s).join(' and ');
  const termFilter = isTermList ? `@filter(${filterExpr})` : '';

  const q = `{
    terms(func: ${matchFn}${termRange}) ${termFilter} {
      uid
      text
      lang
      transcript@ru
      transcript@en
      tag {
        uid
        text@en
        text@ru
      }
      translated_as {
        uid
        text
        lang
        transcript@ru
        transcript@en
        tag {
          uid
          text@en
          text@ru
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
      total: count(${countBy()})
    }
  }`;
  return q;
}
