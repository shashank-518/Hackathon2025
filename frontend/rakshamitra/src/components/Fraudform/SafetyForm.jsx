import { useState, useEffect , useRef } from 'react';

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
  const [userClickedYes, setUserClickedYes] = useState(false);
  const modalTimerRef = useRef(null);

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
      setTimerSeconds(totalSeconds * 0.1);
    }
  };

  useEffect(() => {
    if (showModal) {
      const timeout = setTimeout(() => {
        if (!userClickedYes) {
          sendAlertSms({
            currentLocation: formData.currentLocation,
            destination: formData.destination,
            estimatedTime: formData.estimatedTime,
            vehiclePlate: formData.plateNumber,
          });
        }
      }, 10000);
  
      return () => clearTimeout(timeout);
    }
  }, [showModal]);

  const sendAlertSms = async (details) => {
    try {
      await fetch('http://localhost:3000/Alertmessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:  JSON.stringify(details),
      });
      console.log('Alert SMS sent to my number');
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

  const handleModalResponse = (response) => {
    if (response === 'yes') {
      setUserClickedYes(true);
      setShowModal(false);
      clearTimeout(modalTimerRef.current);
      
    }
  };

  useEffect(() => {
    if (showModal) {
      modalTimerRef.current = setTimeout(() => {
        if (!userClickedYes) {
          setShowModal(false);
          setUserCl
          ickedYes(true);
          sendAlertSms({
            currentLocation: formData.currentLocation,
            destination: formData.destination,
            estimatedTime: formData.estimatedHours + 'h ' + formData.estimatedMinutes + 'm',
            vehiclePlate: formData.plateNumber,
          });
          alert("Submitted")
        }
      }, 10000);
    }
    return () => clearTimeout(modalTimerRef.current);
  }, [showModal]);
  


  useEffect(() => {
    let interval = null;
    if (timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      clearInterval(interval);
      playBeepSound();
      setShowModal(true); 
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
    
    
    <div style={{background: 'linear-gradient(to bottom right, #e0e0e0, #f0f0f0)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection : 'column',
      justifyContent: 'center',
      alignItems: 'center', }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#0d3b3b',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '500px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem', }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2rem', color: '#'  }} >Travel Details Form</h2>
        <input
          type="text"
          name="currentLocation"
          placeholder="Current Location"
          value={formData.currentLocation}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="number"
            name="estimatedHours"
            placeholder="Hours"
            value={formData.estimatedHours}
            onChange={handleChange}
            style={inputStyle}
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
            style={inputStyle}
          />
        </div>
        <input
          type="text"
          name="plateNumber"
          placeholder="Vehicle Plate Number"
          value={formData.plateNumber}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <button type="submit" style={buttonStyle} >Submit</button>
      </form>

      {timerSeconds !== null && (
  <div style={{
    marginTop: '3rem',
    textAlign: 'center',
    background: '#0d3b3b',
    color: '#ffffff',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
  }}>
    <p style={{ fontSize: '1.2rem', marginBottom: '1rem', opacity: 0.9 }}>⏳ Countdown Timer:</p>
    <p style={{
      fontWeight: 'bold',
      fontSize: '2.5rem',
      letterSpacing: '2px',
      textShadow: '0 0 10px #ffffff, 0 0 20px #ffffff',
    }}>
      {formatTime(timerSeconds)}
    </p>
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
  



export default SafetyForm;
