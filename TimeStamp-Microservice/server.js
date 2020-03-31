const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({optionSuccessStatus: 200})); //This is Done, to make it Cross Site Accessible.

app.get('/api/timestamp', (req, res) => {
    const dateobj = new Date(Date.now());
    res.send({
        unix : dateobj.getTime(),
        utc : dateobj.toUTCString()
    });
});

app.get('/api/timestamp/:date_string', (req, res) => {
    var parsedDate = null;
    const unixstamp = parseInt(req.params.date_string * 1);
    if(isNaN(unixstamp)){
        parsedDate = new Date(req.params.date_string);
    } else {
        parsedDate = new Date(unixstamp);
    }
    var responseObj = parsedDate.toUTCString() == "Invalid Date" ?
                        { error : "Invalid Date"} :
                        { unix : parsedDate.getTime(),
                          utc : parsedDate.toUTCString() };
    res.send(responseObj);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.use(function(req, res, next) {
    res.status(404)
      .type('text')
      .send('Not Found');
});

app.listen(5000, () => {
    console.log("Listening on port " + 5000);
})