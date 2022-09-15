// const getRegData = document.getElementById('getRegData').innerHTML = ;
// const informer = document.querySelector(".informer")
// localStorage.setItem('PlayerRegDate', time);
//   informer.textContent = getWorkTime(hour);
// setInterval(timePad, 1000);
// const hour =  time.split(":")[0];



const clock = document.getElementById("getRegData")
const playerNick = document.getElementById("playerNick")

const config = {
  timeZone: "Europe/Moscow",
}
const today = new Date();
const time = today.toLocaleTimeString("ru-RU", {year: 'numeric', month: '2-digit', day: '2-digit', timeZone: config.timeZone})

const timePad = () => {
  let PlayerRegDate = localStorage.getItem('PlayerRegDate', 0);
  let nickName = "Alexandr";
  if (PlayerRegDate == null) {
    localStorage.setItem('PlayerRegDate', time);
    playerNick.innerHTML = nickName + ", дата регистрации: " + time;
  }
  playerNick.innerHTML = nickName + ", дата регистрации: " + localStorage.getItem('PlayerRegDate');
}

timePad();


// ID игрока
// сохранение в localStorage

const playerIdDom = document.querySelector('#playerIdDom');
let playerID = localStorage.getItem('PlayerID', 0);

function getPlayerID() {
	if (playerID == null) {
		playerID = new Date().getTime();
		localStorage.setItem('PlayerID', playerID);
	}
  playerIdDom.innerHTML = "Ваш ID: " + localStorage.getItem('PlayerID').slice(3);
}

getPlayerID();

// уровень сна
// данные обнуляются после перезагрузки

let sleepCount = 100;
let sleepLevel = document.getElementById('sleepLevel');
sleepLevel.innerHTML = "Уровень сна: " + sleepCount + "%";

const sleepLevelEvent = document.getElementById('sleepLevelEvent').onclick = () =>{
  if (sleepCount >= 5) {
  sleepLevelMinus();
  }
};

setInterval(() => {
  if (sleepCount < 100) {
    sleepCount = sleepCount + 1;
    sleepLevel.innerHTML = "Уровень сна: " + sleepCount + "%";
  }
}, 1000);
// }, 288000);

function sleepLevelMinus() {
  sleepCount = sleepCount - 5;
  sleepLevel.innerHTML = "Уровень сна: " + sleepCount + "%";
}

// баланс
// падает до отрицательного

const balance = document.getElementById('balance');
let balanceCount = 100000;
balance.innerHTML ="Карманные деньги: " + balanceCount + "$";

// Карточка

const bankCard = document.getElementById('bankCard');
let bankCardCount = 10000;
bankCard.innerHTML ="На карте: " + bankCardCount + "$";

setInterval(() => {
  if (bankCardCount) {
    bankCardCount = Math.round(bankCardCount + (bankCardCount/1000));
    bankCard.innerHTML = "На карте: " + bankCardCount + "$";
  }
}, 1000);

// Динамическая валюта

const coinBalance = document.querySelector('#coinBalance');
let dynamicCoinBalance = 0;

const howMuchCoin = document.querySelector('#howMuchCoin').value;
const howMuchCoinSell = document.querySelector('#howMuchCoinSell').value;


coinBalance.innerHTML = "У вас " + dynamicCoinBalance + " монет";

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);  
}

const dynamicCoin = document.querySelector('#dynamicCoin');
let dynamicCoinCount = randomInteger(1000,2000);
let dynamicCoinCost = howMuchCoin * dynamicCoinCount;

dynamicCoin.innerHTML = "Текущий курс валюты: " + dynamicCoinCount;

setInterval(() => {
  let dynamicCoinCount = randomInteger(1000,2000);
  // console.log(dynamicCoinCount, "123")
  dynamicCoin.innerHTML = "Текущий курс валюты: " + dynamicCoinCount;
}, 10000);

// Денежные операции

// с карты на баланс

const cardToBalanceOperation = document.getElementById('cardToBalanceOperation').onclick = () => {
  const cardToBalance = document.getElementById('cardToBalance').value;
  console.log(cardToBalance);
  if (cardToBalance <= bankCardCount) {
    balanceCount = balanceCount + +cardToBalance;
    bankCardCount = bankCardCount - +cardToBalance;
    bankCard.innerHTML ="На карте: " + bankCardCount + "$";
    balance.innerHTML ="Карманные деньги: " + balanceCount + "$";
  }
  if (cardToBalance > bankCardCount) {
    console.log('error');
  }
}

//  с баланса на карту

const balanceToCardOperation = document.getElementById('balanceToCardOperation').onclick = () => {
  const balanceToCard = document.getElementById('balanceToCard').value;
  console.log(balanceToCard);
  if (balanceToCard <= balanceCount) {
    balanceCount = balanceCount - +balanceToCard;
    bankCardCount = bankCardCount + +balanceToCard;
    bankCard.innerHTML ="На карте: " + bankCardCount + "$";
    balance.innerHTML ="Карманные деньги: " + balanceCount + "$";
  }
  if (cardToBalance > balanceCount) {
    console.log('error');
  }
}

// покупка динамической валюты

