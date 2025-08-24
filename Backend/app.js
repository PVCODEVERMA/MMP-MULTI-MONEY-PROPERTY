import express from "express";


const app = express();


// test route
app.get("/", (req, res) => {
  res.send("Hello World with import syntax!");
});


export default app;
