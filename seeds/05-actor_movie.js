exports.seed = knex => {
  const tblName = 'movie_actor';

  const rows = [
    //The Rock
    { movie_id: 1, person_id: 2 },    //Sean Connery
    { movie_id: 1, person_id: 3 },    //Nicolas Cage
    { movie_id: 1, person_id: 4 },   //Ed Harris

    //Night at the Museum
    { movie_id: 2, person_id: 7 },    //Ben Stiller
    { movie_id: 2, person_id: 8 },    //Carla Gugino
    { movie_id: 2, person_id: 9 },    //Ricky Gervais
    { movie_id: 2, person_id: 10 },   //Robin Williams
    { movie_id: 2, person_id: 11 },   //Dick Van Dyke
    { movie_id: 2, person_id: 12 },  //Owen Wilson

    //The Karate Kid
    { movie_id: 3, person_id: 39 },   //Ralph Macchio
    { movie_id: 3, person_id: 40 },   //Pat Morita
    { movie_id: 3, person_id: 41 },  //Elisabeth Shue

    //Batman Begins
    { movie_id: 4, person_id: 14 },   //Christian Bale
    { movie_id: 4, person_id: 15 },   //Michael Caine
    { movie_id: 4, person_id: 16 },  //Ken Watanabe

    //The Count of Monte Cristo
    { movie_id: 5, person_id: 18 },   //Jim Caviezel
    { movie_id: 5, person_id: 19 },   //Guy Pearce
    { movie_id: 5, person_id: 20 },   //Richard Harris
    { movie_id: 5, person_id: 21 },   //Dagmara Dominczyk
    { movie_id: 5, person_id: 22 },   //Luis Guzm�n
    { movie_id: 5, person_id: 23 },  //Michael Wincott

    //Tombstone
    { movie_id: 6, person_id: 25 },   //Kurt Russell
    { movie_id: 6, person_id: 26 },   //Val Kilmer
    { movie_id: 6, person_id: 27 },   //Sam Elliott
    { movie_id: 6, person_id: 28 },  //Terry O'Quinn

    //The Guardian
    { movie_id: 7, person_id: 30 },   //Kevin Costner
    { movie_id: 7, person_id: 31 },   //Ashton Kutcher
    { movie_id: 7, person_id: 32 },  //Sela Ward

    //The Hunt for Red October
    { movie_id: 8, person_id: 2 },    //Sean Connery
    { movie_id: 8, person_id: 34 },   //Alec Baldwin
    { movie_id: 8, person_id: 35 },   //Scott Glenn
    { movie_id: 8, person_id: 36 },   //Sam Neill
    { movie_id: 8, person_id: 37 },   //James Earl Jones
  ];


  return knex(tblName)
    .del()                                        //Remove all rows from table
    .then(() => knex.insert(rows).into(tblName));
};
