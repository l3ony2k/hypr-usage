import React, { useState, useEffect } from 'react';
import Header from './Header';
import Controls from './Controls';
import StatsGrid from './StatsGrid';
import ModelUsageSection from './ModelUsageSection';
import DailyUsageSection from './DailyUsageSection';
import { fetchUserInfo, fetchUsageData, refreshAllData } from '../services/api';
import { removeApiKey } from '../services/auth';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [usageData, setUsageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
    quickRange: 7
  });

  useEffect(() => {
    loadData();
    initializeDateRange();
  }, []);

  const initializeDateRange = () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);

    setDateRange({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      quickRange: 7
    });
  };

  const loadData = async (forceRefresh = false) => {
    try {
      setError(null);
      if (forceRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const [userInfoData, usageDataResult] = await Promise.all([
        fetchUserInfo(forceRefresh),
        fetchUsageData(forceRefresh)
      ]);

      setUserInfo(userInfoData);
      setUsageData(usageDataResult);
    } catch (error) {
      console.error('Error loading data:', error);
      setError(error.message);
      
      // If it's an auth error, logout
      if (error.message.includes('401') || error.message.includes('unauthorized')) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    loadData(true);
  };

  const handleLogout = () => {
    removeApiKey();
    onLogout();
  };

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  if (isLoading) {
    return <div className="loading">Loading your HyprLab usage data...</div>;
  }

  if (error) {
    return (
      <div className="error">
        Failed to load data: {error}
        <br />
        <button onClick={() => loadData()} style={{ marginTop: '10px' }}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header userInfo={userInfo} />
      
      <Controls
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onLogout={handleLogout}
      />
      
      <StatsGrid userInfo={userInfo} />
      
      <ModelUsageSection 
        usageData={usageData} 
        dateRange={dateRange}
      />
      
      <DailyUsageSection 
        usageData={usageData} 
        dateRange={dateRange}
      />
    </div>
  );
};

export default Dashboard;