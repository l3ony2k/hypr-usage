import React, { useState, useMemo } from 'react';
import ModelBarChart from './charts/ModelBarChart';
import ModelPieChart from './charts/ModelPieChart';
import { roundMoney, formatMoney } from '../services/api';

const ModelUsageSection = ({ usageData, dateRange }) => {
  const [currentView, setCurrentView] = useState('table');
  const [modelFilter, setModelFilter] = useState('');
  const [hideZeroUsage, setHideZeroUsage] = useState(true);
  const [hideSmallUsage, setHideSmallUsage] = useState(false);

  const filteredDateRangeData = useMemo(() => {
    if (!usageData || !usageData.usage_breakdown || !dateRange.startDate || !dateRange.endDate) {
      return [];
    }

    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    return usageData.usage_breakdown.filter(day => {
      const dayDate = new Date(day.date);
      return dayDate >= startDate && dayDate <= endDate;
    });
  }, [usageData, dateRange]);

  const modelUsageData = useMemo(() => {
    const modelUsage = {};
    let totalUsage = 0;

    filteredDateRangeData.forEach(day => {
      Object.keys(day).forEach(key => {
        if (key !== 'date') {
          const value = roundMoney(day[key]);
          modelUsage[key] = (modelUsage[key] || 0) + value;
          totalUsage += value;
        }
      });
    });

    // Filter and sort models
    const filteredModels = Object.entries(modelUsage)
      .filter(([model, usage]) => {
        if (hideZeroUsage && usage === 0) return false;
        if (hideSmallUsage && usage < 1.00) return false;
        if (modelFilter && !model.toLowerCase().includes(modelFilter.toLowerCase())) return false;
        return true;
      })
      .sort(([, a], [, b]) => b - a);

    return { filteredModels, totalUsage };
  }, [filteredDateRangeData, modelFilter, hideZeroUsage, hideSmallUsage]);

  const handleViewChange = (viewType) => {
    setCurrentView(viewType);
  };

  const renderTableView = () => {
    const { filteredModels, totalUsage } = modelUsageData;

    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Model Name</th>
              <th>Total Usage</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {filteredModels.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No models match the current filters
                </td>
              </tr>
            ) : (
              filteredModels.map(([model, usage]) => {
                const percentage = totalUsage > 0 ? ((usage / totalUsage) * 100).toFixed(1) : '0.0';
                return (
                  <tr key={model}>
                    <td className="model-name">{model}</td>
                    <td className={`usage-amount ${usage === 0 ? 'zero' : ''}`}>
                      {formatMoney(usage)}
                    </td>
                    <td>{percentage}%</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderChartView = () => {
    const { filteredModels } = modelUsageData;
    
    if (currentView === 'bar') {
      return (
        <div className={`chart-container ${currentView === 'bar' ? 'active' : ''}`}>
          <ModelBarChart data={filteredModels} />
        </div>
      );
    } else if (currentView === 'pie') {
      return (
        <div className={`chart-container ${currentView === 'pie' ? 'active' : ''}`}>
          <ModelPieChart data={filteredModels} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="table-section">
      <div className="section-header">
        <h3>Model Usage Breakdown</h3>
        <div className="header-controls">
          <div className="filter-controls">
            <input
              type="text"
              className="filter-input"
              placeholder="Search models..."
              value={modelFilter}
              onChange={(e) => setModelFilter(e.target.value)}
            />
            <div className="filter-checkbox">
              <input
                type="checkbox"
                id="hideZeroUsage"
                checked={hideZeroUsage}
                onChange={(e) => setHideZeroUsage(e.target.checked)}
              />
              <label htmlFor="hideZeroUsage">Hide $0.00 usage</label>
            </div>
            <div className="filter-checkbox">
              <input
                type="checkbox"
                id="hideSmallUsage"
                checked={hideSmallUsage}
                onChange={(e) => setHideSmallUsage(e.target.checked)}
              />
              <label htmlFor="hideSmallUsage">Hide usage under $1.00</label>
            </div>
          </div>
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
            <button
              className={`view-toggle-btn ${currentView === 'pie' ? 'active' : ''}`}
              onClick={() => handleViewChange('pie')}
            >
              Pie Chart
            </button>
          </div>
        </div>
      </div>
      
      {currentView === 'table' ? renderTableView() : renderChartView()}
    </div>
  );
};

export default ModelUsageSection;