import { useState } from 'react';
import './Open.css';

function Open() {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospitals, setSelectedHospitals] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms, age }),
      });

      if (!res.ok) throw new Error('Network response was not ok');

      const data = await res.json();
      setAiResponse(data);
    } catch (err) {
      console.error(err);
      setAiResponse({
        urgency: 'LOW',
        advice: 'Something went wrong. Please try again later.',
      });
    }
    setLoading(false);
  };

  const handleBookAppointment = () => {
    setShowModal(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });

          setHospitals([
            { name: 'City Care Hospital', distance: '1.2 km' },
            { name: 'Lifeline Multispeciality', distance: '2.5 km' },
            { name: 'Green Cross Clinic', distance: '3.0 km' },
          ]);
        },
        (error) => {
          console.error('Location error:', error);
          setHospitals([{ name: 'Unable to fetch location.', distance: '' }]);
        }
      );
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedHospitals([]);
  };

  const toggleHospitalSelection = (hospitalName) => {
    setSelectedHospitals((prev) =>
      prev.includes(hospitalName)
        ? prev.filter((name) => name !== hospitalName)
        : [...prev, hospitalName]
    );
  };

  return (
    <div className="triage-container">
      <div className="triage-card">
        <h2 className="triage-title">🚑 AI Ambulance Triage Assistant</h2>

        <label>Patient Age</label>
        <input
          type="number"
          className="triage-input"
          placeholder="Enter patient's age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label>Describe Symptoms</label>
        <textarea
          className="triage-textarea"
          rows={4}
          placeholder="E.g., chest pain, shortness of breath..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="triage-button"
        >
          {loading ? 'Analyzing...' : 'Get Triage Advice'}
        </button>

        {aiResponse && (
          <div className="triage-response">
            <div className="response-item">
              <strong>Urgency Level:</strong>
              <span className="urgency-level">{aiResponse.urgency}</span>
            </div>
            <div className="response-item">
              <strong>Advice:</strong>
              <p className="advice-text">{aiResponse.advice}</p>
            </div>
            <div className="response-item">
              <button className="triage-button" onClick={handleBookAppointment}>
                Near By Hospital
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Nearby Hospitals</h3>
            <ul>
              {hospitals.map((hospital, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedHospitals.includes(hospital.name)}
                      onChange={() => toggleHospitalSelection(hospital.name)}
                    />
                    {hospital.name}
                    {hospital.distance && ` - ${hospital.distance}`}
                  </label>
                </li>
              ))}
            </ul>

            <div className="modal-buttons">
              <button
                className="triage-button"
                onClick={async () => {
                  if (selectedHospitals.length > 0 && location) {
                    try {
                      await fetch('http://localhost:3000/sendlocation', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          location,
                          hospitals: selectedHospitals,
                        }),
                      });
                    } catch (err) {
                      alert('Failed to send location.');
                    }
                  } else {
                    alert('Please select at least one hospital.');
                  }
                  closeModal();
                }}
              >
                Confirm Booking
              </button>
              <button onClick={closeModal} className="triage-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Open;
