"use strict";

const Location = use("App/Domain/Location");
const LocationRepository = use("App/Repository/LocationRepository");

class LocationAppService {
  constructor() {
    this.locationRepository = new LocationRepository();
  }

  async getAll(response) {
    try {
      return response
        .status(200)
        .send(await this.locationRepository.getAll(Location));
    } catch (error) {
      return response.status(500).send(JSON.parse(`{ "error": "${error}"}`));
    }
  }

  async create(request, response) {
    try {
      const reqBody = request.all();

      return response
        .status(200)
        .send(await this.locationRepository.create(Location, ...[reqBody]));
    } catch (error) {
      return response.status(500).send(JSON.parse(`{ "error": "${error}"}`));
    }
  }

  async update(params, request, response) {
    try {
      const { id } = params;
      const reqBody = request.all();

      const location = await this.locationRepository.getById(Location, id);
      if (location) {
        location.name = reqBody.name;
        location.opening_time = reqBody.opening_time;
        location.closing_time = reqBody.closing_time;
        location.coord_x = reqBody.coord_x;
        location.coord_y = reqBody.coord_y;
        await this.locationRepository.update(location);
        return response.status(200).send(location);
      } else {
        return response
          .status(400)
          .send(
            JSON.parse(`{ "error": "There's no Location with the given ID."}`)
          );
      }
    } catch (error) {
      return response.status(500).send(JSON.parse(`{ "error": "${error}"}`));
    }
  }

  async delete(params, response) {
    try {
      const { id } = params;
      const location = await this.locationRepository.getById(Location, id);
      if (location) {
        await this.locationRepository.delete(location);
        return response
          .status(200)
          .send(JSON.parse(`{ "success": "Location deleted successfully."}`));
      } else {
        return response
          .status(400)
          .send(
            JSON.parse(`{ "error": "There's no Location with the given ID."}`)
          );
      }
    } catch (error) {
      return response.status(500).send(JSON.parse(`{ "error": "${error}"}`));
    }
  }
}

module.exports = LocationAppService;
