const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({optionsSuccessStatus: 200}));
app.enable('trust proxy'); 

app.get('/api/whoami', (req, res) => {
    res.send({
        ipaddress: req.ip,
        language: req.headers["accept-language"],
        software: req.headers["user-agent"]
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening!!");
});