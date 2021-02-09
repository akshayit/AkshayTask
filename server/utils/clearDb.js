const mongoose = require('mongoose');
const async = require('async');

export function clearDatabase(callback) {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('Attempt to clear non testing database!');
  }

  const fns = [];

  function createAsyncFn(index) {
    fns.push((done) => {
      mongoose.connection.collections[index].remove(() => {
        done();
      });
    });
  }

  for (const i in mongoose.connection.collections) {
    if (mongoose.connection.collections.hasOwnProperty(i)) {
      createAsyncFn(i);
    }
  }

  async.parallel(fns, () => callback());
}
