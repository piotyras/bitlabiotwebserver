/*
    SQLite3 database configuration file
 */

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const database_name = "RPI.db";
const database_exists = fs.existsSync(database_name);

// Access database or create it if non-existent
const db = new sqlite3.Database(database_name);

// Create tables if database newly created
db.serialize(function() {
    if(!database_exists) {
        // Create Devices table
        db.run('CREATE TABLE Devices (id INTEGER PRIMARY KEY, name TEXT)');
        // Create Measurements table
        db.run('CREATE TABLE Measurements (measurement_id INTEGER PRIMARY KEY, device INTEGER, noise REAL, date TEXT, FOREIGN KEY(device) REFERENCES Devices(id))');

        // Insert devices in array
/*        let devices = ['alpha', 'beta', 'charlie', 'delta'];
        for (let i = 0; i < devices.length; i++) {
            db.run('INSERT INTO Devices(name) VALUES (?)', devices[i]);
        }

        for (let j = 0; j < devices.length; j++) {
            for (let k = 0; k < 100; k++) {
                // Generate random single-decimal number between 0 and 99.9
                let device = j + 1;
                let noise = Math.round(((Math.random() * 100) + 1) * 10 ) / 10;
                let date = new Date().getTime();

                db.run('INSERT INTO Measurements(device, noise, date) VALUES (?, ?, ?)', [device, noise, date]);
            }
        }*/
    }
});

// Expose database to the main app.js file
module.exports = db;