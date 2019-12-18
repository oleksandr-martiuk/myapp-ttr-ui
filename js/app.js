const mainWin = require('electron').remote.getCurrentWindow();

const state = {
   time: 0,
   start: {
      actualTime: 0,
      pointTime: 0
   },
   timerStatus: +process.env.TIMER_STATUS
};
