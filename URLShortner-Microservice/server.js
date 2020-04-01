const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const dns = require('dns');

const app = express();
var db = new sqlite3.Database('urlRecord.db');

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.urlencoded());

app.post('/api/shorturl/:query', (req, res) => {
    if(req.params.query == "new"){
        var newURL = req.body.url;
        const orignalURL = newURL;
        if(newURL.startsWith('https://')) newURL = newURL.slice(8);
        else if(newURL.startsWith('http://')) newURL = newURL.slice(7);
        if(newURL.endsWith('/')) newURL = newURL.slice(0, newURL.length-1);
        dns.lookup(newURL, (err, address, family) => {
            if(err){
                res.send({error: "invalid URL"});
            } else {
                db.serialize(() => {
                    db.run("INSERT INTO map(value) VALUES(?)", [newURL], function(err) {
                        res.send({
                            orignal_url: orignalURL,
                            short_url: this.lastID
                        });
                    });
                });
            }
        });
    }
     else {
        res.send({error: "invalid URL"});
    }
});

app.get('/api/shorturl/:query', (req, res) => {
    const q = parseInt(req.params.query);
    if(isNaN(q)){
        res.send({error: "invalid URL"});
    } else {
        db.all("SELECT value FROM map WHERE key = (?)", [q], (err, rows) => {
            var redURL = null;
            rows.forEach((row) => {
                redURL = row.value;                   
            });
            if(redURL == null){
                res.send({error: "No short url found for given input"});
            }
            else res.redirect('https://'+redURL);
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/views/index.html");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening..");
});