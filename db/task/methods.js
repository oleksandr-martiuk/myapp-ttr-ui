const findAllTasksByDate = (date) => {
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

const saveTask = (taskRec) => {
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

const deleteTask = (id) => {
   return new Promise(resolve => {
      return Task.deleteOne({ _id: id }, (err, result) => {
         if (err) {
            console.log(err);
            resolve(err);
         }
         resolve(result.deletedCount);
      });
   })
};