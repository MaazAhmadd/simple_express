function sendScore(score) {
  let params = new URL(document.location).searchParams;
  let user_id = params.get("user_id");
  // user_id = "3123423";
  console.log("sendscore called ", "user ", user_id, "score ", score);

  fetch(`http://localhost:3000/savegame?user_id=${user_id}&score=${score}`)
    .then((response) => response.json())
    .then((data) => console.log(data));

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
}
