exports.seed = knex => {
  const tblName = 'person';
  const rows = [
    { name: "Michael Bay", firstname: "Michael", lastname: "Bay" },       //1
    { name: "Sean Connery", firstname: "Sean", lastname: "Connery" },   //2
    { name: "Nicolas Cage", firstname: "Nicolas", lastname: "Cage" },      //3
    { name: "Ed Harris", firstname: "Ed", lastname: "Harris" },    //4
    { name: "Shawn Levy", firstname: "Shawn", lastname: "Levy" },      //5
    { name: "John Avildsen", firstname: "John", lastname: "Avildsen" },  //6
    { name: "Ben Stiller", firstname: "Ben", lastname: "Stiller" },   //7
    { name: "Carla Gugino", firstname: "Carla", lastname: "Gugino" },    //8
    { name: "Ricky Gervais 👻", firstname: "Ricky", lastname: "Gervais" },   //9
    { name: "Robin Williams", firstname: "Robin", lastname: "Williams" },  //10
    { name: "Dick Van Dyke", firstname: "Dick", lastname: "Van Dyke" },  //11
    { name: "Owen Wilson", firstname: "Owen", lastname: "Wilson" },    //12
    { name: "Christopher Nolan", firstname: "Christopher", lastname: "Nolan" },     //13
    { name: "Christian Bale", firstname: "Christian", lastname: "Bale" },      //14
    { name: "Michael Caine", firstname: "Michael", lastname: "Caine" },     //15
    { name: "Ken Watanabe", firstname: "Ken", lastname: "Watanabe" },  //16
    { name: "Kevin Reynolds", firstname: "Kevin", lastname: "Reynolds" },  //17
    { name: "Jim Caviezel", firstname: "Jim", lastname: "Caviezel" },  //18
    { name: "Guy Pearce", firstname: "Guy", lastname: "Pearce" },    //19
    { name: "Richard Harris", firstname: "Richard", lastname: "Harris" },    //20
    { name: "Dagmara Dominczyk", firstname: "Dagmara", lastname: "Dominczyk" }, //21
    { name: "Luis Guzm�n", firstname: "Luis", lastname: "Guzm�n" },    //22
    { name: "Michael Wincott", firstname: "Michael", lastname: "Wincott" },   //23
    { name: "George Cosmatos", firstname: "George", lastname: "Cosmatos" },  //24
    { name: "Kurt Russell", firstname: "Kurt", lastname: "Russell" },   //25
    { name: "Val Kilmer", firstname: "Val", lastname: "Kilmer" },    //26
    { name: "Sam Elliott", firstname: "Sam", lastname: "Elliott" },   //27
    { name: "Terry O''Quinn", firstname: "Terry", lastname: "O''Quinn" },  //28
    { name: "Andrew Davis", firstname: "Andrew", lastname: "Davis" },     //29
    { name: "Kevin Costner", firstname: "Kevin", lastname: "Costner" },   //30
    { name: "Ashton Kutcher", firstname: "Ashton", lastname: "Kutcher" },   //31
    { name: "Sela Ward", firstname: "Sela", lastname: "Ward" },      //32
    { name: "John McTiernan", firstname: "John", lastname: "McTiernan" }, //33
    { name: "Alec Baldwin", firstname: "Alec", lastname: "Baldwin" },   //34
    { name: "Scott Glenn", firstname: "Scott", lastname: "Glenn" },     //35
    { name: "Sam Neill", firstname: "Sam", lastname: "Neill" },     //36
    { name: "James Earl Jones", firstname: "James", lastname: "Jones" },     //37
    { name: "Carlos Saloio", firstname: "Carlos", lastname: "Saloio" },    //38
    { name: "Ralph Macchio", firstname: "Ralph", lastname: "Macchio" },   //39
    { name: "Pat Morita", firstname: "Pat", lastname: "Morita" },    //40
    { name: "Elisabeth Shue", firstname: "Elisabeth", lastname: "Shue" },      //41
  ];


  return knex(tblName)
    .del()                                        //Remove all rows from table
    .then(() => knex.insert(rows).into(tblName));
};
