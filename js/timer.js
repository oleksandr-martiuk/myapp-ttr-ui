let startTime = 28800; // TODO: 8 hours (in seconds)

setInterval(() => {
   startTime--;
   renderTimer(startTime);
}, 1000);

const renderTimer = (currentTime) => {
   const time = convertTime(currentTime);

   document.getElementById('timer').innerHTML += "<span id='timer_text'></span>";
   document.getElementById('timer_text').innerHTML = time;
};

const convertTime = (n) => {
   const maxSec = 60;
   const maxMin = 60;

   const time = {
      hour: Math.floor(n / (maxMin * maxSec)),
      min: Math.floor(n % (maxMin * maxSec) / maxSec),
      sec: n % maxSec
   };

   for (let propName of Object.keys(time)) {
      if (time[propName] < 10) {
         time[propName] = "0" + time[propName];
      }
   }

   return time.hour + " : " + time.min + " : " + time.sec;
};
