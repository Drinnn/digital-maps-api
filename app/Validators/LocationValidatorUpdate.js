"use strict";

const { rule } = use("Validator");

class LocationValidatorUpdate {
  get rules() {
    return {
      name: "string",
      opening_time: [
        rule("regex", new RegExp("^([0-1][0-9]|[2][0-3]):([0-5][0-9])$"))
      ],
      closing_time: [
        rule("regex", new RegExp("^([0-1][0-9]|[2][0-3]):([0-5][0-9])$"))
      ],
      coord_x: "integer",
      coord_y: "integer"
    };
  }

  get messages() {
    return {
      "name.string": "Location name must be a string value.",
      "opening_time.regex":
        "Enter the opening time in the following format: HH:mm.",
      "closing_time.regex":
        "Enter the closing time in the following format: HH:mm.",
      "coord_x.integer": "X coordinate must be an integer value.",
      "coord_y.integer": "Y coordinate must be an integer value."
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }
}

module.exports = LocationValidatorUpdate;
