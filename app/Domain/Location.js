"use strict";

const uuid = require("uuid/v4");

const Model = use("Model");

class Location extends Model {
  static get table() {
    return "locations";
  }
  static get incrementing() {
    return false;
  }

  static boot() {
    super.boot();

    this.addHook("beforeCreate", async location => {
      location.id = uuid();
    });
  }
}

module.exports = Location;
