/**
 * Module Dependencies
 */

var db = require('../boot/db');
var config = require('../models.json');
var app = require('../app');

/**
 * dog Model
 */

var Dog = db.createModel(
  'dog',
  config.dog.properties,
  config.dog.options
);

/**
 * user Model
 */

var User = db.createModel(
  'user',
  config.user.properties,
  config.user.options
);

/**
 * gang Model
 */

var Gang = db.createModel(
  'gang',
  config.gang.properties,
  config.gang.options
);

Dog.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
User.hasMany(Dog, { foreignKey: 'ownerId', as: 'dogs' });
Dog.hasAndBelongsToMany(Gang, { as: 'gangs' });
Gang.hasAndBelongsToMany(Dog, { as: 'members' });

app.model(User);
app.model(Dog);
app.model(Gang);

module.exports = {
	User: User,
	Dog: Dog,
	Gang: Gang
};