const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST, {
   useNewUrlParser: true,
   useFindAndModify: false,
   useCreateIndex: true,
   useUnifiedTopology: true
});

const taskSchema = new mongoose.Schema({
   user: String,
   date: String,
   task: String
});

const Task = mongoose.model('Task', taskSchema);
