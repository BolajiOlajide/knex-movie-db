exports.seed = knex => {
  const tblName = 'movie';

  const rows = [
    { rating_id: 4, director_id: 1, title: "The Rock", releaseyr: 1996, score: 90, runtime: 136, overview: "A mild-mannered chemist and an ex-con must lead the counterstrike when a rogue group of military men, led by a renegade general, threaten a nerve gas attack from Alcatraz against San Francisco." },
    { rating_id: 2, director_id: 5, title: "Night at the Museum", releaseyr: 2006, score: 90, runtime: 110, overview: "A newly recruited night security guard at the Museum of Natural History discovers that an ancient curse causes the animals and exhibits on display to come to life and wreak havoc." },
    { rating_id: 2, director_id: 6, title: "The Karate Kid", releaseyr: 1984, score: 95, runtime: 127, overview: "A handyman/martial arts master agrees to teach a bullied boy karate and shows him that there is more to the martial art than fighting." },
    { rating_id: 3, director_id: 13, title: "Batman Begins", releaseyr: 2005, score: 95, runtime: 140, overview: "After training with his mentor, Batman begins his war on crime to free the crime-ridden Gotham City from corruption that the Scarecrow and the League of Shadows have cast upon it." },
    { rating_id: 3, director_id: 17, title: "The Count of Monte Cristo", releaseyr: 2002, score: 95, runtime: 131, overview: "A young man, falsely imprisoned by his jealous \"friend,\" escapes and uses a hidden treasure to exact his revenge." },
    { rating_id: 4, director_id: 24, title: "Tombstone", releaseyr: 1993, score: 95, runtime: 130, overview: "A successful lawman''s plans to retire anonymously in Tombstone, Arizona, are disrupted by the kind of outlaws he was famous for eliminating." },
    { rating_id: 3, director_id: 29, title: "The Guardian", releaseyr: 2006, score: 90, runtime: 139, overview: "A high school swim champion with a troubled past enrolls in the U.S. Coast Guard''s \"A\" School, where legendary rescue swimmer Ben Randall teaches him some hard lessons about loss, love, and self-sacrifice." },
    { rating_id: 2, director_id: 33, title: "The Hunt for Red October", releaseyr: 1990, score: 95, runtime: 135, overview: "In 1984, the USSR''s best submarine captain in their newest sub violates orders and heads for the USA. Is he trying to defect, or to start a war?" },
  ];


  return knex(tblName)
    .del()                                        //Remove all rows from table
    .then(() => knex.insert(rows).into(tblName));
};
