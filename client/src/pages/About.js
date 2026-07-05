import React from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="header">
        <h2>Travel Bucket List</h2>
        <button onClick={() => navigate(-1)} className="btn-success">Back</button>
      </div>

      <div className="add-form" style={{textAlign: 'center', padding: '40px'}}>
        <h2 style={{color: '#0f3460', fontSize: '32px', marginBottom: '20px'}}>About Us</h2>

        <p style={{fontSize: '16px', color: '#666', lineHeight: '2', marginBottom: '30px'}}>
          We believe that travel is one of the most enriching experiences in life.
          Our mission is to help you organize, track, and dream about all the amazing
          places the world has to offer.
        </p>

        <p style={{fontSize: '16px', color: '#666', lineHeight: '2', marginBottom: '30px'}}>
          With Travel Bucket List, you can create your personal list of dream destinations,
          mark the places you have already visited, rate your experiences, and keep notes
          about each location. Your travel journey starts here.
        </p>

        <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '30px', flexWrap: 'wrap'}}>
          <div className="stat-box" style={{minWidth: '150px'}}>
            <h3>📍</h3>
            <p>Save your dream destinations</p>
          </div>
          <div className="stat-box" style={{minWidth: '150px'}}>
            <h3>✅</h3>
            <p>Track places you have visited</p>
          </div>
          <div className="stat-box" style={{minWidth: '150px'}}>
            <h3>⭐</h3>
            <p>Rate and review each place</p>
          </div>
          <div className="stat-box" style={{minWidth: '150px'}}>
            <h3>🔍</h3>
            <p>Search through your list</p>
          </div>
        </div>

        <p style={{fontSize: '16px', color: '#666', lineHeight: '2'}}>
          Start your adventure today. The world is waiting for you!
        </p>
      </div>
    </div>
  );
}

export default About;