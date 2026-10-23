// index.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Olá, meu primeiro servidor!");
});

app.get("/horarios", (req, res) => {
  res.json([
    { dia: "Segunda", horario: "18h" },
    { dia: "Quarta",  horario: "19h" }
  ]);
});


app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
