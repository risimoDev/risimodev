const db = require('./db');

class MessageModel {
  static getAll(callback) {
    const query = 'SELECT * FROM messages ORDER BY created_at DESC';
    db.query(query, callback);
  }

  static create(message, callback) {
    const query = 'INSERT INTO messages SET ?';
    db.query(query, message, callback);
  }

  static delete(id, callback) {
    const query = 'DELETE FROM messages WHERE id = ?';
    db.query(query, [id], callback);
  }
}

module.exports = MessageModel;