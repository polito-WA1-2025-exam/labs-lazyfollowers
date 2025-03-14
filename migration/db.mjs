import sqlite3 from 'sqlite3';
const dbPath = join(__dirname, 'mydatabase.db');

class DatabaseConnection {
    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error("Error opening database:", err.message);
        } else {
            console.log("SQLite database created successfully.");
        }
    });
}