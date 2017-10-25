exports.all = function (db) {
    return db.createReadStream({ start: 'owner!', end: 'owner!\uffff' });
};

exports.one = function (db, name, cb) {
    db.get('owner!' + name, cb);
};
