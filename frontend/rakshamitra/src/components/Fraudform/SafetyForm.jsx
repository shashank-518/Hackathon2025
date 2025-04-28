import { useState, useEffect } from 'react';

function SafetyForm() {
  const [formData, setFormData] = useState({
    currentLocation: '',
    destination: '',
    estimatedHours: '',
    estimatedMinutes: '',
    plateNumber: '',
  });

  const [timerSeconds, setTimerSeconds] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);

    const hours = parseInt(formData.estimatedHours)  || 0;
    const minutes = parseInt(formData.estimatedMinutes)  || 0;
    const totalSeconds = (hours * 3600) + (minutes * 60);

    if (totalSeconds > 0) {
      setTimerSeconds(totalSeconds);
    }
  };

  useEffect(() => {
    let interval = null;
    if (timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      clearInterval(interval);
      playBeepSound();
      setShowModal(true); // Show modal when timer ends
    }
    return () => clearInterval(interval);
  }, [timerSeconds]);

  const playBeepSound = () => {
    const beep = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
  
    let beepInterval = setInterval(() => {
      beep.play();
    }, 100); 
  
    setTimeout(() => {
      clearInterval(beepInterval); 
    }, 10000); 
  };


  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (

    <>
    
    
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>Travel Details Form</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          name="currentLocation"
          placeholder="Current Location"
          value={formData.currentLocation}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          required
        />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="number"
            name="estimatedHours"
            placeholder="Hours"
            value={formData.estimatedHours}
            onChange={handleChange}
            min="0"
          />
          <input
            type="number"
            name="estimatedMinutes"
            placeholder="Minutes"
            value={formData.estimatedMinutes}
            onChange={handleChange}
            min="0"
            max="59"
          />
        </div>
        <input
          type="text"
          name="plateNumber"
          placeholder="Vehicle Plate Number"
          value={formData.plateNumber}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>

      {timerSeconds !== null && (
        <div style={{ marginTop: '2rem', fontSize: '1.5rem', textAlign: 'center' }}>
          <p>Countdown Timer:</p>
          <p style={{ fontWeight: 'bold' }}>{formatTime(timerSeconds)}</p>
        </div>
      )}
    </div>


 {/* Modal */}
 {showModal && (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}>
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        textAlign: 'center',
        width: '90%',
        maxWidth: '400px',
      }}>
        <h3>Have you reached your destination?</h3>
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-around' }}>
          <button onClick={() => handleModalResponse('yes')} style={modalButtonStyle}>Yes</button>
        </div>
      </div>
    </div>
  )}

</>


  );
}

const modalButtonStyle = {
    padding: '0.7rem 1.5rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#0d6efd',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
  };



export default SafetyForm;
