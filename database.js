import * as SQLite from 'expo-sqlite';

//database connection
export const db = SQLite.openDatabase('selfcaredb.db');

//creating the daily table
db.transaction(tx => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS daily (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, date TEXT, mood TEXT, sleephours TEXT, sleepquality TEXT);'
        );
    });

//inserting data into the daily table
export const addDaily = (date, mood, sleephours, sleepquality) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO daily (date, mood, sleephours, sleepquality) VALUES (?, ?, ?, ?);',
                [date, mood, sleephours, sleepquality],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error)
                }
            );
        },
        (error) => {
            reject(error);
        }
        );
    });
};

//fetching all data from the daily table
export const getAllDaily = () => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql('SELECT * FROM daily;', [], (_, result) => {
                    const data = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        data.push(result.rows.item(i));
                    }
                    resolve(data);
                });
            },
            (error) => {
                reject(error);
            }
        );
    });
};

//creating the routine table
db.transaction(tx => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS routine (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, routine_name TEXT, completed INTEGER);'
        );
    });

//fetching all data from the routine table
export const getAllRoutines = () => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql('SELECT * FROM routine;', [], (_, result) => {
                    const data = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        data.push(result.rows.item(i));
                    }
                    resolve(data);
                });
            },
            (error) => {
                reject(error);
            }
        );
    });
};