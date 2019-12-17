let input = document.getElementById("todoInput");
input.addEventListener("keyup", async (event) => {
   if (event.code === 'Enter') {
      event.preventDefault();

      await saveTask(event.target['value']);
      await renderAllTasks();
      cleanAddInput();
      mainWin.minimize(); // TODO: to uncomment (dev.mode)
   }
});

const renderTasks = async (tasks) => {
   document.getElementById('content').innerHTML = "";
   if (Array.isArray(tasks)){
      for (let [i, value] of tasks.entries()) {
         const addHTML = "<span id='timer_text'>" + ++i + ". " + value.task + "</span><br/><hr/>"
         document.getElementById('content').innerHTML += addHTML;
      }
   }
};

const cleanAddInput = () => {
   input.value = "";
   document.activeElement.blur(); // removes focus from input (active element)
};

const renderAllTasks = async () => {
   const tasks = await findAllTasks();
   await renderTasks(tasks);
};

const toggleStart = () => {

};
