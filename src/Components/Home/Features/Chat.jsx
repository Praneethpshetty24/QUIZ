import React, { useState, useEffect } from 'react';
import { db } from '../../../Firebase'; 
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import './Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesRef = collection(db, 'chatMessages'); // Reference to the messages collection

    useEffect(() => {
        const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
            const fetchedMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(fetchedMessages);
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const handleSend = async () => {
        if (input.trim()) {
            const newMessage = {
                text: input,
                timestamp: new Date().toISOString(), // Store in ISO format for better querying
            };
            await addDoc(messagesRef, newMessage);
            setInput('');
        }
    };

    return (
        <div className="chat-container">
            <p className="default-message">Messages is anonymous,we even consider feedback's. Please be respectful.</p>
            <div className="chat-box">
                {messages.map((message) => (
                    <div key={message.id} className="chat-message">
                        <p className="message-text">{message.text}</p>
                        <span className="message-timestamp">{new Date(message.timestamp).toLocaleString()}</span>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your feedback..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
