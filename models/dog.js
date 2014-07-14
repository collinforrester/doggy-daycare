/**
 * Module Dependencies
 */

var db = require('../data-sources/db');
var config = require('../models.json').dog;

/**
 * dog Model
 */

var Dog = db.createModel(
  'dog',
  config.properties,
  config.options
);

module.exports = Dog;