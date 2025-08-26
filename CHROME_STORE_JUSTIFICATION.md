# Chrome Web Store Permission Justification

## Host Permission Justification

**Requested Host**: `https://meet.google.com/*`

**Purpose**: The Google Meet Timer extension requires access to Google Meet pages to provide meeting timer functionality exclusively on Google's video conferencing platform.

**Usage**: This host permission enables the extension to:
- Automatically detect when users enter Google Meet rooms
- Inject the timer overlay into Google Meet pages
- Start timing from the moment users join a meeting
- Provide real-time elapsed time display during meetings
- Stop timing when users leave the meeting room
- Allow users to drag and reposition the timer within the meeting interface

**Scope Limitation**: The permission is intentionally restricted to only Google Meet domains (`meet.google.com`), ensuring the extension cannot access any other websites or user data outside of Google Meet sessions.

**User Privacy**: No data is collected, stored, or transmitted. The timer operates entirely within the user's browser session and resets when leaving meetings.

**Implementation**: The extension uses a content script that automatically runs only on Google Meet pages, providing seamless integration without requiring user interaction or additional permissions.

## No Additional Permissions Required

This extension does not request any additional permissions beyond the host permission for Google Meet pages. It operates with minimal privileges and maximum privacy protection.