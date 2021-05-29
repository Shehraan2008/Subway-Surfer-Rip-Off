let score = (coins = drinks = 0);
let gameState = "play";
let coinGroup,
  energyDrinkGroup,
  swordGroup,
  coin,
  drink,
  sword,
  coinImg,
  drinkImg,
  swordImg;
let jake, jakeAnimation;
let roadImg, road;

// Loading Image Assets.
function preload(params) {
  jakeAnimation = loadAnimation(
    "./app/assets/Jake1.png",
    "./app/assets/Jake2.png",
    "./app/assets/Jake3.png",
    "./app/assets/Jake4.png"
  );

  roadImg = loadImage("./app/assets/Road.png");

  coinImg = loadImage("./app/assets/coin.png");
  drinkImg = loadImage("./app/assets/energyDrink.png");
  swordImg = loadImage("./app/assets/sword.png");
}

function setup(params) {
  const canvas = createCanvas(800, 550);

  // Sprites
  road = createSprite(width / 2, height / 2, width, height);
  road.addImage(roadImg);

  jake = createSprite(width / 2, height / 2 + 100, 50, 50);
  jake.addAnimation("jakeRunning", jakeAnimation);

  // Sprite Groups.
  coinGroup = createGroup();
  swordGroup = createGroup();
  energyDrinkGroup = createGroup();
}

function draw(params) {
  background(0);

  // Controlling the game accridng to the gameState
  if (gameState === "play") {
    // Hiding some sprites

    // Ground Moving Effect
    road.velocityY = 4 + (3 * score) / 100;
    if (road.y > height) {
      road.y = road.height / 50;
    }

    // Score Mechanism
    score = score + Math.round(getFrameRate() / 60);

    // player movement
    if (keyDown("RIGHT_ARROW")) {
      jake.velocityX = 8;
    }
    if (keyDown("LEFT_ARROW")) {
      jake.velocityX = -8;
    }

    // Spawning Object
    spawnCoin();
    spawnDrink();
    spawnSword();

    // Collison Detection
    for (var i = 0; i < coinGroup.lenght; i++) {
      if (coinGroup.get(i).isTouching(jake)) {
        coinGroup.get(i).destroy();
        coins++;
      }
    }

    for (let i = 0; i < energyDrinkGroup.lenght; i++) {
      if (energyDrinkGroup.get(i).isTouching(jake)) {
        energyDrinkGroup.get(i).destroy();
        drinks++;
      }
    }

    if (swordGroup.isTouching(jake)) {
      gameState = "end";
    }
  } else if (gameState === "end") {
    road.velocityY = 0;
    jake.velocityX = 0;
    coinGroup.setLifetimeEach(-1);
    energyDrinkGroup.setLifetimeEach(-1);
    swordGroup.setLifetimeEach(-1);
    swordGroup.setVelocityYEach(0);
    coinGroup.setVelocityYEach(0);
    energyDrinkGroup.setVelocityYEach(0);
  }

  drawSprites();

  // Game Essentials
  textSize(24);
  text(`💎 ${coins}`, 170, 50);
  text(`🥤 ${drinks}`, 270, 50);
  text(`score: ${score}`, 50, 50);
}

spawnSword = (_) => {
  if (frameCount % 60 === 0) {
    sword = createSprite(Math.round(random(50, width - 50)), 0, 50, 50);
    sword.velocityY = 6 + score / 100;
    sword.addImage(swordImg);
    swordGroup.add(sword);
    sword.lifetime = 300;
    sword.scale = 0.2;
  }
};

spawnCoin = (_) => {
  if (frameCount % 10 === 0) {
    coin = createSprite(Math.round(random(50, width - 50)), 0, 50, 50);
    coin.velocityY = 6 + score / 100;
    coin.addImage(coinImg);
    coin.lifetime = 300;
    coinGroup.add(coin);
    coin.scale = 0.2;
  }
};

spawnDrink = (_) => {
  if (frameCount % 200 === 0) {
    drink = createSprite(Math.round(random(50, width - 50)), 0, 50, 50);
    drink.velocityY = 6 + score / 100;
    energyDrinkGroup.add(drink);
    drink.addImage(drinkImg);
    drink.lifetime = 300;
    drink.scale = 0.3;
  }
};
