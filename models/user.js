/**
 * Module Dependencies
 */

var db = require('../data-sources/db');
var config = require('../models.json').user;

/**
 * user Model
 */

var User = db.createModel(
  'user',
  config.properties,
  config.options
);

module.exports = User;