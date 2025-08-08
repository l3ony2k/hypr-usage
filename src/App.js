import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { getApiKey } from './services/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiKey = getApiKey();
    setIsAuthenticated(!!apiKey);
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      {isAuthenticated ? (
        <Dashboard onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;