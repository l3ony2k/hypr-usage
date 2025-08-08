import React from 'react';

const Header = ({ userInfo }) => {
  if (!userInfo) return null;

  return (
    <div className="header">
      <div className="user-info">
        <div className="user-details">
          <h1>{userInfo.discord_name || 'Unknown'}</h1>
          <p>Discord ID: {userInfo.discord_id || 'Unknown'}</p>
        </div>
        <div className="credit-info">
          <div className="credit-amount">{userInfo.credit_left || '$0.00'}</div>
          <div className="credit-label">Credits Remaining</div>
        </div>
      </div>
    </div>
  );
};

export default Header;