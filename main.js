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
  if (PlayerRegDate == null) {
    localStorage.setItem('PlayerRegDate', time);
    playerNick.innerHTML = nickName + ", дата регистрации: " + time;
  }
  let nickName = "Alexandr";
  playerNick.innerHTML = nickName + ", дата регистрации: " + localStorage.getItem('PlayerRegDate', time);
}

timePad();


// ID игрока
// сохранение в localStorage

function getPlayerID() {
	let playerID = localStorage.getItem('PlayerID', 0);
	if (playerID == null) {
		playerID = new Date().getTime();
		localStorage.setItem('PlayerID', playerID);
	}
	return playerID;
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

// let sleepCountSaver = localStorage.setItem('sleepCount', sleepCount);
// localStorage.getItem('sleepCount', sleepCount);