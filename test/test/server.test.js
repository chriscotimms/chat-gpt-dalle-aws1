const test = require("node:test");
const assert = require("node:assert");

// test("the test works", () => {
//   assert.equal(1, 1);
// });

// test("/submit route responds to POST requests", async () => {
//   const app = app.listen(5050);
//   const response = await fetch("http://localhost:5050/submit", {
//     method: "POST",
//   });
//   app.close();

//   assert.equal(response.status, 200);
//   const body = await response.text();
//   assert.match(body, /thanks for submitting/);
// });