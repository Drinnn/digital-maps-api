"use strict";

const { test, trait } = use("Test/Suite")("Delete Location");
const Factory = use("Factory");

trait("Test/ApiClient");

test("can delete a location if existent", async ({ assert, client }) => {
  const location = await Factory.model("App/Domain/Location").create();

  const response = await client.delete(`locations/${location.id}`).end();

  response.assertStatus(200);
  response.assertJSONSubset({
    success: "Location deleted successfully."
  });
});

test("cannot delete a location if unexistent", async ({ assert, client }) => {
  const response = await client.delete(`locations/1234`).end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: "There's no Location with the given ID."
  });
});
