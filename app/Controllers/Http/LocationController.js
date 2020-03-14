"use strict";

const LocationAppService = use("App/Application/LocationAppService");

class LocationController {
  constructor() {
    this.locationAppService = new LocationAppService();
  }

  async index({ response }) {
    return await this.locationAppService.getAll(response);
  }

  async store({ request, response }) {
    return await this.locationAppService.create(request, response);
  }

  async show({ params, response }) {
    return await this.locationAppService.getById(params, response);
  }

  async update({ params, request, response }) {
    return await this.locationAppService.update(params, request, response);
  }

  async destroy({ params, response }) {
    return await this.locationAppService.delete(params, response);
  }

  async check({ request, response }) {
    return await this.locationAppService.check(request, response);
  }
}

module.exports = LocationController;
