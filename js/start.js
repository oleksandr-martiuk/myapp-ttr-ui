// Start point
(async () => {
   const regime = await getLastRegimeByDate();
   state.time = (regime.time) ? regime.time : process.env.MAX_TIME;
   await Promise.all([renderAllTasks(), renderTimer()]);
   if (state.time <= 0) {
      addSuccesfullTimerBoxStyle();
   }
})();
