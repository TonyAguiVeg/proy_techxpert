const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('CALL usp_listar_tasks()', (err, results) => {
    if (err) {
      console.error('Error en GET:', err);
      return res.status(500).json({ error: 'Error al listar tareas' });
    }
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'El título es obligatorio' });

  db.query('CALL usp_insertar_task(?)', [title], (err, result) => {
    if (err) {
      console.error('Error en POST:', err);
      return res.status(500).json({ error: 'Error al crear tarea' });
    }
    res.json({ message: 'Tarea creada correctamente', id: result.insertId });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, estado } = req.body;

  db.query('CALL usp_actualizar_task(?, ?, ?)', [id, title, estado], (err) => {
    if (err) {
      console.error('Error en PUT:', err);
      return res.status(500).json({ error: 'Error al actualizar tarea' });
    }
    res.json({ message: 'Tarea actualizada' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log('Eliminando tarea ID:', id);

  db.query('CALL usp_eliminar_task(?)', [id], (err, result) => {
    if (err) {
      console.error('Error en DELETE:', err);
      return res.status(500).json({ error: 'Error al eliminar tarea' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json({ message: 'Tarea eliminada' });
  });
});

module.exports = router;