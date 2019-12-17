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
      // checkNoteTime(); // TODO: USER mode
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
   if (state.time % +process.env.NOTE_TIME === 0) {
      mainWin.show(); // TODO: USER mode
      addInput.focus();
   }
};

renderTimer(); // run timer rendering when first time loads
