const mainWin = require('electron').remote.getCurrentWindow();

const state = {
   time: +process.env.MAX_TIME,
   timerStatus: +process.env.TIMER_STATUS
};
