"use strict";

const moment = require("moment");

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

  async getById(params, response) {
    try {
      const { id } = params;

      const location = await this.locationRepository.getById(Location, id);
      if (location) {
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

  async create(request, response) {
    try {
      const req = request.all();

      return response
        .status(201)
        .send(await this.locationRepository.create(Location, ...[req]));
    } catch (error) {
      return response.status(500).send(JSON.parse(`{ "error": "${error}"}`));
    }
  }

  async update(params, request, response) {
    try {
      const { id } = params;
      const {
        name,
        opening_time,
        closing_time,
        coord_x,
        coord_y
      } = request.all();

      const location = await this.locationRepository.getById(Location, id);
      if (location) {
        location.name = name;
        location.opening_time = opening_time;
        location.closing_time = closing_time;
        location.coord_x = coord_x;
        location.coord_y = coord_y;
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

  async check(request, response) {
    try {
      const { x, y, mts, hours } = request.all();
      let locations = await this.locationRepository.getAll(Location);
      let result = [];
      if (locations) {
        // Filtro de distância
        locations = locations.filter(location => {
          return (
            x >= location.coord_x - mts &&
            x <= location.coord_x + mts &&
            y >= location.coord_y - mts &&
            y <= location.coord_y + mts
          );
        });
        // Filtro por horário
        locations.map(location => {
          let situation = "Closed";
          if (!location.opening_time && !location.closing_time)
            situation = "Opened";
          else if (
            moment(hours) >= moment(location.opening_time) &&
            moment(hours) <= moment(location.closing_time)
          ) {
            situation = "Opened";
          }
          result.push({ name: location.name, situation: situation });
        });
        return response.status(200).send(result);
      } else {
        return response
          .status(200)
          .send(
            JSON.parse(
              `{ "success": "There are no locations available based on given coordinates and time."}`
            )
          );
      }
    } catch (error) {
      return response.status(500).send(JSON.parse(`{ "error": "${error}"}`));
    }
  }
}

module.exports = LocationAppService;
