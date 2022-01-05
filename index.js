const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
// app.use((req, res, next) => {
//   const user_id = req.query.user_id;
//   if (!user_id) {
//     res.redirect("https://t.me/SaylorBNB_Bot");
//   }
//   // next();
// });
app.use("/game", express.static("game"));

// (req, res, next) => {
//   const user_id = req.query.user_id;
//   console.log(!user_id);
//   if (user_id) {
//     next();
//   }
//   res.redirect("https://t.me/SaylorBNB_Bot");
// },
app.get("/savegame", (req, res) => {
  const score = req.query.score;
  const user_id = req.query.user_id;
  console.log("score : ", score, " user : ", user_id);
  if (!user_id) {
    res.redirect("https://t.me/SaylorBNB_Bot");
  }
  if (score) {
    axios
      .post(`https://api.telegram.org/bot${process.env.BOT}/setGameHighScore`, {
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
