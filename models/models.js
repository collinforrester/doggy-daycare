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
 * kennel Model
 */

var Kennel = db.createModel(
  'kennel',
  config.kennel.properties,
  config.kennel.options
);

/**
 * visit Model
 */

var Visit = db.createModel(
  'visit',
  config.visit.properties,
  config.visit.options
);

Dog.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
Kennel.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
User.hasMany(Dog, { foreignKey: 'ownerId', as: 'dogs' });
User.hasMany(Kennel, { foreignKey: 'ownerId', as: 'kennels' });

Visit.belongsTo(Dog);
Visit.belongsTo(Kennel);
Visit.scope('current', { include: ['dog', 'kennel'], where: { dateOut: { lte: 0 }}});

Kennel.hasMany(Dog, { through: Visit });
Dog.hasMany(Kennel, { through: Visit });

app.model(User);
app.model(Dog);
app.model(Kennel);
app.model(Visit);

module.exports = {
	User: User,
  Dog: Dog,
	Visit: Visit,
	Kennel: Kennel
};