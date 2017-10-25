module.exports = function (db) {
    return db.createReadStream({ start: 'cat!', end: 'cat!\uffff' });
};
