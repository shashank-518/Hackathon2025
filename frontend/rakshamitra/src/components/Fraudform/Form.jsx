import { useState } from 'react';

function Form() {
  const [formData, setFormData] = useState({
    bankName: '',
    ifscCode: '',
    branch: '',
    address: '',
    communicationScreenshot: null,
    paymentScreenshot: null,
    firCheckbox: false,
    bankCheckbox: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // send formData to server here
  };

  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #e0e0e0, #f0f0f0)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <form onSubmit={handleSubmit} style={{
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
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2rem', color: '#e16b1a'  }}>Fraud Form</h2>

        <input
          type="text"
          name="bankName"
          placeholder="Bank Name"
          value={formData.bankName}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="ifscCode"
          placeholder="IFSC Code"
          value={formData.ifscCode}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <div>
          <label>Screenshot of Communication:</label><br />
          <input
            type="file"
            name="communicationScreenshot"
            onChange={handleChange}
            accept="image/*"
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label>Screenshot of Payment:</label><br />
          <input
            type="file"
            name="paymentScreenshot"
            onChange={handleChange}
            accept="image/*"
            required
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              name="firCheckbox"
              checked={formData.firCheckbox}
              onChange={handleChange}
            />
            FIR
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              name="bankCheckbox"
              checked={formData.bankCheckbox}
              onChange={handleChange}
            />
            BANK
          </label>
        </div>

        <button type="submit" style={buttonStyle}>
          Confirm
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

export default Form;
