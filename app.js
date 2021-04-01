//jshint esversion:6
const express = require("express");
const https = require("https");
const app = express();
app.set('view engine', 'ejs');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
  query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=a862a3117786849076469fa25c3b181d"

  https.get(url, function(responce){

  responce.on("data", function(data){
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp;
    const weather = weatherData.weather[0].description;
    const city = weatherData.name;
    const icon = weatherData.weather[0].icon;
    const imageUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
    let climate = " ";
    if (temp >= 30){
      climate  = "/images/sunny1.jpg";
    }
    else if (temp < 30) {
      climate = "/images/cloudy.jpg";
    }
    res.render("list", {city: city, temp: temp, weather: weather, imageUrl: imageUrl, climate: climate});
    res.send();
    });
  });
})
app.listen(3000, function(){
  console.log("Server running on port 3000");
})
