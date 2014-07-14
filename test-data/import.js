var Dog = require('../models/dog');
var User = require('../models/user');

var dogs = require('../test-data/dogs.data.json');
var users = require('../test-data/users.data.json');

var async = require('async');
var db = require('../data-sources/db');

var events = require('events');
var emitter = new events.EventEmitter();

module.exports = emitter;

var ids = {
};

function importData(Model, data, cb) {

  // console.log('Importing data for ' + Model.modelName);
  Model.destroyAll(function (err) {
    if(err) {
      cb(err);
      return;
    }
    async.each(data, function (d, callback) {
      if(ids[Model.modelName] === undefined) {
        ids[Model.modelName] = 1;
      }
      d.id = ids[Model.modelName]++;
      Model.create(d, callback);
    }, cb);
  });
}

async.series(
  [
    function (cb) {
    	cb();
      db.autoupdate(cb);
    },

    importData.bind(null, Dog, dogs),
    importData.bind(null, User, users),

    /*
    function (cb) {
      Car.destroyAll(function (err) {
        if(err) {
          cb(err);
          return;
        }
        async.eachSeries(cars, function (car, callback) {
          car.id = ids.car++;
          delete car.dealerId;
          Car.create(car, callback);
        }, cb);
      });
    },
    */], function (err, results) {
    if(err) {
      console.error(err);
      emitter.emit('error', err);
    } else {
      emitter.emit('done');
    }
  });