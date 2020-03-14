"use strict";

const { rule } = use("Validator");

class LocationValidatorCheck {
  get rules() {
    return {
      hours: [
        rule("regex", new RegExp("^([0-1][0-9]|[2][0-3]):([0-5][0-9])$"))
      ],
      mts: "integer",
      x: "integer",
      y: "integer"
    };
  }

  get messages() {
    return {
      "hours.regex": "Enter the closing time in the following format: HH:mm.",
      "mts.integer": "Meters must be an integer value",
      "x.integer": "X coordinate must be an integer value.",
      "y.integer": "Y coordinate must be an integer value."
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }
}

module.exports = LocationValidatorCheck;
