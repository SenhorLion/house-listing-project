import express from "express";

const app = express();
const PORT = 9000; // TODO: set by .env config

app.get("/", (_req, res) => {
  return res.send("Yo yo yo, express!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
