function Player(name, age, position, nationality, price) {
  this.name = name;
  this.age = age;
  this.position = position;
  this.nationality = nationality;
  this.price = price;
}

function Club(name, city, stadion, budget) {
  this.name = name;
  this.city = city;
  this.stadion = stadion;
  this.budget = budget;
  this.players = [];

  this.addPlayers = function (player) {
    this.players.push(player);
  };

  this.showInfo = function () {
    console.log(`club ${this.name} \nplayers:`);
    
    this.players.forEach((player) => {
      console.log(player.name);
    });
  };
}

function Transfer(player, seller, buyer, price) {
  this.player = player;
  this.seller = seller;
  this.buyer = buyer;
  this.price = price;
}

const player1 = new Player("zidan", 44, "center", "italia", 3300);
const player2 = new Player("ivan", 44, "defender", "france", 300);

const dynamo = new Club("dynamo");
dynamo.addPlayers(player1);
dynamo.addPlayers(player2);

dynamo.showInfo();
