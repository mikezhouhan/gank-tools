# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chinese-language web-based monitoring tools collection called "gank-tools" (Gank工具). The repository contains browser-based utilities for testing and detection purposes in educational/interview environments, specifically for ensuring compatibility with interview platforms like GankInterview.

## Project Structure

The codebase is organized into functional modules:

- `screen_switch_detection/` - Screen focus monitoring tool with comprehensive analytics
- `video_detection/` - Screen sharing demonstration and testing tool
- `keyboard_detection/` - Real-time keyboard event capture and analysis tool
- `index.html` - Main navigation page with tool directory

Each module is completely self-contained with embedded HTML, CSS, and JavaScript.

## Architecture Notes

### Screen Switch Detection Module
- **Main Class**: `ScreenSwitchDetector` - ES6 class-based architecture
- **Event-Driven**: Uses browser visibility API, focus/blur events, and fullscreen detection
- **Data Persistence**: Uses localStorage for settings, supports JSON export
- **Real-time Updates**: Interval-based session timer and statistics calculation
- **Audio Generation**: Web Audio API with fallback to HTML audio elements

### Video Detection Module  
- **Main Class**: `ScreenShareDemo` - WebRTC screen capture implementation
- **Media Constraints**: Configurable resolution (1920x1080), framerate (30fps), audio settings
- **Error Handling**: Comprehensive error categorization and user feedback
- **Browser Compatibility**: Feature detection with graceful degradation

### Keyboard Detection Module
- **Event System**: Captures keydown, keyup, and keypress events at both input and document levels
- **Real-time Stats**: Live event counting, timing analysis, and key visualization
- **Configuration**: Toggleable event types, behavior controls (preventDefault, stopPropagation)
- **Export Functionality**: JSON export of complete event history with metadata

## Development Guidelines

### File Organization
- Each tool is completely self-contained in its own directory
- No external dependencies or build process required
- All assets (styles, scripts) are embedded or co-located

### Code Style
- Chinese language used for user-facing text and comments
- Modern JavaScript features (ES6+ classes, async/await, arrow functions)
- CSS uses flexbox/grid for layouts with responsive design
- Event-driven architecture with proper cleanup

### Browser APIs Used
- Page Visibility API (`document.visibilitychange`)
- Fullscreen API (`requestFullscreen`, `exitFullscreen`) 
- Web Audio API for sound generation
- WebRTC GetDisplayMedia API for screen capture
- KeyboardEvent API (keydown, keyup, keypress events)
- LocalStorage for data persistence
- Blob API for file downloads/exports

## Development Commands

### Local Development
```bash
# Serve using any HTTP server
python -m http.server 8000        # Python
npx http-server                   # Node.js
php -S localhost:8000             # PHP

# Access at http://localhost:8000
```

### Testing and Validation
- Test directly by opening HTML files in browsers (Chrome, Firefox, Edge, Safari)
- Validate fullscreen functionality and permission handling
- Verify audio/video permissions and WebRTC compatibility
- Test keyboard event capture across different input contexts
- Validate data export/import functionality

## Important Security Considerations

These tools access sensitive browser APIs and require explicit user permissions:
- Screen sharing requires explicit user permission via WebRTC getDisplayMedia
- Audio generation may require user interaction (autoplay policies)
- Fullscreen API requires user gesture activation
- Keyboard event capture operates at document and input element levels
- LocalStorage data persists across sessions

All tools are designed for educational/testing purposes and include clear user consent workflows. The purpose is to help users test compatibility with interview platforms before actual interviews.