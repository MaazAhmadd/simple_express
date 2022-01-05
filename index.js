const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");

app.use("/game", express.static("game", { index: false }));

// (req, res, next) => {
//   const user_id = req.query.user_id;
//   console.log(!user_id);
//   if (!user_id) {
//     res.redirect("https://t.me/SaylorBNB_Bot");
//   }
//   next();
// },
app.get("/savegame", (req, res) => {
  const score = req.query.score;
  const user_id = req.query.user_id;
  const message_id = req.query.message_id;
  const chat_id = req.query.chat.id;

  if (!user_id) {
    res.redirect("https://t.me/SaylorBNB_Bot");
  }
  if (score) {
    axios
      .get(
        `https://api.telegram.org/bot${process.env.BOT}/setGameHighScore?score=${score}&user_id=${user_id}&message_id${message_id}&chat_id=${chat_id}`
      )
      .then((r) => {
        res.send(r.data);
      });
  }
  res.send("not send to telegram yet");
});
const port = process.env.PORT || 3000;
app.listen(port, console.log("listening on " + port));
