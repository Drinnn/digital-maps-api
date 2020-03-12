"use strict";

const LocationAppService = use("App/Application/LocationAppService");

class LocationController {
  constructor() {
    this.locationAppService = new LocationAppService();
  }
}

module.exports = LocationController;
