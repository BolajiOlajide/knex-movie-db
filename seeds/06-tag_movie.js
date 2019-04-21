exports.seed = knex => {
    const tblName = 'movie_tag';

    const rows = [
        //The Rock
        { movie_id: 1, tag_id: 2 },    //Action

        //Night at the Museum
        { movie_id: 2, tag_id: 2 },    //Action
        { movie_id: 2, tag_id: 4 },    //Comedy

        //The Karate Kid
        { movie_id: 3, tag_id: 7 },   //Martial Arts

        //Batman Begins
        { movie_id: 4, tag_id: 2 },   //Action

        //The Count of Monte Cristo
        { movie_id: 5, tag_id: 7 },   //Drama

        //Tombstone
        { movie_id: 6, tag_id: 21 },  //Western

        //The Guardian
        { movie_id: 7, tag_id: 7 },    //Drama

        //The Hunt for Red October
        { movie_id: 8, tag_id: 7 },    //Drama
    ];


    return knex(tblName)
        .del()                                        //Remove all rows from table
        .then(() => knex.insert(rows).into(tblName));
};
