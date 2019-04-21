exports.seed = knex => {
  const tblName = 'tag';
  const rows = [
    { name: '3D' },             //1
    { name: 'Action' },         //2
    { name: 'Animation' },      //3
    { name: 'Comedy' },         //4
    { name: 'Crime' },          //5
    { name: 'Disaster' },       //6
    { name: 'Drama' },          //7
    { name: 'Family' },         //8
    { name: 'Fantasy' },        //9
    { name: 'Holiday' },        //10
    { name: 'Horror' },         //11
    { name: 'Martial Arts' },   //12
    { name: 'Musical' },        //13
    { name: 'Mystery' },        //14
    { name: 'Romance' },        //15
    { name: 'Sci-Fi' },         //16
    { name: 'Sports' },         //17
    { name: 'Suspense' },       //18
    { name: 'Thriller' },       //19
    { name: 'War' },            //20
    { name: 'Western' },        //21
  ];

  return knex(tblName)
    .del()                                        //Remove all rows from table
    .then(() => knex.insert(rows).into(tblName));
};
