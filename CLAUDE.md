# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chinese-language web-based monitoring tools collection called "gank-tools" (Gank工具). The repository contains browser-based utilities for monitoring and detection purposes, primarily focused on educational or testing environments.

## Project Structure

The codebase is organized into functional modules:

- `screen_switch_detection/` - Screen focus monitoring tool with comprehensive analytics
- `video_detection/` - Screen sharing demonstration and testing tool

Each module is self-contained with its own HTML, CSS, and JavaScript files.

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
- LocalStorage for data persistence

## Testing and Validation

Since these are browser-based tools:
- Test directly by opening HTML files in browsers
- Validate across Chrome, Firefox, Edge for compatibility
- Test fullscreen functionality and permission handling
- Verify audio/video permissions and fallback behavior

## Important Security Considerations

These tools access sensitive browser APIs:
- Screen sharing requires explicit user permission
- Audio generation may require user interaction (autoplay policies)
- Fullscreen API requires user gesture activation
- LocalStorage data persists across sessions

Always ensure user consent and clear indication of monitoring activities when deploying these tools.