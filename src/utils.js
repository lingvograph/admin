import { isFunction } from 'lodash';
import md5 from 'md5';

const MD5_REGEX = /^[0-9a-f]{32}$/;

export function gravatarURL(email, size = 80) {
  if (!email) return undefined;
  email = email.trim().toLowerCase();
  const hash = email.match(MD5_REGEX) ? email : md5(email);
  return `https://www.gravatar.com/avatar/${hash}.jpg?s=${size}&d=mp`;
}

export function isIterable(obj) {
  return obj && typeof obj !== 'string' && obj[Symbol.iterator];
}

export function isGenerator(obj) {
  return isFunction(obj.next) && isFunction(obj.throw);
}

export function isGeneratorFunction(obj) {
  const constructor = obj.constructor;
  if (!constructor) {
    return false;
  }
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) {
    return true;
  }
  return isGenerator(constructor.prototype);
}
