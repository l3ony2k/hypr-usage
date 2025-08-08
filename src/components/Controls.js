import React from 'react';

const Controls = ({ dateRange, onDateRangeChange, onRefresh, isRefreshing, onLogout }) => {
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

  return (
    <div className="controls-section">
      <div className="controls-grid">
        <div className="refresh-section">
          <button 
            className="refresh-btn" 
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
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