"use strict";

class ParentRepository {
  async create(model, data) {
    return await model.create(data);
  }

  async update(model) {
    return await model.save();
  }

  async delete(model) {
    return await model.delete();
  }

  async getAll(model) {
    const result = await model.all();
    return result.toJSON();
  }

  async getById(model, id) {
    return await model
      .query()
      .where("id", id)
      .first();
  }
}

module.exports = ParentRepository;
