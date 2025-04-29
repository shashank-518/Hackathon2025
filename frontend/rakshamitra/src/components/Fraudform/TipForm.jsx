import { useState } from 'react';

function TipForm() {
  const [formData, setFormData] = useState({
    caseId: '',
    location: '',
    date: '',
    explanation: '',
    file: null,
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const reportDetails = {
      caseId: formData.caseId,
      location: formData.location,
      date: formData.date,
      phone: '+91' + formData.phone,
      explanation: formData.explanation,
    };
  
    console.log(reportDetails)

    try {
      await fetch('http://localhost:3000/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportDetails),
      });
      
    } catch (error) {
      console.error('Error sending report:', error);
    }
  };
  

  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #e0e0e0, #f0f0f0)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#0d3b3b',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
          width: '100%',
          maxWidth: '500px',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2rem' }}>
          Crime Report Form
        </h2>

        <input
          type="text"
          name="caseId"
          placeholder="Case ID"
          value={formData.caseId}
          onChange={handleChange}
          style={inputStyle}
          required
        />

<input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <textarea
          name="explanation"
          placeholder="Explanation about the crime"
          value={formData.explanation}
          onChange={handleChange}
          rows={5}
          style={{ ...inputStyle, resize: 'vertical' }}
          required
        />

        <input
          type="file"
          onChange={handleFileChange}
          style={inputStyle}
          required
        />

        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#f0f0f0',
  color: '#000',
};

const buttonStyle = {
  backgroundColor: '#029e9d',
  border: 'none',
  padding: '0.7rem',
  borderRadius: '5px',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default TipForm;
