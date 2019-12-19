const toggleTimer = () => {
   (!!state.timerStatus) ? pauseTimer() : launchTimer();
};

const launchTimer = () => {
   state.start.actualTime = getTimeNow();
   state.start.pointTime = state.time;

   changeStartBtnState('stop');
   state.timerStatus = setInterval(() => {
      setStateTime();
      renderTimer();
      checkTimeEvents();
   }, 1000);
   hideWindow(); // TODO: **USER** mode
};

const setStateTime = () => {
   const timeNow = getTimeNow();
   const diff = timeNow - state.start.actualTime;

   state.time = state.start.pointTime - diff;
};

const pauseTimer = () => {
   changeStartBtnState('start');
   clearInterval(state.timerStatus);
   state.timerStatus = false;
};

const renderTimer = () => {
   const time = convertTime(state.time);

   document.getElementById('timer').innerHTML += "<span id='timer_text'></span>";
   document.getElementById('timer_text').innerHTML = time;
};

const checkTimeEvents = () => {
   getLastRegimeByDate().then(lastRegime => {
      if (lastRegime.lastNoteTime - state.time >= process.env.NOTE_TIME) { // TODO: **USER** mode
         pauseTimer();
         mainWin.show();
         addInput.focus();
      }

      if (state.time % process.env.UPDATE_REGIME_PERIOD === 0) {
         updateLastRegimeTime({time: state.time});
      }

      if (state.time <= 0) {
         addSuccesfullTimerBoxStyle();
      }

      return Promise.resolve();
   })
};

const getLastRegimeByDate = async () => {
   let regime = {};

   const dateToday = getDateToday();
   const parameters = {
      date: dateToday,
      user: 'oleksandr.martiuk'
   };
   const regimes = await findRegimesByParams(parameters);

   return (regimes.length) ? getLastSortdRegime(regimes) : regime;
};

const updateLastRegimeTime = async (newParams = {}) => {
   const date = getDateToday();
   const user = 'oleksandr.martiuk';
   const regimeParameters = {date, user};

   const lastRegime = await getLastRegimeByDate(regimeParameters);
   if (Object.keys(lastRegime).length) {
      await updateRegime(lastRegime._id, {...newParams});
   } else {
      const preparedRegime = {
         ...regimeParameters,
         ...newParams,
         time: state.time,
         lastNoteTime: process.env.MAX_TIME
      };
      await saveRegime(preparedRegime);
   }
};

const getLastSortdRegime = (regimes) => {
   const sortedRegimes = regimes.sort((a, b) => a.date !== b.date ? a.date < b.date ? -1 : 1 : 0);
   return sortedRegimes[sortedRegimes.length - 1];
};
