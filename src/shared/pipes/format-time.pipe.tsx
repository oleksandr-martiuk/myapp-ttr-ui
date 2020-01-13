import moment from "moment";

interface ITimeSegments {
   hour: string;
   minute: string;
   second: string;
}

const doubleDigit = (digit: number): string => (digit < 10) ? "0" + digit : "" + digit;

export const formatTime = (time: number): ITimeSegments => {
   const timer: {[index: string]:any} = {
      h: Math.trunc(moment.duration(time).asHours()),
      m: moment.duration(time).minutes(),
      s: moment.duration(time).seconds()
   };

   for (let name in timer) {
      if (timer[name] < 0) {
         timer[name] = -timer[name];
      }
   }

   return {
      hour: doubleDigit(timer.h),
      minute: doubleDigit(timer.m),
      second: doubleDigit(timer.s)
   };
};
