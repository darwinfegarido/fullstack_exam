const { DATABASE_URL } = require("./config.js");
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const query = async (qry) => {
  const client = await pool.connect()
  const result = await client.query(qry);
  client.release();
  return result
}

const getData = async () => {
  return await query("SELECT * FROM counter ORDER BY id ASC");
}

const addData = async () => {
  const query_item = `INSERT INTO counter (amount, name) VALUES (0, '');`
  return await query(query_item);
}

const deleteData = async (item) => {
  const query_item = `DELETE FROM counter WHERE id = ${item.id};`
  return await query(query_item);
}

const updateData = async (item) => {
  const query_item = `UPDATE counter SET amount=${item.amount}, name='${item.name}'  WHERE id = ${item.id};`
  return await query(query_item);
}

module.exports = {
  getData,
  addData,
  deleteData,
  updateData,
  query
}
