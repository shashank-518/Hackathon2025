import React, { useState } from 'react';
import Map from './Map'; 
import axios from 'axios';

function FireBri() {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 19.0760, long: 72.8777 }); 

  const handleLocationChange = async (e) => {
    const newLocation = e.target.value;
    setLocation(newLocation);

    
    if (newLocation.length > 3) { 
      try {
        const response = await axios.get(`https://api.maptiler.com/geocoding/${encodeURIComponent(newLocation)}.json?key=${process.env.REACT_APP_API_KEY}`);
        if (response.data.features && response.data.features.length > 0) {
          const { center } = response.data.features[0];
          setCoordinates({ long: center[0], lat: center[1] });
        } 
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Fire brigade booked for ${location}! 🚒`);
    
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem', flexWrap: 'wrap' }}>
      <form onSubmit={handleSubmit} style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2>🚒 Book a Fire Brigade</h2>

        <input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={handleLocationChange}
          style={inputStyle}
          required
        />

        <button type="submit" style={buttonStyle}>Book Now</button>
      </form>

      <div style={{ flex: '2', minWidth: '300px' }}>
        <Map coordinate={coordinates} />
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '0.8rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '1rem',
};

const buttonStyle = {
  padding: '0.8rem',
  borderRadius: '5px',
  backgroundColor: '#ff4d4f',
  color: '#fff',
  border: 'none',
  fontWeight: 'bold',
  cursor: 'pointer',
};

export default FireBri;
