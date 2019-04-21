module.exports = {
  parseSortString(sortString, defaultSortString) {
    let s = sortString || defaultSortString || '';
    const result = {
      column: '',
      direction: 'asc'
    };

    s = s.split(' ');
    if (s.length < 1) return null;

    result.column = s[0];

    if (!result.column) return null;

    if (s.length === 1) return result;

    if (s[1].toLowerCase() === 'desc') result.direction = 'desc';

    return result;
  }
};
