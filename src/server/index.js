const express = require('express');
const path = require("path");

const ENV = process.env.NODE_ENV || 'dev';

if (ENV === 'production') {
    // code for new relic
}

var app = express();

var proxyResolver = require("./proxy/resolver");

const PORT = process.env.PORT || 5000;

// Health Check
app.get("/health-check", (req, res) => res.send("Health check verified"))

// Proxy setup to select proper host
app.use('/proxy', proxyResolver);

// Static files
app.use(express.static(path.join(__dirname, "..", "..", "build")));

// Client app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
});

var server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Queen Application Server is listening at http://%s:%s', host, port);
});