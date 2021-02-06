const assert = require('assert');
const controller = require('../controller.js');
const request = require("supertest");
const server = require("../server.js");
const {
  getData,
  query
} = require("../database.js");

describe("Database check", () => {
  it("Should connect to a database", async () => {
      await getData();
  })
});

describe("Checking headers", () => {
  it('Should return status code 200', async () => {
      const res = await request(server).get("/")
      assert(res.status === 200, "Status code should be 200")
  })

  it('Should return status code 404', async () => {
      const res = await request(server).get("/asdf")
      assert(res.status === 404, "Status code should be 404")
  })

  it('Should return content-type json', async () => {
    const res = await request(server).get("/")
    assert(res.header["content-type"] === "Application/json", "Content type should be Application/json")
  })
});


describe("Testing Controllers", async () => {
  let itemId;
  it("Should create a counter", async () => {
    const res = await request(server).post("/create")
    assert(res.status === 201, "Status code should be 201")
    assert(res.body.message === "Counter created!", "Incorrect message")
  })

  it("Should get list of counters", async () => {
    const res = await request(server).get("/")
    const body = res.body
    assert(res.status === 200, "Status code should be 200")
    assert(body.data.length > 0, "expected list of an array")
  });

  it("Should update a counter", async () => {
    const qry = `SELECT * FROM counter ORDER BY id DESC LIMIT 1`
    const result = await query(qry)
    const item = result.rows[0]
    const update_data = { id: item.id, amount: 100, name: "Test Update"}
    const res = await request(server).post("/update").send(update_data)
    const check_updated_data = `SELECT * FROM counter where id=${item.id}`;
    const result_update = await query(check_updated_data);
    const final_check = result_update.rows[0]

    itemId = item.id;
    assert(res.status === 200, "Status code should be 200")
    assert(res.body.message === "Counter updated!", "expected message 'Counter updated!'")
    assert(final_check.name === "Test Update", "Counter item should be the same")

  });

  it("Should delete a counter", async () => {
    const res = await request(server).post("/delete").send({ id: itemId })
    const qry = `SELECT * FROM counter where id=${itemId}`;
    const check_item = await query(qry);

    assert(res.status === 200, "Status code should be 200")
    assert(res.body.message === "Counter deleted!", "expected message 'Counter updated!'")
    assert(check_item.rowCount === 0, "Expected item to be delete")
  });

});
