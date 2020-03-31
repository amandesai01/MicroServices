const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({optionSuccessStatus: 200})); //This is Done, to make it Cross Site Accessible.

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.listen(5000, () => {
    console.log("Listening on port" + 5000);
})