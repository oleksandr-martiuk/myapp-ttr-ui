const regimeSchema = new mongoose.Schema({
   user: {
      type: String,
      required: true
   },
   date: {
      type: String,
      required: true
   },
   time: {
      type: Number,
      required: true
   },
   lastNoteTime: {
      type: Number,
      required: true
   }
}, {
   collection: 'regimes'
});
const Regime = mongoose.model('Regime', regimeSchema);
