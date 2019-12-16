const mainWin = require('electron').remote.getCurrentWindow();
const timer = {
   time: 28800, // TODO: 8 hours
   state: false
};

const toggleTimer = (element) => {
   (element.checked) ? pauseTimer(element) : launchTimer(element);
};

const launchTimer = () => {
   timer.state = setInterval(() => {
      timer.time--;
      renderTimer();
      checkAlertTime();
   }, 1000);
   // mainWin.minimize(); // TODO: uncommented (dev.mode)
};

const pauseTimer = () => {
   clearInterval(timer.state);
};

const renderTimer = () => {
   const time = convertTime(timer.time);

   document.getElementById('timer').innerHTML += "<span id='timer_text'></span>";
   document.getElementById('timer_text').innerHTML = time;
};

const convertTime = () => {
   const {time: t} = timer;
   const maxSec = 60;
   const maxMin = 60;

   const time = {
      hour: Math.floor(t / (maxMin * maxSec)),
      min: Math.floor(t % (maxMin * maxSec) / maxSec),
      sec: t % maxSec
   };

   for (let propName of Object.keys(time)) {
      if (time[propName] < 10) {
         time[propName] = "0" + time[propName];
      }
   }

   return time.hour + " : " + time.min + " : " + time.sec;
};

const checkAlertTime = () => {
   if (timer.time % 1800 === 0) {
      // mainWin.setFullScreen(true); // TODO: uncommented (dev.mode)
      mainWin.show();
   }
};

renderTimer(); // run timer rendering when first time loads
