"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })

const Factory = use("Factory");

Factory.blueprint("App/Domain/Location", (faker, i, data) => {
  return {
    name: data.name ? data.name : faker.company(),
    opening_time: data.opening_time ? data.opening_time : "18:30",
    closing_time: data.closing_time ? data.closing_time : "01:00",
    coord_x: data.coord_x
      ? data.coord_x
      : faker.integer({ min: -100, max: 100 }),
    coord_y: data.coord_y
      ? data.coord_y
      : faker.integer({ min: -100, max: 100 })
  };
});
