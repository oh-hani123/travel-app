const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const {
  getDestinations,
  addDestination,
  updateDestination,
  deleteDestination
} = require('../controllers/destinationController');

router.get('/', authenticateToken, getDestinations);
router.post('/', authenticateToken, addDestination);
router.put('/:id', authenticateToken, updateDestination);
router.delete('/:id', authenticateToken, deleteDestination);

module.exports = router;