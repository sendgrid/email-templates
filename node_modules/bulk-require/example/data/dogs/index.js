module.exports = function (db) {
    return db.createReadStream({ start: 'dog!', end: 'dog!\uffff' });
};
