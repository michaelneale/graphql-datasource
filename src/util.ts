/*eslint no-restricted-exports: []*/
import moment from 'moment';

export function flatten<T extends Record<string, any>>(object: T, path: string | null = null, separator = '.'): T {
  return Object.keys(object).reduce((acc: T, key: string): T => {
    const isObject = typeof object[key] === 'object' && object[key] != null;
    const newPath = [path, key].filter(Boolean).join(separator);
    return isObject ? { ...acc, ...flatten(object[key], newPath, separator) } : { ...acc, [newPath]: object[key] };
  }, {} as T);
}

export function isRFC3339_ISO6801(str: any): boolean {
  let date =  moment(str, moment.ISO_8601, true);
  if (date.isValid()) {
    let iso = date.toISOString();
    if (iso === str) {
      return true;
    } else {
      // some RFC3339 dates don't include fractions of a second to same resolution, but still valid.
      return iso.substring(0, 19) === str.substring(0, 19);
    }
  }
  return false;
}
