import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [destinations, setDestinations] = useState([]);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState('');
  const [search, setSearch] = useState('');
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
    if (!name || !country) {
      alert('Destination name and country are required!');
      return;
    }
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

  const filtered = destinations.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.country.toLowerCase().includes(search.toLowerCase())
  );

  const visited = destinations.filter((d) => d.visited).length;
  const notVisited = destinations.length - visited;

  return (
    <div className="dashboard">
      <div className="header">
        <h2>Travel Bucket List</h2>
        <div>
          <button onClick={handleLogout} className="btn-danger">Logout</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat-box">
          <h3>{destinations.length}</h3>
          <p>Total Destinations</p>
        </div>
        <div className="stat-box">
          <h3>{visited}</h3>
          <p>Visited</p>
        </div>
        <div className="stat-box">
          <h3>{notVisited}</h3>
          <p>Not Visited</p>
        </div>
      </div>

      <div className="add-form">
        <h3>Add New Destination</h3>
        <form onSubmit={addDestination}>
          <input type="text" placeholder="Destination name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
          <input type="text" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <input type="number" placeholder="Rating (1-5)" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" />
          <button type="submit" style={{marginTop: '12px'}}>Add Destination</button>
        </form>
      </div>

      <input className="search-box" type="text" placeholder="Search destinations..." value={search} onChange={(e) => setSearch(e.target.value)} />

      <h3 style={{color: 'white', marginBottom: '15px'}}>My Destinations</h3>
      <div>
        {filtered.map((dest) => (
          <div key={dest.id} className={`destination-card ${dest.visited ? 'visited' : 'not-visited'}`}>
            <h4>{dest.name} - {dest.country}</h4>
            <p style={{color: '#666', margin: '8px 0'}}>{dest.notes}</p>
            <p>Rating: {dest.rating}/5</p>
            <p style={{margin: '8px 0'}}>Status: {dest.visited ? 'Visited' : 'Not Visited'}</p>
            <button className="btn-success" onClick={() => markVisited(dest)}>
              {dest.visited ? 'Mark Unvisited' : 'Mark Visited'}
            </button>
            <button className="btn-danger" onClick={() => deleteDestination(dest.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;