const express = require("express");
const mysql = require("mysql2/promise");

const router = express.Router();

const { port, dbconfig } = require("../config");

//1.a

router.post("/api/fill", async (req, res) => {
  try {
    const users = await fetch("https://jsonplaceholder.typicode.com/users");
    const usersResponse = await users.json();
    const id = usersResponse[0].id;
    const firstName = usersResponse[0].name;
    const email = usersResponse[0].email;
    const address = `${usersResponse[0].address.street} ${usersResponse[0].address.city}`;

    const con = await mysql.createConnection(dbconfig);
    await con.execute(
      `INSERT INTO users (name, email, address) values (${mysql.escape(
        firstName
      )}, ${mysql.escape(email)}, ${mysql.escape(address)})`
    );
    await con.end();
    res.send(response);
  } catch (error) {
    console.error(error);
  }
});

//2.a

router.post("/users", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(
      `INSERT INTO users (user, email, address) values("${"Leanne Graham"}", "${"Sincere@april.biz"}", "${"Kulas Light, Gwenborough"}");`
    );
    await con.end();
    res.send(response);
  } catch (e) {
    console.error(e);
  }
});

//2.b     localhost:3000/api/users
router.get("/users", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(
      "SELECT id, user, email, address FROM users"
    );
    await con.end();
    res.send(response);
  } catch (e) {
    console.error(e);
  }
});

//2.c

router.get("/names", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute("SELECT user FROM users");
    await con.end();
    res.send(response);
  } catch (e) {
    console.error(e);
  }
});

//2.d

router.get("/emails", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute("SELECT id, user, email FROM users");
    await con.end();
    res.send(response);
  } catch (e) {
    console.error(e);
  }
});

//2.e

router.get("/address", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute("SELECT id, user, address FROM users");
    await con.end();
    res.send(response);
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
