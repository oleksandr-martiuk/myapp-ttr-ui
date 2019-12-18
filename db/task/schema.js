const taskSchema = new mongoose.Schema({
   user: {
      type: String,
      required: true
   },
   task: {
      type: String,
      required: true
   },
   date: {
      type: String,
      required: true
   }
}, {
   collection: 'tasks'
});
const Task = mongoose.model('Task', taskSchema);
