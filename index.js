const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
app.use("/game", express.static("game"));

app.get("/savegame", (req, res) => {
  const score = req.query.score;
  const user_id = req.query.user_id;
  console.log("score : ", score, " user : ", user_id);
  if (score) {
    axios
      .post(`https://api.telegram.org/${process.env.BOT}/setGameHighScore`, {
        user_id,
        score,
      })
      .then((r) => {
        res.send(r.data);
      });
  }
});
const port = process.env.PORT || 3000;
app.listen(port, console.log("listening on " + port));
