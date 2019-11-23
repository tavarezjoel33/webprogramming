const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

const TOKEN = process.env.GIPHY_API_TOKEN || require("./apikey");

const PORT = 3000;

app.use(express.json());

app.use(express.static("./build"));

app.post("/gif_search", (req, res) => {
  const { searchTerm } = req.body;
  axios
    .get(
      `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${TOKEN}&limit=5`
    )
    .then(resp => {
      const results = resp.data.data.map(gif => {
        return {
          gifUrl: gif.images.original.url,
          focusUrl: gif.images.downsized_large.url
        };
      });
      res.json({ results });
    })
    .catch(() => res.json({ msg: "Failed" }));
});

app.listen(PORT, () =>
  console.log(`Server is running and listening on port: ${PORT}`)
);
