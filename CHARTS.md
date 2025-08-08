# Chart Visualization Guide

The HyprLab Usage Dashboard now includes interactive charts powered by Chart.js, perfectly themed to match the OneDark color scheme.

## Available Chart Types

### Model Usage Breakdown
- **Table View** - Traditional table with model names, usage amounts, and percentages
- **Bar Chart** - Horizontal comparison of model usage amounts (top 20 models)
- **Pie Chart** - Proportional breakdown showing usage distribution (top 10 models)

### Daily Usage Breakdown
- **Table View** - Daily usage across different models in tabular format
- **Bar Chart** - Time series showing daily total usage over the selected date range

## Chart Features

### OneDark Theme Integration
- **Background**: Dark theme matching the dashboard
- **Colors**: Uses the same color palette as the rest of the interface
- **Text**: Consistent typography and colors
- **Borders**: Subtle borders matching the theme

### Interactive Elements
- **Tooltips**: Hover over chart elements for detailed information
- **Legends**: Click legend items to show/hide data (pie chart)
- **Responsive**: Charts automatically resize for different screen sizes

### Data Filtering
Charts automatically update when you:
- Change date ranges
- Apply model filters
- Toggle usage amount filters
- Search for specific models

## Color Palette

The charts use the OneDark color scheme:
- **Primary Blue**: `#61afef` - Main accent color
- **Success Green**: `#98c379` - Positive values
- **Warning Yellow**: `#e5c07b` - Highlights
- **Danger Red**: `#e06c75` - Important data
- **Info Cyan**: `#56b6c2` - Secondary information
- **Purple**: `#c678dd` - Special elements

## Performance Considerations

- **Model limits**: Bar charts show top 20 models, pie charts show top 10
- **Responsive rendering**: Charts are optimized for different screen sizes
- **Memory management**: Previous chart instances are properly destroyed when switching views
- **Real-time updates**: Charts update efficiently when data changes

## Usage Tips

1. **Switch between views** using the toggle buttons above each section
2. **Use filters** to focus on specific models or time periods
3. **Hover over chart elements** for detailed tooltips
4. **Resize your browser** to see responsive chart behavior
5. **Use date range controls** to analyze different time periods

## Technical Details

- **Library**: Chart.js 4.4.0 (loaded via CDN)
- **Chart types**: Bar charts and pie charts
- **Responsive**: Uses Chart.js responsive features
- **Theme**: Custom OneDark configuration
- **Performance**: Optimized for datasets with many models and date ranges