const addDestination = async (req, res) => {
  console.log('ADD CALLED', req.body);
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
    console.log('ERROR:', err);
    res.status(500).json({ message: 'Error adding destination', error: err.message });
  }
};