import React, { useState } from 'react';
import { setApiKey } from '../services/auth';

const Login = ({ onLogin }) => {
  const [apiKey, setApiKeyInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsLoading(true);
    try {
      setApiKey(apiKey.trim());
      onLogin();
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Enter API Key</h1>
        <p>Please enter your HyprLab API key to continue.</p>
        <input
          type="text"
          placeholder="Your API Key"
          value={apiKey}
          onChange={(e) => setApiKeyInput(e.target.value)}
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !apiKey.trim()}>
          {isLoading ? 'Saving...' : 'Save and Continue'}
        </button>
      </form>
    </div>
  );
};

export default Login;