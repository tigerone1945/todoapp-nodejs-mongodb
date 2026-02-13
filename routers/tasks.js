const express = require('express');
const router = express.Router();
const {
  getAllTasks, 
  createTask,
  getTaskById,
  updateTaskById,
  deleteTaskById
} = require('../controllers/tasks');

// Add comment to force refresh




router.get('/', getAllTasks);

router.post('/', createTask);

router.get('/:id', getTaskById);

router.patch('/:id', updateTaskById);

router.delete('/:id', deleteTaskById);

module.exports = router;