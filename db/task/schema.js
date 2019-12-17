const taskSchema = new mongoose.Schema({
   user: {
      type: String,
      require: true
   },
   task: {
      type: String,
      require: true
   },
   date: {
      type: String,
      require: true
   }
}, {
   collection: 'tasks'
});
const Task = mongoose.model('Task', taskSchema);
