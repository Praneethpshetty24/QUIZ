import React, { useState } from 'react';
import './Ai.css';

function Ai() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (input.trim() !== '') {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiMessage = { sender: 'ai', text: 'This is a simulated AI response.' };
        setMessages([...messages, userMessage, aiMessage]);
      }, 1000);

      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>AI Chat</h2>
      </div>
      <div className="chat-body">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.sender === 'ai' ? 'ai-message' : 'user-message'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Ai;
