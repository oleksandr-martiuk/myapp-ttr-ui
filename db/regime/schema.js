const regimeSchema = new mongoose.Schema({
   user: {
      type: String,
      require: true
   },
   date: {
      type: String,
      require: true
   },
   time: {
      type: Number,
      require: true
   }
}, {
   collection: 'regimes'
});
const Regime = mongoose.model('Regime', regimeSchema);
