const R = require('ramda');


exports.createMovieRelationObject = (columnName, movieID) => R
  .compose(
    R.map(R.assoc('movie_id', movieID)),
    R.map(R.objOf(columnName))
  );

exports.arrDifference = (firstArr, seecondArr) => R
  .difference(firstArr, seecondArr);
