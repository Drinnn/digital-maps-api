"use strict";

const uuid = require("uuid/v4");
const moment = require("moment");

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

  getOpeningTime(opening_time) {
    return moment(opening_time, "HH:mm:ss").format("HH:mm");
  }

  getClosingTime(closing_time) {
    return moment(closing_time, "HH:mm:ss").format("HH:mm");
  }
}

module.exports = Location;
