"use strict";

const LocationAppService = use("App/Application/LocationAppService");

class LocationController {
  constructor() {
    this.locationAppService = new LocationAppService();
  }

  async store({ request, response }) {
    return await this.locationAppService.create(request, response);
  }

  async update({ params, request, response }) {
    return await this.locationAppService.update(params, request, response);
  }
}

module.exports = LocationController;
