let currentTime = 28800; // TODO: 8 hours (in seconds)
let timerState = false;

const toggleTimer = () => {
   const runCheckbox = document.getElementById("runSlide");
   runCheckbox.value = (runCheckbox.value === 'start') ? pauseTimer() : launchTimer();
};

const launchTimer = () => {
   timerState = setInterval(() => {
      currentTime--;
      renderTimer(currentTime);
      checkAlertTime(currentTime);
   }, 1000);

   return 'start';
};

const pauseTimer = () => {
   clearInterval(timerState);
   timerState = false;

   return 'pause';
};

const renderTimer = (currentTime) => {
   const time = convertTime(currentTime);

   document.getElementById('timer').innerHTML += "<span id='timer_text'></span>";
   document.getElementById('timer_text').innerHTML = time;
};

const convertTime = (t) => {
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

const checkAlertTime = (t) => {

};

renderTimer(currentTime); // run timer rendering when first time loads
