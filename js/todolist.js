const addInput = document.getElementById("todoInput");
addInput.addEventListener("keyup", async (event) => {
   if (event.code === 'Enter') {
      event.preventDefault();

      await saveTask(event.target['value']);
      await renderAllTasks();
      cleanAddInput();
      // mainWin.minimize(); // TODO: DEV mode
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
   const tasks = await findAllTasks();
   await renderTasks(tasks);
};
