# Google Meet Timer Chrome Extension

A simple Chrome extension that displays a timer for your Google Meet sessions.

## Features

- Automatically detects when you join a Google Meet
- Shows elapsed time in HH:MM:SS format
- Positioned in the top-right corner of the meet window
- Lightweight and non-intrusive
- Works locally in your browser session

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top-right corner
3. Click "Load unpacked" and select this folder
4. The extension will be installed and ready to use

## How it works

The timer starts when you join a Google Meet (when the meeting interface loads) and stops when you leave. The timer is displayed as a small overlay in the top-right corner of the page.

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main logic for timer functionality
- `styles.css` - Styling for the timer display
- `README.md` - This file

## Privacy

This extension runs entirely locally in your browser and doesn't collect or transmit any data.