const knex = require('knex');

const path = require('path');

const seedFile = require('knex-seed-file');

exports.seed = function(knex, Promise) {
    return knex('fatal_police_shootings_data').del()
    .then(() => seedFile(knex, path.resolve('./fatal-police-shootings-data.csv'), 'fatal_police_shootings_data', [
      'id',
      'name',
      'date',
      'manner_of_death',
      'armed',
      'age',
      'gender',
      'race',
      'city',
      'state',
      'signs_of_mental_illness',
      'threat_level',
      'flee',
      'body_camera'
    ], {
      columnSeparator: ',',
      ignoreFirstLine: true
    }));
};
