"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CreateLocationsSchema extends Schema {
  up() {
    this.create("locations", table => {
      table.uuid("id").notNullable();
      table.string("name").notNullable();
      table.time("opening_time").nullable();
      table.time("closing_time").nullable();
      table.integer("coord_x").nullable();
      table.integer("coord_y").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("locations");
  }
}

module.exports = CreateLocationsSchema;
