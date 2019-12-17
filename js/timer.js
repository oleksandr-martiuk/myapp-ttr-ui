const toggleTimer = () => {
   const element = document.getElementById('startBtn');
   if (!!state.timerStatus) {
      pauseTimer();
      element.innerText = 'START';
      replaceClass(element, "red", "green");
   } else {
      launchTimer();
      element.innerText = 'STOP';
      replaceClass(element, "green","red", );
   }
};

const launchTimer = () => {
   state.timerStatus = setInterval(() => {
      state.time--;
      renderTimer();
      checkNoteTime();
   }, 1000);
   // mainWin.minimize(); // TODO: USER mode
};

const pauseTimer = () => {
   clearInterval(state.timerStatus);
   state.timerStatus = false;
};

const renderTimer = () => {
   const time = convertTime(state.time);

   document.getElementById('timer').innerHTML += "<span id='timer_text'></span>";
   document.getElementById('timer_text').innerHTML = time;
};

const checkNoteTime = () => {
   // if (state.time % +process.env.NOTE_TIME === 0) { // TODO: USER mode
   //    mainWin.show();
   //    addInput.focus();
   // }

   if (state.time % process.env.UPDATE_REGIME_PERIOD === 0) {
      updateLastRegimeTime();
   }
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

const updateLastRegimeTime = async () => {
   const date = getDateToday();
   const user = 'oleksandr.martiuk';
   const parameters = {date, user};

   const lastRegime = await getLastRegimeByDate(parameters);
   if (Object.keys(lastRegime).length) {
      await updateRegime(lastRegime._id, {time: state.time});
   } else {
      await saveRegime({...parameters, time: state.time});
   }
};

const getLastSortdRegime = (regimes) => {
   const sortedRegimes = regimes.sort((a, b) => a.date !== b.date ? a.date < b.date ? -1 : 1 : 0);
   return sortedRegimes[sortedRegimes.length - 1];
};
