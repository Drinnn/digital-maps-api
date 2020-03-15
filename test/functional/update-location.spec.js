"use strict";

const { test, trait } = use("Test/Suite")("Update Location");
const Factory = use("Factory");

trait("Test/ApiClient");

test("can edit a location if existent and valid data", async ({
  assert,
  client
}) => {
  const location = await Factory.model("App/Domain/Location").create();

  const data = {
    name: "Cinema",
    opening_time: "10:00",
    closing_time: "02:00",
    coord_x: 5,
    coord_y: 15
  };

  const response = await client
    .put(`locations/${location.id}`)
    .send(data)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    name: data.name,
    opening_time: data.opening_time,
    closing_time: data.closing_time,
    coord_x: data.coord_x,
    coord_y: data.coord_y
  });

  location.delete();
});

test("cannot edit a location if unexistent", async ({ assert, client }) => {
  const data = {
    name: "Cinema",
    opening_time: "10:00",
    closing_time: "02:00",
    coord_x: 5,
    coord_y: 15
  };

  const response = await client
    .put(`locations/12345`)
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: "There's no Location with the given ID."
  });
});

test("cannot edit a location if name is not string", async ({
  assert,
  client
}) => {
  const location = await Factory.model("App/Domain/Location").create();

  const data = {
    name: 1234,
    opening_time: "2 pm",
    closing_time: "18:00",
    coord_x: 27,
    coord_y: 12
  };

  const response = await client
    .put(`locations/${location.id}`)
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: "Location name must be a string value.",
      field: "name",
      validation: "string"
    }
  ]);

  location.delete();
});

test("cannot edit a location if wrong opening time format", async ({
  assert,
  client
}) => {
  const location = await Factory.model("App/Domain/Location").create();

  const data = {
    name: "Cinema",
    opening_time: "2 pm",
    closing_time: "18:00",
    coord_x: 27,
    coord_y: 12
  };

  const response = await client
    .put(`locations/${location.id}`)
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: "Enter the opening time in the following format: HH:mm.",
      field: "opening_time",
      validation: "regex"
    }
  ]);

  location.delete();
});

test("cannot edit a location if wrong closing time format", async ({
  assert,
  client
}) => {
  const location = await Factory.model("App/Domain/Location").create();

  const data = {
    name: "Cinema",
    opening_time: "12:00",
    closing_time: "8 pm",
    coord_x: 27,
    coord_y: 12
  };

  const response = await client
    .put(`locations/${location.id}`)
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: "Enter the closing time in the following format: HH:mm.",
      field: "closing_time",
      validation: "regex"
    }
  ]);

  location.delete();
});

test("cannot edit a location if x coord is not integer", async ({
  assert,
  client
}) => {
  const location = await Factory.model("App/Domain/Location").create();

  const data = {
    name: "Cinema",
    opening_time: "12:00",
    closing_time: "18:00",
    coord_x: "aaaa",
    coord_y: 12
  };

  const response = await client
    .put(`locations/${location.id}`)
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: "X coordinate must be an integer value.",
      field: "coord_x",
      validation: "integer"
    }
  ]);

  location.delete();
});

test("cannot edit a location if y coord is not integer", async ({
  assert,
  client
}) => {
  const location = await Factory.model("App/Domain/Location").create();

  const data = {
    name: "Cinema",
    opening_time: "12:00",
    closing_time: "18:00",
    coord_x: 27,
    coord_y: "aaa"
  };

  const response = await client
    .put(`locations/${location.id}`)
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: "Y coordinate must be an integer value.",
      field: "coord_y",
      validation: "integer"
    }
  ]);

  location.delete();
});