const buyDynamicCoin = document.querySelector('#buyDynamicCoin').onclick = () => {
  const howMuchCoin = document.querySelector('#howMuchCoin').value;
  let dynamicCoinCost = howMuchCoin * dynamicCoinCount;
  if (dynamicCoinCost <= balanceCount) {
    dynamicCoinBalance = dynamicCoinBalance + +howMuchCoin;
    balanceCount = balanceCount - +dynamicCoinCost;
    balance.innerHTML ="Карманные деньги: " + balanceCount + "$";
    coinBalance.innerHTML = "У вас " + dynamicCoinBalance + " монет";
  }
  // if (dynamicCoinCost > balanceCount) {
  //   console.log('мало денег');
  // }
};

// продажа динамической валюты

const sellDynamicCoin = document.querySelector('#sellDynamicCoin').onclick = () => {
  const howMuchCoinSell = document.querySelector('#howMuchCoinSell').value;
  let dynamicCoinSellCost = howMuchCoinSell * dynamicCoinCount;
  console.log(dynamicCoinSellCost)
  if (howMuchCoinSell <= dynamicCoinBalance) {
    dynamicCoinBalance = dynamicCoinBalance - +howMuchCoinSell;
    coinBalance.innerHTML = "У вас " + dynamicCoinBalance + " монет";
    balanceCount = balanceCount + +dynamicCoinSellCost;
    balance.innerHTML ="Карманные деньги: " + balanceCount + "$";
  }
};

// Уровень

const level = document.getElementById('level');
let levelCount = 1;
let levelCountMax = 11;
level.innerHTML ="Уровень: " + levelCount;
let levelUpCost = 1000;

const buyLevel = document.getElementById('buyLevel').onclick = () =>{
  balance.innerHTML ="Карманные деньги: " + balanceCount + "$";
  if (levelCount < levelCountMax && balanceCount >= levelUpCost) {
    levelCount = levelCount + 1;
    level.innerHTML ="Уровень: " + levelCount;
    balanceCount = balanceCount - levelUpCost;
    balance.innerHTML ="Карманные деньги: " + balanceCount + "$";
    levelUpCost = levelUpCost * 2;
  }
  if (levelCount >= levelCountMax) {
    console.log("У вас максимальный уровень");
  }
  if (balanceCount < levelUpCost) {
    console.log("У вас не хватает денег на новый уровень");
  }
}
// Имущество

const cars = document.getElementById('cars');
let carCounter = 0;
const buyCar = document.getElementById('buyCar').onclick = () =>{
  balanceCount = balanceCount - car1;
  balance.innerHTML ="Карманные деньги: " + balanceCount + "$";
  carCounter = carCounter + 1;
  cars.innerHTML ="Машина: " + carCounter;
  if (balanceCount < car1) {
    console.log("Недостаточно денег");
    carCounter = carCounter - 1;
    balanceCount = balanceCount + car1;
    cars.innerHTML ="Машина: " + carCounter;
  }
};

cars.innerHTML ="Машина: " + carCounter;

let car1 = 5000;

// let carsArray = [];

// Работы

const work = document.getElementById('work').onclick = () => {
  if (sleepCount >= 5) {
    sleepLevelMinus();
    workReward();
  }
};

function workReward() {
  balanceCount = balanceCount + 2467;
  balance.innerHTML ="Карманные деньги: " + balanceCount + "$";
}

// Магазин

// const shop = document.getElementById("shop");
// const Consumables = document.getElementByid("Consumables");

let energyDrinkCost = 1000;

const energyDrink = document.getElementById("energyDrink").onclick = () => {
  if (balanceCount > energyDrinkCost) {
    balanceCount = balanceCount - energyDrinkCost;
    balance.innerHTML ="Карманные деньги: " + balanceCount + "$";
    if (sleepCount > 50) {
      sleepCount = 100;
      sleepLevel.innerHTML = "Уровень сна: " + sleepCount + "%";
    }
    else {
      sleepCount = sleepCount + 50;
      sleepLevel.innerHTML = "Уровень сна: " + sleepCount + "%";
    }
  }
  else {
    console.log("Не хватило денег на энергетик")
  }
};

const grandma = document.querySelector("#grandma");
const mother = document.querySelector("#mother");

let motherBonusTimer = 24;
let grandmaBonusTimer = 168;

let motherBonusCount = 3000;
let grandmaBonusCount = 10000;

grandma.innerHTML = "До получения бонуса от бабушки: " + grandmaBonusTimer + " часов.";
mother.innerHTML = "До получения бонуса от бабушки: " + motherBonusTimer + " часов.";

// Награда мамы

setInterval(() => {
  if (motherBonusTimer > 0) {
    motherBonusTimer = motherBonusTimer - 1;
    mother.innerHTML = "До получения бонуса от бабушки: " + motherBonusTimer + " часов.";
  }
  if (motherBonusTimer <= 0){
    motherBonusTimer = 24;
    balanceCount = balanceCount + motherBonusCount;
    balance.innerHTML ="Карманные деньги: " + balanceCount + "$";
  }
}, 100);

// Награда бабушки

setInterval(() => {
  if (grandmaBonusTimer > 0) {
    grandmaBonusTimer = grandmaBonusTimer - 1;
    grandma.innerHTML = "До получения бонуса от бабушки: " + grandmaBonusTimer + " часов.";
  }
  if (grandmaBonusTimer <= 0){
    grandmaBonusTimer = 168;
    balanceCount = balanceCount + grandmaBonusCount;
    balance.innerHTML ="Карманные деньги: " + balanceCount + "$";
  }
}, 100);