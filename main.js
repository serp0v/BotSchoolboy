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