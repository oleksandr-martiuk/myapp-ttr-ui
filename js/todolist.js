let input = document.getElementById("todoInput");

input.addEventListener("keyup", function(event) {
   if (event.code === 'Enter') {
      event.preventDefault();
      renderNewTask(event.target['value']);
   }
});

const renderNewTask = (task) => {
   document.getElementById('content').innerHTML += "<span id='timer_text'>" + task + "</span><br/><hr/>";
   input.value = "";
   document.activeElement.blur(); // remove focus from input (active element)
};
