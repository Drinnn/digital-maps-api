"use strict";

const { test, trait } = use("Test/Suite")("Check Location");
const Factory = use("Factory");

trait("Test/ApiClient");

test("can check locations if valid data", async ({ assert, client }) => {
  const location1 = await Factory.model("App/Domain/Location").create({
    name: "Restaurante",
    opening_time: "12:00",
    closing_time: "18:00",
    coord_x: 27,
    coord_y: 12
  });
  const location2 = await Factory.model("App/Domain/Location").create({
    name: "Posto de combustível",
    opening_time: "08:00",
    closing_time: "18:00",
    coord_x: 31,
    coord_y: 18
  });
  const location3 = await Factory.model("App/Domain/Location").create({
    name: "Praça",
    coord_x: 15,
    coord_y: 12
  });

  const data = {
    mts: 10,
    x: 20,
    y: 10,
    hours: "19:00"
  };

  const response = await client
    .post(`locations/check`)
    .send(data)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset([
    {
      name: "Restaurante",
      situation: "Closed"
    },
    {
      name: "Praça",
      situation: "Closed"
    }
  ]);

  location1.delete();
  location2.delete();
  location3.delete();
});

test("cannot check locations if wrong hours format", async ({
  assert,
  client
}) => {
  const data = {
    mts: 10,
    x: 20,
    y: 10,
    hours: "7 pm"
  };

  const response = await client
    .post(`locations/check`)
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: "Enter hours in the following format: HH:mm.",
      field: "hours",
      validation: "regex"
    }
  ]);
});

test("cannot check locations if mts is not integer", async ({
  assert,
  client
}) => {
  const data = {
    mts: "aaaa",
    x: 20,
    y: 10,
    hours: "19:00"
  };

  const response = await client
    .post(`locations/check`)
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: "Meters must be an integer value",
      field: "mts",
      validation: "integer"
    }
  ]);
});

test("cannot check locations if x is not integer", async ({
  assert,
  client
}) => {
  const data = {
    mts: 10,
    x: "aaa",
    y: 10,
    hours: "19:00"
  };

  const response = await client
    .post(`locations/check`)
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: "X coordinate must be an integer value.",
      field: "x",
      validation: "integer"
    }
  ]);
});

test("cannot check locations if y is not integer", async ({
  assert,
  client
}) => {
  const data = {
    mts: 10,
    x: 20,
    y: "aaa",
    hours: "19:00"
  };

  const response = await client
    .post(`locations/check`)
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: "Y coordinate must be an integer value.",
      field: "y",
      validation: "integer"
    }
  ]);
});

test("cannot check locations if hours is not provided", async ({
  assert,
  client
}) => {
  const data = {
    mts: 10,
    x: 20,
    y: 10
  };

  const response = await client
    .post(`locations/check`)
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: "Parameter hours is required.",
      field: "hours",
      validation: "required"
    }
  ]);
});

test("cannot check locations if mts is not provided", async ({
  assert,
  client
}) => {
  const data = {
    x: 20,
    y: 10,
    hours: "19:00"
  };

  const response = await client
    .post(`locations/check`)
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: "Parameter mts is required.",
      field: "mts",
      validation: "required"
    }
  ]);
});

test("cannot check locations if x is not provided", async ({
  assert,
  client
}) => {
  const data = {
    mts: 10,
    y: 10,
    hours: "19:00"
  };

  const response = await client
    .post(`locations/check`)
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: "Parameter x is required.",
      field: "x",
      validation: "required"
    }
  ]);
});

test("cannot check locations if y is not provided", async ({
  assert,
  client
}) => {
  const data = {
    mts: 10,
    x: 20,
    hours: "19:00"
  };

  const response = await client
    .post(`locations/check`)
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: "Parameter y is required.",
      field: "y",
      validation: "required"
    }
  ]);
});
