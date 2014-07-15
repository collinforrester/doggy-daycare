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

Dog.belongsTo(require('./user'), { as: 'owner', foreignKey: 'owner' });

module.exports = Dog;