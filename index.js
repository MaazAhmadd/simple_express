const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const fs = require("fs");

// mine
// let app_id = "f4f41995";
// let app_key = "3bb69aa9446bb584aac1c0d2f593c779";
// let language = "en-gb";

// adam
let app_id = "b2ec966e";
let app_key = "b67d0c0def9db7bdb0f29a056424e510";
let language = "en-gb";

b_url = `https://od-api.oxforddictionaries.com:443/api/v2/entries/${language}`;

let words = `Kind
Take
the
be
and`;

words = words.split("\n");

const fetchAll = async (url, res) => {
  const res = await Promise.all(
    words.map(async (w) => {
      let name = w.trim().toLowerCase();
      await axios(`${url}/${name}`, {
        headers: { app_id: app_id, app_key: app_key },
        target: "https://od-api.oxforddictionaries.com/api/v1/entries/en-gb/",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
      })
        .then((r) => {
          let dataForFile = JSON.stringify(r.data);
          fs.appendFile(`./allTheWords/${name}.json`, dataForFile, (err) => {
            if (err) return err;
            console.log("Saved!");
          });
        })
        .catch((err) => {
          return res.send(err);
        });
    })
  );
};
// const fetchAll = async (url) => {
//   let name = w.trim().toLowerCase();
//   await axios(`${url}/${name}`, {
//     headers: { app_id: app_id, app_key: app_key },
//   }).then((r) => {
//     let dataForFile = JSON.stringify(r.data);
//     fs.appendFile(`./allTheWords/${name}.json`, dataForFile, (err) => {
//       if (err) throw err;
//       console.log("Saved!");
//     });
//   });
// };
app.get("/oxford", (req, res) => {
  try {
    let rese = fetchAll(b_url, res);
    res.send(rese);
  } catch (error) {
    res.send("error ", error);
  }
});
const port = process.env.PORT || 3000;
app.listen(port, console.log("listening on " + port));
