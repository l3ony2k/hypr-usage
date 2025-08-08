import React from 'react';

const Controls = ({ dateRange, onDateRangeChange, onRefresh, isRefreshing, onLogout, lastUpdated }) => {
  const handleQuickDateChange = (days, type = 'days') => {
    const endDate = new Date();
    const startDate = new Date();
    
    if (type === 'yesterday') {
      startDate.setDate(endDate.getDate() - 1);
      endDate.setDate(endDate.getDate() - 1);
    } else {
      startDate.setDate(endDate.getDate() - days);
    }

    const newDateRange = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      quickRange: type === 'yesterday' ? 'yesterday' : days
    };

    onDateRangeChange(newDateRange);
  };

  const handleDateInputChange = (field, value) => {
    const newDateRange = {
      ...dateRange,
      [field]: value,
      quickRange: null // Clear quick range when manually setting dates
    };
    onDateRangeChange(newDateRange);
  };

  const getTooltipText = () => {
    if (!lastUpdated) return 'No data loaded yet';
    
    const now = new Date();
    const diffMs = now - lastUpdated;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    let timeAgo;
    if (diffMinutes < 1) {
      timeAgo = 'Just now';
    } else if (diffMinutes < 60) {
      timeAgo = `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
    } else if (diffHours < 24) {
      timeAgo = `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else {
      timeAgo = lastUpdated.toLocaleDateString() + ' ' + lastUpdated.toLocaleTimeString();
    }
    
    return `Last updated: ${timeAgo}`;
  };

  return (
    <div className="controls-section">
      <div className="controls-grid">
        <div className="refresh-section">
          <button 
            className="refresh-btn tooltip" 
            onClick={onRefresh}
            disabled={isRefreshing}
            title={getTooltipText()}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
            <span className="tooltip-text">{getTooltipText()}</span>
          </button>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
        
        <div className="date-controls">
          <div className="quick-date-buttons">
            <button 
              className={`quick-date-btn ${dateRange.quickRange === 'yesterday' ? 'active' : ''}`}
              onClick={() => handleQuickDateChange(1, 'yesterday')}
            >
              Yesterday
            </button>
            <button 
              className={`quick-date-btn ${dateRange.quickRange === 7 ? 'active' : ''}`}
              onClick={() => handleQuickDateChange(7)}
            >
              7 Days
            </button>
            <button 
              className={`quick-date-btn ${dateRange.quickRange === 14 ? 'active' : ''}`}
              onClick={() => handleQuickDateChange(14)}
            >
              14 Days
            </button>
            <button 
              className={`quick-date-btn ${dateRange.quickRange === 30 ? 'active' : ''}`}
              onClick={() => handleQuickDateChange(30)}
            >
              30 Days
            </button>
            <button 
              className={`quick-date-btn ${dateRange.quickRange === 90 ? 'active' : ''}`}
              onClick={() => handleQuickDateChange(90)}
            >
              90 Days
            </button>
          </div>
          
          <div className="date-inputs">
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => handleDateInputChange('startDate', e.target.value)}
            />
            <span>to</span>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => handleDateInputChange('endDate', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;