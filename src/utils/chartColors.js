// Chart color utility that adapts to themes
export const getChartColors = (theme = 'onedark') => {
  const themes = {
    onedark: {
      primary: '#61afef',
      success: '#98c379',
      warning: '#e5c07b',
      danger: '#e06c75',
      info: '#56b6c2',
      purple: '#c678dd',
      background: '#21252b',
      secondary: '#282c34',
      border: '#3e4451',
      text: '#abb2bf',
      textSecondary: '#5c6370'
    },
    light: {
      primary: '#007bff',
      success: '#28a745',
      warning: '#ffc107',
      danger: '#dc3545',
      info: '#17a2b8',
      purple: '#6f42c1',
      background: '#ffffff',
      secondary: '#f8f9fa',
      border: '#dee2e6',
      text: '#212529',
      textSecondary: '#6c757d'
    },
    gruvbox: {
      primary: '#83a598',
      success: '#b8bb26',
      warning: '#fabd2f',
      danger: '#fb4934',
      info: '#8ec07c',
      purple: '#d3869b',
      background: '#282828',
      secondary: '#3c3836',
      border: '#665c54',
      text: '#ebdbb2',
      textSecondary: '#a89984'
    }
  };

  const colors = themes[theme] || themes.onedark;

  let palette;
  
  if (theme === 'light') {
    palette = [
      colors.primary,
      colors.success,
      colors.warning,
      colors.danger,
      colors.info,
      colors.purple,
      '#fd7e14', // orange
      '#20c997', // teal
      '#e83e8c', // pink
      '#6610f2'  // indigo
    ];
  } else if (theme === 'gruvbox') {
    palette = [
      colors.primary,
      colors.success,
      colors.warning,
      colors.danger,
      colors.info,
      colors.purple,
      '#fe8019', // orange
      '#689d6a', // aqua
      '#cc241d', // dark red
      '#458588'  // dark blue
    ];
  } else {
    // onedark
    palette = [
      colors.primary,
      colors.success,
      colors.warning,
      colors.danger,
      colors.info,
      colors.purple,
      '#d19a66',
      '#56b6c2',
      '#be5046',
      '#4078f2'
    ];
  }

  return {
    ...colors,
    palette
  };
};

// Get CSS variable value for dynamic theme detection
export const getCurrentTheme = () => {
  const bodyClass = document.body.className;
  if (bodyClass.includes('theme-light')) return 'light';
  return 'onedark';
};

// Chart.js default configuration updater
export const updateChartDefaults = (theme) => {
  const colors = getChartColors(theme);
  
  // Update Chart.js defaults
  if (typeof window !== 'undefined' && window.Chart) {
    window.Chart.defaults.color = colors.text;
    window.Chart.defaults.borderColor = colors.border;
    window.Chart.defaults.backgroundColor = colors.background;
  }
};