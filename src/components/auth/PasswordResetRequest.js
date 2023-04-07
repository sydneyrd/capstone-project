import React, { useState } from 'react';
import './auth.css';

import { fetchCsrfToken } from '../managers/APIManager';


export const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const csrfToken = await fetchCsrfToken();
      const response = await fetch('http://127.0.0.1:8000/password-reset-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setMessage('Something went wrong. Please try again.');
    }
  };
  
  return (
    <div className="reset--container">
      <div className="reset--password">
        <h2>Reset Password</h2>
        <form className="reset--password--form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="reset--password--button" type="submit"
          >
            Request Password Reset
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};
