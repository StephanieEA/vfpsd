
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('fatal_police_shootings_data', function(table) {
            table.increments('id').primary();
            table.string('name')
            table.string('date'),
            table.string('manner_of_death'),
            table.string('armed')
            table.integer('age'),
            table.string('gender'),
            table.string('race'),
            table.string('city'),
            table.string('state'),
            table.string('signs_of_mental_illness'),
            table.string('threat_level'),
            table.string('flee'),
            table.string('body_camera')
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('fatal_police_shootings_data')
    ])
};
