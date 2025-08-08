#!/usr/bin/env node

// Simple start script for Bun compatibility
const { spawn } = require('child_process');

const env = {
    ...process.env,
    GENERATE_SOURCEMAP: 'false',
    DANGEROUSLY_DISABLE_HOST_CHECK: 'true',
    REACT_APP_API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://api.hyprlab.io/v1'
};

const child = spawn('react-scripts', ['start'], {
    stdio: 'inherit',
    env: env
});

child.on('close', (code) => {
    process.exit(code);
});