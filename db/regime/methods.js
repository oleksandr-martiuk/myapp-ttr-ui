const saveRegime = (regimeRec) => {
   const regimeModel = new Regime(regimeRec);

   return new Promise(resolve => {
      return regimeModel.save((err, regime) => {
         if (err) {
            console.log(err);
            resolve(err);
         }
         resolve(regime['_doc']);
      });
   })
};

const findRegimesByParams = (parameters) => {
   return new Promise(resolve => {
      return Regime.find(parameters, (err, regimes) => {
         if (err) {
            return console.error(err);
         }
         const results = regimes.map(item => item['_doc']);
         resolve(results);
      });
   })
};

const updateRegime = (id, update) => {
   return new Promise(resolve => {
      return Regime.findByIdAndUpdate(id, update, (err, regime) => {
         if (err) {
            console.log(err);
            resolve(err);
         }
         resolve(regime['_doc']);
      });
   })
};
