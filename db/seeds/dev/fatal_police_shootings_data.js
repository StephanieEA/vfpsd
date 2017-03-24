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

// exports.seed = function (knex, Promise) {
//   return knex('fatal_police_shootings_data').del()
//   .then(function () {
//       return Promise.all([
//         knex('fatal_police_shootings_data').insert({
//           name: 'Tim Elliot',
//           date: '2015-01-02',
//           manner_of_death: 'shot',
//           armed: 'gun',
//           age: 53,
//           gender: 'M',
//           race: 'A',
//           city: 'Shelton',
//           state: 'WA',
//           stateId: 56,
//           signs_of_mental_illness: 'true',
//           threat_level: 'attack',
//           flee: 'Not fleeing',
//           body_camera: 'false'
//         }),
//         knex('fatal_police_shootings_data').insert({
//           name: 'Lewis Lee Lembke',
//           date: '2015-01-02',
//           manner_of_death: 'shot',
//           armed: 'gun',
//           age: 47,
//           gender: 'M',
//           race: 'W',
//           city: 'Aloha',
//           state: 'OR',
//           stateId: 43,
//           signs_of_mental_illness: 'false',
//           threat_level: 'attack',
//           flee: 'Not fleeing',
//           body_camera: 'false'
//         }),
//         knex('fatal_police_shootings_data').insert({
//           name: 'John Paul Quintero',
//           date: '2015-01-02',
//           manner_of_death: 'shot and Tasered',
//           armed: 'unarmed',
//           age: 23,
//           gender: 'M',
//           race: 'H',
//           city: 'Wichita',
//           state: 'KS',
//           stateId: 19,
//           signs_of_mental_illness: 'false',
//           threat_level: 'other',
//           flee: 'Not fleeing',
//           body_camera: 'false'
//         })
//       ]);
//    });
// };
