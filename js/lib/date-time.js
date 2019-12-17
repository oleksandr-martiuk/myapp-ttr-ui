const getDateToday = () => {
   const today = new Date();
   let dd = today.getDate();
   let mm = today.getMonth() + 1;
   const yyyy = today.getFullYear();

   if (dd < 10) {
      dd = '0' + dd;
   }
   if (mm < 10) {
      mm = '0' + mm;
   }

   return yyyy + '-' + mm + '-' + dd;
};

const convertTime = () => {
   const {time: t} = state;
   const maxSec = 60;
   const maxMin = 60;
   const time = {};

   time.hour = (t > 0) ? Math.floor(t / (maxMin * maxSec)) : Math.round(t / (maxMin * maxSec));
   time.min = (t > 0) ? Math.floor(t % (maxMin * maxSec) / maxSec) : Math.round(t % (maxMin * maxSec) / maxSec);
   time.sec = t % maxSec;

   for (let propName of Object.keys(time)) {
      time[propName] = (time[propName] < 0) ? -time[propName] : time[propName];
      if (time[propName] < 10) {
         time[propName] = "0" + time[propName];
      }
   }

   return time.hour + " : " + time.min + " : " + time.sec;
};
