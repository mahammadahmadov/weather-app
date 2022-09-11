const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.listen(3000, ()=>{
  console.log("Server started on 3000");
});

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res)=>{

  res.sendFile(__dirname + "/index.html");

});

app.post("/", (req, res)=>{

  const city = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=9de3f10290b54da1a0f91f315ffbd405";

  https.get(url, (response)=>{
    console.log(response.statusCode);

    response.on("data", (data)=>{
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The weather is currently " + weatherDesc + "</p>");
      res.write("<h1>The temperature in " + city.toUpperCase() + " is " + temp + " degrees Celsius</h1>");
      res.write("<img src=" + imgURL + " />");
      res.send();
    });
  });
});
