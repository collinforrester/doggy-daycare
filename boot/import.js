var Models = require('../models/models');
var Dog = Models.Dog;
var User = Models.User;
var Kennel = Models.Kennel;
var Visit = Models.Visit;

var dogs = require('../test-data/dogs.data.json');
var users = require('../test-data/users.data.json');
var kennels = require('../test-data/kennels.data.json');
var visits = require('../test-data/visits.data.json');

var async = require('async');
var db = require('../boot/db');

var events = require('events');
var emitter = new events.EventEmitter();

module.exports = emitter;

var ids = {
};

function importData(Model, data, cb) {

  console.log('Importing data for ' + Model.modelName);
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
        db.autoupdate(cb);
    },

    importData.bind(null, Dog, dogs),
    importData.bind(null, Visit, visits),
    importData.bind(null, Kennel, kennels),
    importData.bind(null, User, users),
    function(cb) {
      Visit.find({}, function(e, visits) {
        cb();
        // dogs[5].friends.add(dogs[1], function(){});
        // dogs[1].friends.add(dogs[5], cb);
        // g.dogs.add(dogs[0], cb);
      });
      // Gang.create({
      //   violent: false
      // }, function(e, g) {
      // });
      // Dog.find({}, function(e, dogs) {
      //   if(e) throw new Error(e);
      //   console.log(dogs);
      //   cb();
      // });
    }

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