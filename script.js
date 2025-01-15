const footballManager = {
  player: [],
  club: [],
  transfer: [],
};

function Base() {
  const uid = Math.floor(Math.random() * 10000);
  return {
    uid,
    date: new Date().toLocaleDateString("uk-UA"),
  };
}

function Player({ name, position, age, price, clubId = null }) {
  return {
    ...Base(),
    name,
    position,
    age,
    price,
    clubId,
  };
}

function Club(name, budget) {
  return {
    ...Base(),
    name,
    budget,
  };
}

function addPlayer({ name, position, age, price, clubId }) {
  const newPlayer = Player({ name, position, age, price, clubId });
  footballManager.player.push(newPlayer);
}
function addClub(name, budget) {
  const newClub = Club(name, budget);
  footballManager.club.push(newClub);
}

function getInfoClub(uid) {
  const club = footballManager.club.find((club) => club.uid === uid);
  if (club) {
    console.log(
      `club name ${club.name} \nclub budget ${club.budget} \nplayers:`
    );

    footballManager.player.forEach((player) => {
      if (player.clubId === club.uid) {
        console.log(player.name);
      } else {
        console.log("not player");
      }
    });
  } else {
    console.log("not clube");
  }
}
function buyPlayer({ playerId, sellClubId, buyClubId }) {
  const player = footballManager.player.find(
    (player) => player.uid === playerId
  );
  const sellClub = footballManager.club.find((club) => club.uid === sellClubId);
  const buyClub = footballManager.club.find((club) => club.uid === buyClubId);

  if (player && buyClubId && sellClubId) {
    if (buyClub.budget >= player.price) {
      buyClub.budget -= player.price;
      sellClub.budget += player.price;

      footballManager.player = footballManager.player.map((data) => {
        return {
          ...data,
          clubId: buyClubId,
          buyDate: new Date().toLocaleDateString("uk-UA"),
        };
      });

      const newTransfer = {
        playerId,
        sellClubId,
        buyClubId,
        price: player.price,
        buyDate: new Date().toLocaleDateString("uk-UA"),
      };

      footballManager.transfer.push(newTransfer);
    } else {
      console.log("The club is free of money");
    }
  } else if (player && buyClub) {
    footballManager.player = footballManager.player.map((data) => {
      return {
        ...data,
        clubId: buyClubId,
        buyDate: new Date().toLocaleDateString("uk-UA"),
      };
    });
  } else {
    console.log("error date");
  }
}

addClub("barsa", 33_000);
addClub("liver", 22_000);
addPlayer({
  name: "petro",
  age: 33,
  position: "center",
  price: 1_400,
});
addPlayer({
  name: "ivan",
  age: 24,
  position: "defender",
  price: 1_100,
});
buyPlayer({
  buyClubId: footballManager.club[0]?.uid,
  playerId: footballManager.player[0]?.uid,
});
buyPlayer({
  buyClubId: footballManager.club[0]?.uid,
  playerId: footballManager.player[0]?.uid,
  sellClubId: footballManager.club[1]?.uid,
});
getInfoClub(footballManager.club[0]?.uid);
// infoClub(footballManager.club[0].uid);
console.log(footballManager);

// function sellPlayer(playerId, clubId) {
//   const player = footballManager.player.find(
//     (player) => player.uid === playerId
//   );
//   const club = footballManager.player.find((club) => club.uid === clubId);

// }
