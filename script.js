const footballManager = {
  players: [
    {
      name: "Lionel Messi",
      age: 36,
      position: "Forward",
      nationality: "Argentina",
      price: 50_000_000,
    },
    {
      name: "Cristiano Ronaldo",
      age: 38,
      position: "Forward",
      nationality: "Portugal",
      price: 30_000_000,
    },
    {
      name: "Kylian Mbappé",
      age: 25,
      position: "Forward",
      nationality: "France",
      price: 150_000_000,
    },
    {
      name: "Kevin De Bruyne",
      age: 32,
      position: "Midfielder",
      nationality: "Belgium",
      price: 90_000_000,
    },
    {
      name: "Virgil van Dijk",
      age: 32,
      position: "Defender",
      nationality: "Netherlands",
      price: 80_000_000,
    },
  ],

  clubs: [
    {
      name: "Paris Saint-Germain",
      city: "Paris",
      stadium: "Parc des Princes",
      budget: 200_000_000,
      players: ["Lionel Messi", "Kylian Mbappé", "Marco Verratti"],
    },
    {
      name: "Manchester United",
      city: "Manchester",
      stadium: "Old Trafford",
      budget: 180_000_000,
      players: ["Cristiano Ronaldo", "Bruno Fernandes", "David De Gea"],
    },
    {
      name: "Liverpool FC",
      city: "Liverpool",
      stadium: "Anfield",
      budget: 150_000_000,
      players: ["Virgil van Dijk", "Mohamed Salah", "Sadio Mané"],
    },
    {
      name: "Real Madrid",
      city: "Madrid",
      stadium: "Santiago Bernabéu",
      budget: 250_000_000,
      players: ["Karim Benzema", "Luka Modrić", "Vinícius Júnior"],
    },
  ],

  transfers: [
    {
      player: "Lionel Messi",
      sellingClub: "Barcelona",
      buyingClub: "Paris Saint-Germain",
      price: 57_000,
      date: "2021-08-10",
    },
    {
      player: "Cristiano Ronaldo",
      sellingClub: "Juventus",
      buyingClub: "Manchester United",
      price: 30_000_000,
      date: "2021-08-31",
    },
    {
      player: "Kylian Mbappé",
      sellingClub: "Monaco",
      buyingClub: "Paris Saint-Germain",
      price: 159_000_000,
      date: "2017-08-31",
    },
    {
      player: "Kevin De Bruyne",
      sellingClub: "Wolfsburg",
      buyingClub: "Manchester City",
      price: 90_000_000,
      date: "2015-08-30",
    },
    {
      player: "Virgil van Dijk",
      sellingClub: "Southampton",
      buyingClub: "Liverpool FC",
      price: 80_000_000,
      date: "2018-01-01",
    },
  ],
};

const updateLocalStorage = () => {
  localStorage.setItem("footballManager", JSON.stringify(footballManager));
  console.log('save')
};
const storedData = localStorage.getItem("footballManager");
if (storedData) {
  const footballManagerData = JSON.parse(storedData);

  footballManager.players = footballManagerData.players;
  footballManager.clubs = footballManagerData.clubs;
  footballManager.transfers = footballManagerData.transfers;

  console.log('дані оновленні');
} else {
  console.log("немає данних");
}


const exsist = (arr, name) => {
  const playerExist = arr.some((el) => el.name === name);
  return playerExist;
};

const addPlayer = (name, age, position, nationality, price) => {
  if (exsist(footballManager.players, name)) {
    console.log("цей гравець вже існує");
  } else {
    footballManager.players.push({ name, age, position, nationality, price });
    updateLocalStorage();
  }
};

const addClub = (name, city, stadium, budget, ...players) => {
  if (exsist(footballManager.clubs, name)) {
    console.log("цей клуб вже існує");
  } else {
    footballManager.clubs.push({
      name,
      city,
      stadium,
      budget,
      players: [...players],
    });
    updateLocalStorage();
  }
};

const addTransver = (player, sellingClub, buyingClub, price) => {
  const date = new Date().toLocaleDateString("uk-UA");
  footballManager.transfers.push({
    player,
    sellingClub,
    buyingClub,
    price,
    date,
  });
  updateLocalStorage();
};

const getInfoClub = (club) => {
  const test = footballManager.clubs.findIndex((el) => el.name == club);
  if (exsist(footballManager.clubs, club)) {
    const { name, city, stadium, budget, players } =
      footballManager.clubs[test];
    console.log(`Iмя клубу : ${name}`);
    console.log(`Місто : ${city}`);
    console.log(`Стадіон : ${stadium}`);
    console.log(`Бюджет : ${budget}`);

    console.log("Гравці:");
    players.forEach((name, index) =>
      console.log(`      ${index + 1}: ${name}`)
    );
  } else {
    console.log("Клуб не знайдено");
  }
};
const maxPriceTransver = () => {
  let name = null;
  let price = null;
  footballManager.transfers.forEach((el) => {
    if (el.price > price) {
      name = el.player;
      price = el.price;
    }
  });
  // console.log(prices)
  console.log(`Cамий дорогий футболіст ${name} ціна складає ${price}`);
};

// addPlayer('dsdssd',43,34,34,34,)
const topClubTranfer = () => {};
const switchTransfer = () => {};
