import React, { useState } from 'react';
import axios from 'axios';

function FireBri() {
  const [formData, setFormData] = useState({
    location: '',
    name: '',
    phone: '',
    fireType: '',
    description: '',
    injured: false,
    coordinates: { lat: 12.9716, long: 77.5946 },
  });

  const handleInputChange = async (e) => {
    const { name, value, type, checked } = e.target;

    console.log(formData.location)

    if (name === 'location') {
      setFormData((prev) => ({ ...prev, location: value }));

      if (value.length > 2) {
        try {
          const response = await axios.get(
            `https://api.maptiler.com/maps/aquarelle/style.json?key=huStQ5ucUbzy1GpmsOtf`
          );
          if (response.data.features.length > 0) {
            const { center } = response.data.features[0];
            setFormData((prev) => ({
              ...prev,
              coordinates: { long: center[0], lat: center[1] },
            }));
          }
        } catch (error) {
          console.error('Error fetching coordinates:', error);
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    const formDataToSend = {
      location: formData.location,  
      fireCause: formData.description,  
      phone: formData.phone,  
      userName: formData.userName, 
    };
  
    
    try {
      const response = await axios.post('http://localhost:3000/bookfirebrigade', formDataToSend);
  
      if (response.data.success) {
        alert(`🚒 Fire brigade dispatched to ${formData.location}!\n\nIncident: ${formData.description}`);
      } else {
        alert('There was an issue with the fire brigade request.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong, please try again later.');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem', flexWrap: 'wrap' }}>
      <form onSubmit={handleSubmit} style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2>🚨 Report Fire Incident</h2>

        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          style={inputStyle}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Contact Number"
          value={formData.phone}
          onChange={handleInputChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="location"
          placeholder="Incident Location"
          value={formData.location}
          onChange={handleInputChange}
          required
          style={inputStyle}
        />

        <select
          name="fireType"
          value={formData.fireType}
          onChange={handleInputChange}
          required
          style={inputStyle}
        >
          <option value="">Select Fire Type</option>
          <option value="residential">Residential</option>
          <option value="vehicle">Vehicle</option>
          <option value="industrial">Industrial</option>
          <option value="forest">Forest</option>
          <option value="other">Other</option>
        </select>

        <textarea
          name="description"
          placeholder="Describe how the fire occurred..."
          value={formData.description}
          onChange={handleInputChange}
          rows="4"
          style={inputStyle}
        />

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            name="injured"
            checked={formData.injured}
            onChange={handleInputChange}
          />
          Any injuries?
        </label>

        <button type="submit" style={buttonStyle}>🚒 Book Fire Brigade</button>
      </form>
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
