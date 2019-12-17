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

// const toTimestamp = (strDate) => {
//    const datum = Date.parse(strDate);
//    return datum/1000;
// }
// console.log(toTimestamp('12/15/2019 12:00:00'));
