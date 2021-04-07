const dbEngine = process.env.DB_ENVIRONMENT || 'development';

const knex = require('knex');

const config = require('../knexfile')[dbEngine];
const db = knex(config);

module.exports = db;
