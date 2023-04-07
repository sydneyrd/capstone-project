import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCsrfToken } from '../managers/APIManager';
import { useNavigate } from 'react-router-dom';
import './auth.css'
export const ResetPasswordForm = () => {
  const { pass_token } = useParams();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== passwordConfirm) {
      alert('Passwords do not match');
      return;
    }
  
    // Send the new password and token to your Django server.
    try {
      const csrfToken = await fetchCsrfToken();
      const response = await fetch('http://127.0.0.1:8000/password-reset-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ pass_token, password }),
      });
  
      if (response.ok) {
        alert('Your password has been successfully reset.');
        navigate('/login')
      } else {
        alert('An error occurred while resetting your password.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="password--reset--confirm">
      <h1>Reset Password</h1>
      <form className="password-reset--confirm--form"
      onSubmit={handleSubmit}>
        <label>
          New password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm new password:
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </label>
        <button
        className="password--reset--confirm--button"
        type="submit">Reset Password</button>
      </form>
    </div>
  );
};
