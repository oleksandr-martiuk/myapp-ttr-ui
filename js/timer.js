const toggleTimer = (element) => {
   (element.checked) ? pauseTimer(element) : launchTimer(element);
};

const launchTimer = () => {
   state.timerStatus = setInterval(() => {
      state.time--;
      renderTimer();
      checkNoteTime();
   }, 1000);
   mainWin.minimize(); // TODO: to uncomment (dev.mode)
};

const pauseTimer = () => {
   clearInterval(state.timerStatus);
};

const renderTimer = () => {
   const time = convertTime(state.time);

   document.getElementById('timer').innerHTML += "<span id='timer_text'></span>";
   document.getElementById('timer_text').innerHTML = time;
};

const checkNoteTime = () => {
   if (state.time % +process.env.NOTE_TIME === 0) {
      mainWin.show(); // TO
   }
};

renderTimer(); // run timer rendering when first time loads
