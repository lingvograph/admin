import md5 from 'md5';

const MD5_REGEX = /^[0-9a-f]{32}$/;

export function gravatarURL(email, size = 80) {
  if (!email) return undefined;
  email = email.trim().toLowerCase();
  const hash = email.match(MD5_REGEX) ? email : md5(email);
  return `https://www.gravatar.com/avatar/${hash}.jpg?s=${size}&d=mp`;
}
