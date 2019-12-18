const addInput = document.getElementById("todoInput");
addInput.addEventListener("keyup", async (event) => {
   if (event.code === 'Enter') {
      event.preventDefault();

      if (!state.timerStatus) {
         launchTimer();
      }

      const date = getDateToday();
      const user = 'oleksandr.martiuk';
      const task = event.target['value'];

      const taskRec = { user, task, date };

      await saveTask(taskRec);
      await updateLastRegimeTime({lastNoteTime: state.time});
      await renderAllTasks();

      cleanAddInput();
      // mainWin.minimize(); // TODO: **USER** mode
   }
});

const renderTasks = async (tasks) => {
   document.getElementById('content').innerHTML = "";
   if (Array.isArray(tasks)){
      for (let [i, value] of tasks.entries()) {
         const addHTML = `
            <span class='timer_text'>
               ${++i} .
               <span class='removeBtn' id='${value._id}' onclick='removeTask(this)'> X </span>
               ${value.task}
            </span><br/><hr/>`;

         const element = document.getElementById('content');
         element.innerHTML += addHTML;
      }
   }
};

const removeTask = async (element) => {
   await deleteTask(element.id);
   await renderAllTasks();
};

const cleanAddInput = () => {
   addInput.value = "";
   document.activeElement.blur(); // removes focus from input (active element)
};

const renderAllTasks = async () => {
   const date = getDateToday();
   const tasks = await findAllTasksByDate(date);

   await renderTasks(tasks);
};
