const db = require('./db');

class ProjectModel {
  static getAll(callback) {
    const query = 'SELECT * FROM projects ORDER BY created_at DESC';
    db.query(query, callback);
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM projects WHERE id = ?';
    db.query(query, [id], callback);
  }

  static create(project, callback) {
    const query = 'INSERT INTO projects SET ?';
    db.query(query, project, callback);
  }

  static update(id, project, callback) {
    const query = 'UPDATE projects SET ? WHERE id = ?';
    db.query(query, [project, id], callback);
  }

  static delete(id, callback) {
    const query = 'DELETE FROM projects WHERE id = ?';
    db.query(query, [id], callback);
  }
}

module.exports = ProjectModel;