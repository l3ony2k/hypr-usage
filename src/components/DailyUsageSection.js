import React, { useState, useMemo } from 'react';
import DailyBarChart from './charts/DailyBarChart';
import { roundMoney, formatMoney } from '../services/api';

const DailyUsageSection = ({ usageData, dateRange }) => {
  const [currentView, setCurrentView] = useState('table');

  const filteredDateRangeData = useMemo(() => {
    if (!usageData || !usageData.usage_breakdown || !dateRange.startDate || !dateRange.endDate) {
      return [];
    }

    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    return usageData.usage_breakdown
      .filter(day => {
        const dayDate = new Date(day.date);
        return dayDate >= startDate && dayDate <= endDate;
      })
      .reverse(); // Show most recent first
  }, [usageData, dateRange]);

  const modelsInRange = useMemo(() => {
    const models = new Set();
    filteredDateRangeData.forEach(day => {
      Object.keys(day).forEach(key => {
        if (key !== 'date' && day[key] > 0) {
          models.add(key);
        }
      });
    });
    return Array.from(models).sort();
  }, [filteredDateRangeData]);

  const handleViewChange = (viewType) => {
    setCurrentView(viewType);
  };

  const renderTableView = () => {
    if (filteredDateRangeData.length === 0) {
      return (
        <div className="table-container">
          <table>
            <tbody>
              <tr>
                <td style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No data for selected date range
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    // Limit to top 10 models for table readability
    const displayModels = modelsInRange.slice(0, 10);

    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              {displayModels.map(model => (
                <th key={model}>
                  {model.length > 15 ? model.substring(0, 15) + '...' : model}
                </th>
              ))}
              <th>Daily Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredDateRangeData.map((day, index) => {
              let dailyTotal = 0;
              Object.keys(day).forEach(key => {
                if (key !== 'date') {
                  dailyTotal += roundMoney(day[key]);
                }
              });

              return (
                <tr key={index}>
                  <td className="date-column">
                    {new Date(day.date).toLocaleDateString()}
                  </td>
                  {displayModels.map(model => {
                    const usage = day[model] || 0;
                    return (
                      <td key={model} className={`usage-amount ${usage === 0 ? 'zero' : ''}`}>
                        {formatMoney(usage)}
                      </td>
                    );
                  })}
                  <td className="usage-amount" style={{ fontWeight: 'bold' }}>
                    {formatMoney(dailyTotal)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderChartView = () => {
    if (currentView === 'bar') {
      return (
        <div className={`chart-container ${currentView === 'bar' ? 'active' : ''}`}>
          <DailyBarChart data={filteredDateRangeData} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="table-section">
      <div className="section-header">
        <h3>Daily Usage Breakdown</h3>
        <div className="view-controls">
          <button
            className={`view-toggle-btn ${currentView === 'table' ? 'active' : ''}`}
            onClick={() => handleViewChange('table')}
          >
            Table
          </button>
          <button
            className={`view-toggle-btn ${currentView === 'bar' ? 'active' : ''}`}
            onClick={() => handleViewChange('bar')}
          >
            Bar Chart
          </button>
        </div>
      </div>
      
      {currentView === 'table' ? renderTableView() : renderChartView()}
    </div>
  );
};

export default DailyUsageSection;