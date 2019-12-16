let input = document.getElementById("todoInput");

input.addEventListener("keyup", function(event) {
   console.log(event.code);
   if (event.code === 'Enter') {
      event.preventDefault();
      renderNewTask(event.target['value']);
      // mainWin.minimize(); // TODO: uncommented (dev.mode)
   }
});

const renderNewTask = (task) => {
   document.getElementById('content').innerHTML += "<span id='timer_text'>" + task + "</span><br/><hr/>";
   input.value = "";
   document.activeElement.blur(); // remove focus from input (active element)
};
