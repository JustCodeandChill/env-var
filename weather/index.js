const express = require("express");
const router = express.Router();
const axios = require("axios");

const fetchWeather = async (searchtext) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchtext}&units=imperial&appid=${process.env.WEATHER_API_KEY}`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    return { Error: err.stack };
  }
};

router.get("/", (req, res) => {
  console.log(process.env.NODE_ENV);
  if (
    JSON.stringify(process.env.NODE_ENV.trim()) ===
    JSON.stringify("development")
  ) {
    res.json({ success: "Hello Weather!" });
  }

  if (
    JSON.stringify(process.env.NODE_ENV.trim()) === 
    JSON.stringify("production")
  ) {
    res.json({ success: "Welcome to the Weather API" });
  }
});

router.get("/:searchtext", async (req, res) => {
  const searchtext = req.params.searchtext;
  console.log(searchtext);
  const data = await fetchWeather(searchtext);
  res.json(data);
});

router.post("/", async (req, res) => {
  const searchtext = req.body.searchtext;
  const data = await fetchWeather(searchtext);
  res.json(data);
});

module.exports = router;
