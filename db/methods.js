const findAllTasks = () => {
   const date = getDateToday();

   return new Promise(resolve => {
      return Task.find({date}, (err, tasks) => {
         if (err) {
            return console.error(err);
         }
         const results = tasks.map(item => item['_doc']);
         resolve(results);
      });
   })
};

const saveTask = (task) => {
   const date = getDateToday();
   const user = 'some.random.user';

   const taskRec = { user, task, date };
   const taskModel = new Task(taskRec);

   return new Promise(resolve => {
      return taskModel.save((err, task) => {
         if (err) {
            console.log(err);
            resolve(err);
         }
         resolve(task['_doc']);
      });
   })
};
