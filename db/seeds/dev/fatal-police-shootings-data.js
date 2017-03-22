const knex = require('knex');

const path = require('path');

exports.seed = function (knex, Promise) {
  return knex('fatal_police_shootings_data').del()
  .then(function () {
      return Promise.all([
        knex('fatal_police_shootings_data').insert({
          name: 'Tim Elliot',
          manner_of_death: 'shot',
          armed: 'gun',
          age: 53,
          gender: 'M',
          race: 'A',
          city: 'Shelton',
          state: 'WA',
          signs_of_mental_illness: 'true',
          threat_level: 'attack',
          flee: 'Not fleeing',
          body_camera: 'false'
        }),
        knex('fatal_police_shootings_data').insert({
          name: 'Lewis Lee Lembke',
          manner_of_death: 'shot',
          armed: 'gun',
          age: 47,
          gender: 'M',
          race: 'W',
          city: 'Aloha',
          state: 'OR',
          signs_of_mental_illness: 'false',
          threat_level: 'attack',
          flee: 'Not fleeing',
          body_camera: 'false'
        }),
        knex('fatal_police_shootings_data').insert({
          name: 'John Paul Quintero',
          manner_of_death: 'shot and Tasered',
          armed: 'unarmed',
          age: 23,
          gender: 'M',
          race: 'H',
          city: 'Wichita',
          state: 'KS',
          signs_of_mental_illness: 'false',
          threat_level: 'other',
          flee: 'Not fleeing',
          body_camera: 'false'
        })
      ]);
   });
};
