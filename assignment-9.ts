// head.js;
function head<T>(array: T[]): T | undefined {
  return array != null && array.length ? array[0] : undefined;
}

export default head;

//////////////////////////////////////////////////////////////////
// hasIn.js;
function hasIn(object: Record<string, unknown>, key: string): boolean {
  return object != null && key in Object(object);
}

export default hasIn;

//////////////////////////////////////////////////////////////////
// isBoolean.js;
function isBoolean(value: unknown): boolean {
  return (
    value === true ||
    value === false ||
    (isObjectLike(value) && getTag(value) === '[object Boolean]')
  );
}

export default isBoolean;

//////////////////////////////////////////////////////////////////
// toString.js
function toString(value: unknown): string {
  if (value == null) {
    return '';
  }
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return `${value.map((other) => (other == null ? other : toString(other)))}`;
  }
  if (isSymbol(value)) {
    return value.toString();
  }
  const result = `${value}`;
  return result === '0' && 1 / value === -INFINITY ? '-0' : result;
}

export default toString;

////////////////////////////////////////////////////////////////////
// split.js
function split(
  string: string,
  separator: RegExp | string,
  limit?: number
): string[] {
  limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
  if (!limit) {
    return [];
  }
  if (
    string &&
    (typeof separator === 'string' ||
      (separator != null && !isRegExp(separator)))
  ) {
    if (!separator && hasUnicode(string)) {
      return castSlice(stringToArray(string), 0, limit);
    }
  }
  return string.split(separator, limit);
}

export default split;

////////////////////////////////////////////////////////////////////
// hasPath.js
function hasPath(object: unknown, path: Array<string> | string): boolean {
  path = castPath(path, object);

  let index = -1;
  let { length } = path;
  let result = false;
  let key: string | number;

  while (++index < length) {
    key = toKey(path[index]);
    if (!(result = object != null && hasOwnProperty.call(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index !== length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return (
    !!length &&
    isLength(length) &&
    isIndex(key, length) &&
    (Array.isArray(object) || isArguments(object))
  );
}

export default hasPath;

////////////////////////////////////////////////////////////////////
// filter.js
function filter<T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => unknown
): T[] {
  let index = -1;
  let resIndex = 0;
  const length = array == null ? 0 : array.length;
  const result: T[] = [];

  while (++index < length) {
    const value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

export default filter;

////////////////////////////////////////////////////////////////////
// every.js
function every<T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => unknown
): boolean {
  let index = -1;
  const length = array == null ? 0 : array.length;

  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }
  return true;
}

export default every;

////////////////////////////////////////////////////////////////////
// map.js
function map<T, U>(
  array: T[],
  iteratee: (value: T, index: number, array: T[]) => U
): U[] {
  let index = -1;
  const length = array == null ? 0 : array.length;
  const result = new Array<U>(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

export default map;

// 제출
declare module 'lodash' {
  function head<T>(array: T[]): T | undefined;
  function hasIn(object: Record<string, unknown>, key: string): boolean;
  function isBoolean(value: unknown): boolean;
  function toString(value: unknown): string;
  function split(
    string: string,
    separator: RegExp | string,
    limit?: number
  ): string[];
  function hasPath(object: unknown, path: Array<string> | string): boolean;
  function filter<T>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => unknown
  ): T[];
  function every<T>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => unknown
  ): boolean;
  function map<T, U>(
    array: T[],
    iteratee: (value: T, index: number, array: T[]) => U
  ): U[];
}
