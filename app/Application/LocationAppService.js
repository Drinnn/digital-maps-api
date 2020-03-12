"use strict";

const Location = use("App/Domain/Location");
const LocationRepository = use("App/Repository/LocationRepository");

class LocationAppService {
  constructor() {
    this.locationRepository = new LocationRepository();
  }
}

module.exports = LocationAppService;
