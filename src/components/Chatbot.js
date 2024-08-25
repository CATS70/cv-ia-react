import React, { useState, useEffect, useRef } from 'react';
import { getChatbotResponse } from '../utils/Api';
import { getWelcomeMessage } from '../config/chatConfig';
import '../styles/styles.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const tempResponseRef = useRef([]);

  useEffect(() => {
    const welcomeMessage = getWelcomeMessage();
    setMessages([{ type: 'bot', ...welcomeMessage }]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { type: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    tempResponseRef.current = []; // Clear temporary response

    getChatbotResponse(
      input,
      (chunk) => {
        tempResponseRef.current.push(chunk);
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.type === 'bot') {
            lastMessage.content = tempResponseRef.current.join('');
          } else {
            newMessages.push({ type: 'bot', content: tempResponseRef.current.join('') });
          }
          return newMessages;
        });
      },
      () => {
        setIsLoading(false);
        tempResponseRef.current = []; // Clear temporary response
      },
      (error) => {
        console.error('Error getting chatbot response:', error);
        setMessages(prevMessages => [
          ...prevMessages, 
          { type: 'bot', content: "Désolé, je n'ai pas pu obtenir de réponse. Veuillez réessayer." }
        ]);
        setIsLoading(false);
        tempResponseRef.current = []; // Clear temporary response
      }
    );
  };

  return (
    <div id="chatbot-container">
      <div id="chat-messages" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.id === 'welcome' ? (
              <div dangerouslySetInnerHTML={{ __html: msg.content }} />
            ) : (
              <>
                <strong>{msg.type === 'user' ? 'Vous:' : 'Chatbot:'}</strong>
                <span>{msg.content}</span>
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div id="chat-input">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Posez votre question..."
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading}>Envoyer</button>
      </div>
      {isLoading && (
        <div id="loading-indicator">
          <img src="/images/Dancing_kitty.gif" alt="Chargement..." />
        </div>
      )}
    </div>
  );
};

export default Chatbot;