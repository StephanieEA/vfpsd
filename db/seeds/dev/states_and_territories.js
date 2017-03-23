const knex = require('knex');

const path = require('path');

exports.seed = function (knex, Promise) {
  return knex('states_and_territories').del()
    .then(function () {
      return Promise.all([
        knex('states_and_territories').insert({
          name: 'Alabama',
          abbreviation: 'AL',
        }),
        knex('states_and_territories').insert({
          name: 'Alaska',
          abbreviation: 'AK',
        }),
        knex('states_and_territories').insert({
          name: 'American Samoa',
          abbreviation: 'AS',
        }),
        knex('states_and_territories').insert({
          name: 'Arizona',
          abbreviation: 'AZ',
        }),
        knex('states_and_territories').insert({
          name: 'Arkansas',
          abbreviation: 'AR',
        }),
        knex('states_and_territories').insert({
          name: 'California',
          abbreviation: 'CA',
        }),
        knex('states_and_territories').insert({
          name: 'Colorado',
          abbreviation: 'CO',
        }),
        knex('states_and_territories').insert({
          name: 'Connecticut',
          abbreviation: 'CT',
        }),
        knex('states_and_territories').insert({
          name: 'Delaware',
          abbreviation: 'DE',
        }),
        knex('states_and_territories').insert({
          name: 'Dist. of Columbia',
          abbreviation: 'DC',
        }),
        knex('states_and_territories').insert({
          name: 'Florida',
          abbreviation: 'Fl',
        }),
        knex('states_and_territories').insert({
          name: 'Georgia',
          abbreviation: 'GA',
        }),
        knex('states_and_territories').insert({
          name: 'Guam',
          abbreviation: 'GU',
        }),
        knex('states_and_territories').insert({
          name: 'Hawaii',
          abbreviation: 'HI',
        }),
        knex('states_and_territories').insert({
          name: 'Idaho',
          abbreviation: 'ID',
        }),
        knex('states_and_territories').insert({
          name: 'Illinois',
          abbreviation: 'IL',
        }),
        knex('states_and_territories').insert({
          name: 'Indiana',
          abbreviation: 'IN',
        }),
        knex('states_and_territories').insert({
          name: 'Iowa',
          abbreviation: 'IA',
        }),
        knex('states_and_territories').insert({
          name: 'Kansas',
          abbreviation: 'KS',
        }),
        knex('states_and_territories').insert({
          name: 'Kentucky',
          abbreviation: 'KY',
        }),
        knex('states_and_territories').insert({
          name: 'LOUISIANA',
          abbreviation: 'LA',
        }),
        knex('states_and_territories').insert({
          name: 'Maine',
          abbreviation: 'ME',
        }),
        knex('states_and_territories').insert({
          name: 'Maryland',
          abbreviation: 'MD',
        }),
        knex('states_and_territories').insert({
          name: 'Marshall Islands',
          abbreviation: 'MH',
        }),
        knex('states_and_territories').insert({
          name: 'Massachusetts',
          abbreviation: 'MA',
        }),
        knex('states_and_territories').insert({
          name: 'Michigan',
          abbreviation: 'MI',
        }),
        knex('states_and_territories').insert({
          name: 'Micronesia',
          abbreviation: 'FM',
        }),
        knex('states_and_territories').insert({
          name: 'Minnesota',
          abbreviation: 'MN',
        }),
        knex('states_and_territories').insert({
          name: 'Mississippi',
          abbreviation: 'MS',
        }),
        knex('states_and_territories').insert({
          name: 'Missouri',
          abbreviation: 'MO',
        }),
        knex('states_and_territories').insert({
          name: 'Montana',
          abbreviation: 'MT',
        }),
        knex('states_and_territories').insert({
          name: 'Nebraska',
          abbreviation: 'NE',
        }),
        knex('states_and_territories').insert({
          name: 'Nevada',
          abbreviation: 'NV',
        }),
        knex('states_and_territories').insert({
          name: 'New Hampshire',
          abbreviation: 'NH',
        }),
        knex('states_and_territories').insert({
          name: 'New Jersey',
          abbreviation: 'NJ',
        }),
        knex('states_and_territories').insert({
          name: 'New Mexico',
          abbreviation: 'NM',
        }),
        knex('states_and_territories').insert({
          name: 'New York',
          abbreviation: 'NY',
        }),
        knex('states_and_territories').insert({
          name: 'North Carolina',
          abbreviation: 'NC',
        }),
        knex('states_and_territories').insert({
          name: 'North Dakota',
          abbreviation: 'ND',
        }),
        knex('states_and_territories').insert({
          name: 'Northern Marianas',
          abbreviation: 'MP',
        }),
        knex('states_and_territories').insert({
          name: 'Ohio',
          abbreviation: 'OH',
        }),
        knex('states_and_territories').insert({
          name: 'Oklahoma',
          abbreviation: 'OK',
        }),
        knex('states_and_territories').insert({
          name: 'Oregon',
          abbreviation: 'OR',
        }),
        knex('states_and_territories').insert({
          name: 'Palau',
          abbreviation: 'PW',
        }),
        knex('states_and_territories').insert({
          name: 'Pennsylvania',
          abbreviation: 'PA',
        }),
        knex('states_and_territories').insert({
          name: 'Puerto Rico',
          abbreviation: 'PR',
        }),
        knex('states_and_territories').insert({
          name: 'Rhode Island',
          abbreviation: 'RI',
        }),
        knex('states_and_territories').insert({
          name: 'South Carolina',
          abbreviation: 'SC',
        }),
        knex('states_and_territories').insert({
          name: 'South Dakota',
          abbreviation: 'SD',
        }),
        knex('states_and_territories').insert({
          name: 'Tennessee',
          abbreviation: 'TN',
        }),
        knex('states_and_territories').insert({
          name: 'Texas',
          abbreviation: 'TX',
        }),
        knex('states_and_territories').insert({
          name: 'Utah',
          abbreviation: 'UT',
        }),
        knex('states_and_territories').insert({
          name: 'Vermont',
          abbreviation: 'VT',
        }),
        knex('states_and_territories').insert({
          name: 'Virgin Islands',
          abbreviation: 'VI',
        }),
        knex('states_and_territories').insert({
          name: 'Virginia',
          abbreviation: 'VA',
        }),
        knex('states_and_territories').insert({
          name: 'Washington',
          abbreviation: 'WA',
        }),
        knex('states_and_territories').insert({
          name: 'West Virginia',
          abbreviation: 'WV',
        }),
        knex('states_and_territories').insert({
          name: 'Wisconsin',
          abbreviation: 'WI',
        }),
        knex('states_and_territories').insert({
          name: 'Wyoming',
          abbreviation: 'WY',
        }),
      ]);
   });
};
