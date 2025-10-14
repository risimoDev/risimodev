const db = require('./db');

class SiteTextModel {
  static getAll(callback) {
    const query = 'SELECT * FROM site_texts';
    db.query(query, callback);
  }

  static getByKey(key, callback) {
    const query = 'SELECT * FROM site_texts WHERE `key` = ?';
    db.query(query, [key], callback);
  }

  static update(key, value, callback) {
    const query = 'UPDATE site_texts SET value = ? WHERE `key` = ?';
    db.query(query, [value, key], callback);
  }

  static create(key, value, callback) {
    const query = 'INSERT INTO site_texts (`key`, value) VALUES (?, ?)';
    db.query(query, [key, value], callback);
  }
}

module.exports = SiteTextModel;