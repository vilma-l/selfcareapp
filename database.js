import * as SQLite from 'expo-sqlite';

//database connection
export const db = SQLite.openDatabase('selfcaredb.db');

//creating the mood table
db.transaction(tx => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS mood (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, date TEXT, mood TEXT);'
        );
    });

//inserting data into the mood table
export const addMood = (date, mood) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO mood (date, mood) VALUES (?, ?);',
                [date, mood],
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

//fetching all data from the mood table
export const getAllMood = () => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql('SELECT * FROM mood;', [], (_, result) => {
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

//creating the sleep table
db.transaction(tx => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS mood (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, date TEXT, sleephours TEXT, sleepquality TEXT);'
        );
    });

//inserting data into the sleep table
export const addSleep = (date, sleephours, sleepquality) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO sleep (date, sleephours, sleepquality) VALUES (?, ?, ?);',
                [date, sleephours, sleepquality],
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

//fetching all data from the sleep table
export const getAllSleep = () => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql('SELECT * FROM sleep;', [], (_, result) => {
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

//fetching sleep data by date
export const getSleepByDate = (date) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql('SELECT * FROM sleep WHERE date = ?;', [date], (_, result) => {
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

//update the sleep data
export const updateSleep = (date, sleephours, sleepquality) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                // Check if there is existing data for the specified date
                tx.executeSql(
                    'SELECT * FROM sleep WHERE date = ?;',
                    [date],
                    (_, result) => {
                        const rows = result.rows;
                        console.log('Rows found:', rows.length);

                        if (rows.length > 0) {
                            // Existing data found, perform the update
                            tx.executeSql(
                                'UPDATE sleep SET sleephours = ?, sleepquality = ? WHERE date = ?;',
                                [sleephours, sleepquality, date],
                                (_, updateResult) => {
                                    const updateRowsAffected = updateResult.rowsAffected;

                                    if (updateRowsAffected > 0) {
                                        // Successful update
                                        resolve();
                                    } else {
                                        // Update didn't affect any rows
                                        reject(new Error('Update failed. No rows affected.'));
                                    }
                                }
                            );
                        } else {
                            // No data for the specified date
                            reject(new Error('No sleep data for the specified date.'));
                        }
                    }
                );
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
        'CREATE TABLE IF NOT EXISTS routine (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, routine_name TEXT, completed INTEGER, last_updated DATE);'
        );
    });