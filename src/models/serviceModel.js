const db = require('./db');

class ServiceModel {
  static getAll(callback) {
    const query = 'SELECT * FROM services ORDER BY id ASC';
    db.query(query, callback);
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM services WHERE id = ?';
    db.query(query, [id], callback);
  }

  static create(service, callback) {
    const query = 'INSERT INTO services SET ?';
    db.query(query, service, callback);
  }

  static update(id, service, callback) {
    const query = 'UPDATE services SET ? WHERE id = ?';
    db.query(query, [service, id], callback);
  }

  static delete(id, callback) {
    const query = 'DELETE FROM services WHERE id = ?';
    db.query(query, [id], callback);
  }
}

module.exports = ServiceModel;