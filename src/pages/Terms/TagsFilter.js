import React from 'react';
import { useSearchParams } from 'hooks';
import TagsInput from 'components/TagsInput';

const labelKey = 'text@en';

export function parseTags(str) {
  return (str || '').split(',').map(s => {
    const a = s.split('.');
    if (a.length !== 2) {
      return undefined;
    }
    return {
      uid: a[0],
      [labelKey]: a[1],
    };
  }).filter(s => !!s);
}

function stringifyTags(tags) {
  return tags.map(t => `${t.uid}.${t[labelKey]}`).join(',');
}

const TagsFilter = () => {
  const { params, replaceParam } = useSearchParams();
  const tags = parseTags(params.get('tags'));
  const handleChange = (tags) => {
    const s = stringifyTags(tags);
    replaceParam('tags', s);
  };
  return <TagsInput tags={tags} onChange={handleChange}/>;
};

export default TagsFilter;
