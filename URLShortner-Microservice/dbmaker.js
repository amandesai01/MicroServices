const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('urlRecord.db');

db.serialize(function () {
    db.run("CREATE TABLE 'map' ( 'key'	INTEGER PRIMARY KEY AUTOINCREMENT,'value' TEXT);");
});