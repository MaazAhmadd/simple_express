const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const cors = require("cors");

app.use(cors());

app.use(express.static("game"));

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
  const chat_id = req.query.chat_id;

  console.log(score, user_id, message_id, chat_id);

  if (!user_id) {
    res.redirect("https://t.me/SaylorBNB_Bot");
  }
  try {
    axios
      .get(
        `https://api.telegram.org/bot5068674308:AAFhEU1NXAA1LeAThXwnrkIBej_urX6SclU/setGameHighScore?score=${score}&user_id=${user_id}&message_id${message_id}&chat_id=${chat_id}`
      )
      .then((r) => {
        console.log(r.data);
        res.send(r.data);
      });
    res.send("send to telegram");
  } catch (error) {
    console.log("error : ", error);
    res.send("not send to telegram yet");
  }
});
const port = process.env.PORT || 3000;
app.listen(port, console.log("listening on " + port));
