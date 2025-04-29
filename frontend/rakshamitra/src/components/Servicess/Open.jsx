import { useState } from 'react';
import axios from 'axios';

function Open() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('')

    try {
      const response = await axios.post('http://localhost:3000/chat', {
        message: input,
      });

      const botMessage = { role: 'bot', content: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.role === 'user' ? '#4caf50' : '#2196f3',
            }}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '80vh',
    backgroundColor: '#f0f2f5',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
  },
  chatBox: {
    flex: 1,
    width: '100%',
    maxWidth: '600px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    gap: '10px',
    marginBottom: '10px',
  },
  message: {
    padding: '10px 15px',
    borderRadius: '20px',
    color: '#fff',
    maxWidth: '80%',
  },
  inputBox: {
    display: 'flex',
    width: '100%',
    maxWidth: '600px',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
  },
};

export default Open;
