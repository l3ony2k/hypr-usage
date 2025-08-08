# HyprLab Usage Dashboard (React Version)

A modern React-based dashboard for monitoring your HyprLab API usage and costs.

## Features

- **Real-time Usage Tracking**: Monitor your API usage across different models and services
- **Cost Breakdown**: Detailed breakdown of costs by model, date, and usage type
- **Interactive Charts**: Visualize your usage patterns with bar charts and pie charts
- **Date Range Filtering**: Filter data by custom date ranges or quick presets
- **Model Filtering**: Search and filter models, hide zero usage or small amounts
- **Caching**: Intelligent caching system to reduce API calls and improve performance
- **Responsive Design**: Works on desktop and mobile devices
- **OneDark Theme**: Beautiful dark theme optimized for developers
- **React Components**: Modern component-based architecture

## Screenshots

![Dashboard Screenshot](screenshot.png)

## Quick Start

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd hyprlab-usage-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment (optional)**:
   - Copy `.env.example` to `.env`
   - Modify `REACT_APP_API_BASE_URL` if needed (defaults to https://api.hyprlab.io/v1)

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Access the dashboard**:
   - Open your browser and go to `http://localhost:3000`
   - Enter your HyprLab API key when prompted

## Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# API Configuration
REACT_APP_API_BASE_URL=https://api.hyprlab.io/v1
```

### Configuration Options

- `REACT_APP_API_BASE_URL`: API base URL (default: https://api.hyprlab.io/v1)

**Note**: Your API key is stored securely in your browser's localStorage and never sent to any server other than HyprLab's API.

## Usage

### Dashboard Overview

The dashboard provides several key sections:

1. **User Information**: Shows your Discord name, ID, and remaining credits
2. **Usage Statistics**: Overview cards showing usage by category (prompt, completion, images, etc.)
3. **Date Controls**: Filter data by date ranges or use quick presets
4. **Model Usage Breakdown**: Detailed table and charts showing usage by AI model
5. **Daily Usage Breakdown**: Daily usage patterns and trends

### Features

#### Authentication
- **Secure Login**: Enter your HyprLab API key through a secure login form
- **Local Storage**: API key is stored in browser localStorage for convenience
- **Auto-logout**: Automatically logs out on API authentication errors

#### Date Filtering
- **Quick Presets**: Yesterday, 7 days, 14 days, 30 days, 90 days
- **Custom Range**: Select specific start and end dates
- **Real-time Updates**: All charts and tables update automatically when date range changes

#### Model Usage Analysis
- **Table View**: Sortable table with model names, usage amounts, and percentages
- **Bar Chart**: Visual representation of top models by usage
- **Pie Chart**: Proportional view of model usage distribution
- **Filtering Options**:
  - Search models by name
  - Hide models with $0.00 usage
  - Hide models with usage under $1.00

#### Daily Usage Tracking
- **Table View**: Daily breakdown showing usage by date and top models
- **Bar Chart**: Daily usage trends over time
- **Totals**: Daily and overall totals for easy tracking

#### Caching System
- **Automatic Caching**: API responses are cached for 30 minutes by default
- **Manual Refresh**: Force refresh data with the "Refresh Data" button
- **Persistent Cache**: Cache persists across browser sessions

## API Integration

The dashboard integrates directly with the HyprLab API to fetch:

- **User Information** (`/v1/info`): Discord details and credit balance
- **Usage Data** (`/v1/usage`): Detailed usage breakdown by model and date

### Authentication

The dashboard uses Bearer token authentication with your HyprLab API key. The key is stored securely in browser localStorage and included in all API requests.

## Development

### Project Structure

```
hyprlab-usage-dashboard/
├── public/
│   └── index.html           # HTML template
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.js     # Main dashboard
│   │   ├── Login.js         # Login form
│   │   ├── Header.js        # User info header
│   │   ├── Controls.js      # Date controls
│   │   ├── StatsGrid.js     # Usage statistics
│   │   ├── ModelUsageSection.js  # Model usage breakdown
│   │   ├── DailyUsageSection.js  # Daily usage breakdown
│   │   └── charts/          # Chart components
│   │       ├── ModelBarChart.js
│   │       ├── ModelPieChart.js
│   │       └── DailyBarChart.js
│   ├── services/            # API and auth services
│   │   ├── api.js           # API client and caching
│   │   └── auth.js          # Authentication utilities
│   ├── App.js               # Main app component
│   ├── index.js             # App entry point
│   └── index.css            # Global styles
├── package.json             # Dependencies and scripts
└── cache/                   # Cache directory (preserved)
    ├── info.json            # Cached user info
    └── usage.json           # Cached usage data
```

### Available Scripts

- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm eject`: Eject from Create React App

### Adding Features

The dashboard is built with modern React patterns:

- **Functional Components**: All components use React hooks
- **Custom Hooks**: Reusable logic for data fetching and state management
- **Context API**: For global state management (if needed)
- **Chart.js Integration**: Using react-chartjs-2 for visualizations
- **Axios**: For HTTP requests with interceptors

### Customization

#### Themes
The dashboard uses CSS custom properties for theming. You can customize colors by modifying the `:root` variables in `src/index.css`.

#### Charts
Charts are built with Chart.js and react-chartjs-2. You can customize chart appearance by modifying the chart configuration in the chart components.

## Building for Production

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Serve the built files**:
   ```bash
   # Using serve (install with: npm install -g serve)
   serve -s build
   
   # Or using any static file server
   ```

3. **Deploy**:
   The built files in the `build/` directory can be deployed to any static hosting service like Netlify, Vercel, GitHub Pages, etc.

## Troubleshooting

### Common Issues

1. **API Key Issues**:
   - Ensure your API key is valid and has the necessary permissions
   - Try logging out and logging back in with a fresh API key

2. **Connection Issues**:
   - Verify the API base URL is correct in your `.env` file
   - Check your internet connection
   - Ensure the HyprLab API is accessible

3. **Cache Issues**:
   - Clear browser localStorage to reset cache
   - Use the "Refresh Data" button to force fresh data

4. **Build Issues**:
   - Delete `node_modules` and run `npm install` again
   - Clear npm cache with `npm cache clean --force`

### Error Messages

- **"API key is missing or invalid"**: Check your API key and try logging in again
- **"Failed to fetch data"**: Network or API connectivity issue
- **"No data available"**: Your account may not have usage data for the selected period

## Migration from Python Version

If you're migrating from the Python/Flask version:

1. **Cache Preservation**: Your existing cache files in the `cache/` directory will continue to work
2. **API Key**: You'll need to re-enter your API key through the new login form
3. **Configuration**: Update your environment variables to use `REACT_APP_` prefix
4. **Dependencies**: Remove Python dependencies and install Node.js dependencies

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For issues related to:
- **Dashboard functionality**: Create an issue in this repository
- **HyprLab API**: Contact HyprLab support
- **API access or billing**: Check your HyprLab account dashboard