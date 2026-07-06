const pool = require('../config/db');

const getDestinations = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM destinations WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching destinations', error: err.message });
  }
};

const addDestination = async (req, res) => {
  const { name, country, notes, rating } = req.body;

  if (!name || !country) {
    return res.status(400).json({ message: 'Name and country are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO destinations (user_id, name, country, notes, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, name, country, notes, rating]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error adding destination', error: err.message });
  }
};

const updateDestination = async (req, res) => {
  const { id } = req.params;
  const { name, country, notes, rating, visited } = req.body;
  try {
    const result = await pool.query(
      'UPDATE destinations SET name=$1, country=$2, notes=$3, rating=$4, visited=$5 WHERE id=$6 AND user_id=$7 RETURNING *',
      [name, country, notes, rating, visited, id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating destination', error: err.message });
  }
};

const deleteDestination = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      'DELETE FROM destinations WHERE id=$1 AND user_id=$2',
      [id, req.user.id]
    );
    res.json({ message: 'Destination deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting destination', error: err.message });
  }
};

module.exports = { getDestinations, addDestination, updateDestination, deleteDestination };