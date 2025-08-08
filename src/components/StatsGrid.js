import React from 'react';

const StatsGrid = ({ userInfo }) => {
  if (!userInfo || !userInfo.usage) return null;

  const stats = [
    {
      title: 'Prompt Usage',
      value: userInfo.usage.prompt_usage || '$0.00',
      label: 'Text Generation',
      className: 'prompt-usage'
    },
    {
      title: 'Completion Usage',
      value: userInfo.usage.completion_usage || '$0.00',
      label: 'Response Generation',
      className: 'completion-usage'
    },
    {
      title: 'Images Usage',
      value: userInfo.usage.images_usage || '$0.00',
      label: 'Image Generation',
      className: 'images-usage'
    },
    {
      title: 'Video Usage',
      value: userInfo.usage.video_usage || '$0.00',
      label: 'Video Generation',
      className: 'video-usage'
    },
    {
      title: 'Audio Usage',
      value: userInfo.usage.audio_usage || '$0.00',
      label: 'Audio Processing',
      className: 'audio-usage'
    },
    {
      title: 'Total Usage',
      value: userInfo.usage.total_usage || '$0.00',
      label: 'All Services',
      className: 'usage-total'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <h3>{stat.title}</h3>
          <div className={`stat-value ${stat.className}`}>
            {stat.value}
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;