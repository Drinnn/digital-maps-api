"use strict";

const { test, trait } = use("Test/Suite")("Get Location");
const Factory = use("Factory");

trait("Test/ApiClient");

test("can get all existent locations", async ({ assert, client }) => {
  const locations = await Factory.model("App/Domain/Location").createMany(3);

  const response = await client.get(`locations/`).end();

  response.assertStatus(200);
  response.assertJSONSubset([
    {
      name: locations[0].name,
      opening_time: locations[0].opening_time,
      closing_time: locations[0].closing_time,
      coord_x: locations[0].coord_x,
      coord_y: locations[0].coord_y
    },
    {
      name: locations[1].name,
      opening_time: locations[1].opening_time,
      closing_time: locations[1].closing_time,
      coord_x: locations[1].coord_x,
      coord_y: locations[1].coord_y
    },
    {
      name: locations[2].name,
      opening_time: locations[2].opening_time,
      closing_time: locations[2].closing_time,
      coord_x: locations[2].coord_x,
      coord_y: locations[2].coord_y
    }
  ]);

  locations[0].delete();
  locations[1].delete();
  locations[2].delete();
});

test("can get a location if existent", async ({ assert, client }) => {
  const location = await Factory.model("App/Domain/Location").create();

  const response = await client.get(`locations/${location.id}`).end();

  response.assertStatus(200);
  response.assertJSONSubset({
    name: location.name,
    opening_time: location.opening_time,
    closing_time: location.closing_time,
    coord_x: location.coord_x,
    coord_y: location.coord_y
  });

  location.delete();
});

test("cannot get a location if unexistent", async ({ assert, client }) => {
  const response = await client.get(`locations/12345`).end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: "There's no Location with the given ID."
  });
});
