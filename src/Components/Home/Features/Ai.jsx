import React, { useState } from 'react';
import './Ai.css';

function Ai() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  // Simulate AI response based on keywords
  const generateAiResponse = (userInput) => {
    const lowerCaseInput = userInput.toLowerCase();
    
    if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) {
      return 'Hello! How can I assist you today?';
    } else if (lowerCaseInput.includes('how are you')) {
      return 'I am just a bot, but thank you for asking! How are you?';
    } else if (lowerCaseInput.includes('your name')) {
      return 'I am an AI chat assistant created to help you!';
    } else if (lowerCaseInput.includes('help')) {
      return 'I can help with general queries. Ask me anything!';
    } else if (lowerCaseInput.includes('bye')) {
      return 'Goodbye! Have a great day!';
    } else {
      return 'I am not sure how to respond to that. Can you ask something else?';
    }
  };

  const handleSend = () => {
    if (input.trim() !== '') {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiMessage = { sender: 'ai', text: generateAiResponse(input) };
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
