#!/bin/bash

# Create a zip file of the extension
echo "Packaging Google Meet Timer extension..."

# Remove any existing package
rm -f google-meet-timer.zip

# Create zip file with extension files
zip -r google-meet-timer.zip \
  manifest.json \
  content.js \
  styles.css \
  README.md \
  icon16.png \
  icon48.png \
  icon128.png

echo "Extension packaged as google-meet-timer.zip"
echo ""
echo "To install:"
echo "1. Go to chrome://extensions/"
echo "2. Enable Developer mode"
echo "3. Click 'Load unpacked' and select this folder"
echo ""
echo "Note: For distribution, upload the zip to Chrome Web Store"
echo "Chrome no longer allows direct CRX installation for security reasons."