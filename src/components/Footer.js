import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { theme, themes, changeTheme } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const handleThemeClick = (e) => {
    e.preventDefault();
    setShowThemeMenu(!showThemeMenu);
  };

  const handleThemeSelect = (selectedTheme) => {
    changeTheme(selectedTheme);
    setShowThemeMenu(false);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-description">
          HyprLab Usage Dashboard - Monitor your AI API usage and costs. HyprLab offers cutting-edge APIs designed for Artificial Intelligence and Large Language Models (LLMs).  
        </p>
        <p className="footer-links">
          <a 
            href="https://github.com/l3ony2k/hypr-usage" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
          <span className="footer-separator"> • </span>
          <a 
            href="https://hyprlab.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            HyprLab Home
          </a>
          <span className="footer-separator"> • </span>
          <span className="theme-switcher">
            <button 
              className="footer-link theme-toggle"
              onClick={handleThemeClick}
            >
              Change Color Scheme
            </button>
            {showThemeMenu && (
              <div className="theme-menu">
                {Object.entries(themes).map(([key, name]) => (
                  <button
                    key={key}
                    className={`theme-option ${theme === key ? 'active' : ''}`}
                    onClick={() => handleThemeSelect(key)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;