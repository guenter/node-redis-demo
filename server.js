var express = require('express'),
    morgan = require('morgan'),
    redis = require("redis"),
    app = express(),
    client = redis.createClient(6379, process.env.REDIS_HOST);

client.on("error", function (err) {
    console.log("Error " + err);
});

app.use(morgan('combined'));

app.get('/', function(req, res) {
    client.get('value', function (error, value) {
      if (error)
        res.send('ERROR: ' + error);
      else
        res.send('Value: ' + value);
    });
});

app.get('/set', function(req, res) {
    var value = req.query.value;
    client.set('value', value, function(error, value) {
      if (error)
        res.send('ERROR: ' + error);
      else
        res.send(value);
    });
});

app.listen(8080);
