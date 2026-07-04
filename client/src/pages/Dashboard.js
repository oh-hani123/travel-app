import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [destinations, setDestinations] = useState([]);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      fetchDestinations();
    }
  }, []);

  const fetchDestinations = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/destinations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDestinations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addDestination = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3000/api/destinations',
        { name, country, notes, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName('');
      setCountry('');
      setNotes('');
      setRating('');
      fetchDestinations();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDestination = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/destinations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDestinations();
    } catch (err) {
      console.error(err);
    }
  };

  const markVisited = async (dest) => {
    try {
      await axios.put(
        `http://localhost:3000/api/destinations/${dest.id}`,
        { ...dest, visited: !dest.visited },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDestinations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <h2>My Travel Bucket List</h2>
      <button onClick={handleLogout}>Logout</button>

      <form onSubmit={addDestination}>
        <h3>Add New Destination</h3>
        <input type="text" placeholder="Destination name" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
        <br />
        <input type="text" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <br />
        <input type="number" placeholder="Rating (1-5)" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" />
        <br />
        <button type="submit">Add Destination</button>
      </form>

      <h3>My Destinations</h3>
      <div>
        {destinations.map((dest) => (
          <div key={dest.id}>
            <h4>{dest.name} - {dest.country}</h4>
            <p>{dest.notes}</p>
            <p>Rating: {dest.rating}/5</p>
            <p>Status: {dest.visited ? 'Visited' : 'Not Visited'}</p>
            <button onClick={() => markVisited(dest)}>
              {dest.visited ? 'Mark Unvisited' : 'Mark Visited'}
            </button>
            <button onClick={() => deleteDestination(dest.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;