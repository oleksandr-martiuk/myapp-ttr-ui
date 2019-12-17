const changeStartBtnState = (btnState) => {
   const element = document.getElementById('startBtn');
   switch (btnState) {
      case 'start':
         element.innerText = 'START';
         replaceClass(element, "red", "green");
         break;
      case 'stop':
         element.innerText = 'STOP';
         replaceClass(element, "green","red", );
         break;
   }
};

const replaceClass = (element, firstClass, secondClass) => {
   element.classList.remove(firstClass);
   element.classList.add(secondClass);
};

const addSuccesfullTimerBoxStyle = () => {
   const timerBlock = document.getElementById('timer');
   const timerText = document.getElementById('timer_text');
   timerBlock.setAttribute("style", "background-color: #46a882;");
   timerText.setAttribute("style", "color: #FFFFFF;")
};
