"use strict";

const Location = use("App/Domain/Location");
const LocationRepository = use("App/Repository/LocationRepository");

class LocationAppService {
  constructor() {
    this.locationRepository = new LocationRepository();
  }

  async create(request, response) {
    try {
      const reqBody = request.all();

      return response
        .status(200)
        .send(await this.locationRepository.create(Location, ...[reqBody]));
    } catch (error) {
      console.log(error);
    }
  }

  async update(params, request, response) {
    try {
      const { id } = params;
      const reqBody = request.all();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = LocationAppService;
