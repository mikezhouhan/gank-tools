// Main logic for the tab switch detector
class ScreenSwitchDetector {
    constructor() {
        this.isMonitoring = false;
        this.isPageVisible = true;
        this.switchCount = 0;
        this.sessionStartTime = null;
        this.lastSwitchTime = null;
        this.totalAwayTime = 0;
        this.longestAwayTime = 0;
        this.currentAwayStartTime = null;
        this.history = [];
        
        this.initializeElements();
        this.bindEvents();
        this.loadSettings();
        this.updateDisplay();
    }

    initializeElements() {
        // Cache DOM elements
        this.elements = {
            statusIndicator: document.getElementById('statusIndicator'),
            statusDot: document.getElementById('statusDot'),
            statusText: document.getElementById('statusText'),
            sessionTime: document.getElementById('sessionTime'),
            switchCount: document.getElementById('switchCount'),
            totalAwayTime: document.getElementById('totalAwayTime'),
            longestAwayTime: document.getElementById('longestAwayTime'),
            focusPercentage: document.getElementById('focusPercentage'),
            startBtn: document.getElementById('startBtn'),
            pauseBtn: document.getElementById('pauseBtn'),
            resetBtn: document.getElementById('resetBtn'),
            fullscreenBtn: document.getElementById('fullscreenBtn'),
            historyList: document.getElementById('historyList'),
            clearHistoryBtn: document.getElementById('clearHistoryBtn'),
            exportBtn: document.getElementById('exportBtn'),
            alertOverlay: document.getElementById('alertOverlay'),
            alertCloseBtn: document.getElementById('alertCloseBtn'),
            alertSound: document.getElementById('alertSound'),
            soundAlert: document.getElementById('soundAlert'),
            visualAlert: document.getElementById('visualAlert'),
            recordHistory: document.getElementById('recordHistory'),
            fullscreenDetection: document.getElementById('fullscreenDetection')
        };
    }

    bindEvents() {
        // Page visibility events
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
        
        // Window focus events
        window.addEventListener('focus', () => this.handleFocus());
        window.addEventListener('blur', () => this.handleBlur());
        
        // Fullscreen events
        document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
        
        // Button handlers
        this.elements.startBtn.addEventListener('click', () => this.startMonitoring());
        this.elements.pauseBtn.addEventListener('click', () => this.pauseMonitoring());
        this.elements.resetBtn.addEventListener('click', () => this.resetData());
        this.elements.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        this.elements.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        this.elements.exportBtn.addEventListener('click', () => this.exportData());
        this.elements.alertCloseBtn.addEventListener('click', () => this.closeAlert());
        
        // Persist settings when toggled
        Object.keys(this.elements).forEach(key => {
            if (key.includes('Alert') || key.includes('record') || key.includes('Detection')) {
                const element = this.elements[key];
                if (element && element.type === 'checkbox') {
                    element.addEventListener('change', () => this.saveSettings());
                }
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    handleVisibilityChange() {
        if (!this.isMonitoring) return;
        
        const isVisible = !document.hidden;
        if (isVisible !== this.isPageVisible) {
            this.isPageVisible = isVisible;
            
            if (isVisible) {
                this.handlePageReturn();
            } else {
                this.handlePageLeave();
            }
        }
    }

    handleFocus() {
        if (!this.isMonitoring) return;
        if (!this.isPageVisible) {
            this.isPageVisible = true;
            this.handlePageReturn();
        }
    }

    handleBlur() {
        if (!this.isMonitoring) return;
        if (this.isPageVisible) {
            this.isPageVisible = false;
            this.handlePageLeave();
        }
    }

    handlePageLeave() {
        this.currentAwayStartTime = Date.now();
        this.switchCount++;
        this.updateStatusDisplay(false);
        
        if (this.elements.visualAlert.checked) {
            this.showAlert();
        }
        
        if (this.elements.soundAlert.checked) {
            this.playAlertSound();
        }
    }

    handlePageReturn() {
        if (this.currentAwayStartTime) {
            const awayDuration = Date.now() - this.currentAwayStartTime;
            this.totalAwayTime += awayDuration;
            
            if (awayDuration > this.longestAwayTime) {
                this.longestAwayTime = awayDuration;
            }
            
            if (this.elements.recordHistory.checked) {
                this.addHistoryRecord(this.currentAwayStartTime, awayDuration);
            }
            
            this.currentAwayStartTime = null;
        }
        
        this.updateStatusDisplay(true);
        this.closeAlert();
    }

    handleFullscreenChange() {
        if (!this.elements.fullscreenDetection.checked) return;
        
        const isFullscreen = !!document.fullscreenElement;
        this.elements.fullscreenBtn.textContent = isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen';
    }

    handleKeydown(e) {
        // ESC exits fullscreen
        if (e.key === 'Escape' && document.fullscreenElement) {
            document.exitFullscreen();
        }
        
        // Space toggles monitoring
        if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            if (this.isMonitoring) {
                this.pauseMonitoring();
            } else {
                this.startMonitoring();
            }
        }
    }

    startMonitoring() {
        this.isMonitoring = true;
        this.sessionStartTime = Date.now();
        this.elements.startBtn.disabled = true;
        this.elements.pauseBtn.disabled = false;
        this.updateStatusDisplay(true);
        this.startSessionTimer();
    }

    pauseMonitoring() {
        this.isMonitoring = false;
        this.elements.startBtn.disabled = false;
        this.elements.pauseBtn.disabled = true;
        this.stopSessionTimer();
    }

    resetData() {
        if (confirm('Reset all data? This action cannot be undone.')) {
            this.switchCount = 0;
            this.totalAwayTime = 0;
            this.longestAwayTime = 0;
            this.sessionStartTime = null;
            this.currentAwayStartTime = null;
            this.history = [];
            this.pauseMonitoring();
            this.updateDisplay();
            this.updateHistoryDisplay();
        }
    }

    toggleFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }

    clearHistory() {
        if (confirm('Clear the entire history?')) {
            this.history = [];
            this.updateHistoryDisplay();
        }
    }

    exportData() {
        const data = {
            timestamp: new Date().toISOString(),
            statistics: {
                switchCount: this.switchCount,
                totalAwayTime: this.totalAwayTime,
                longestAwayTime: this.longestAwayTime,
                sessionDuration: this.sessionStartTime ? Date.now() - this.sessionStartTime : 0,
                focusPercentage: this.calculateFocusPercentage()
            },
            history: this.history
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `screen-switch-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    showAlert() {
        this.elements.alertOverlay.classList.add('show');
    }

    closeAlert() {
        this.elements.alertOverlay.classList.remove('show');
    }

    playAlertSound() {
        // Generate a quick tone as the alert sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            // Fallback to the bundled audio element
            this.elements.alertSound.currentTime = 0;
            this.elements.alertSound.play().catch(err => {
                console.log('Unable to play the alert sound:', err);
            });
        }
    }

    addHistoryRecord(timestamp, duration) {
        this.history.unshift({
            timestamp,
            duration,
            formattedTime: new Date(timestamp).toLocaleTimeString(),
            formattedDuration: this.formatTime(duration)
        });
        
        // Keep the history capped
        if (this.history.length > 100) {
            this.history = this.history.slice(0, 100);
        }
        
        this.updateHistoryDisplay();
    }

    updateStatusDisplay(isActive) {
        if (isActive) {
            this.elements.statusDot.classList.remove('away');
            this.elements.statusText.textContent = 'Page active';
        } else {
            this.elements.statusDot.classList.add('away');
            this.elements.statusText.textContent = 'Away from page';
        }
    }

    updateDisplay() {
        this.elements.switchCount.textContent = this.switchCount;
        this.elements.totalAwayTime.textContent = this.formatTime(this.totalAwayTime);
        this.elements.longestAwayTime.textContent = this.formatTime(this.longestAwayTime);
        this.elements.focusPercentage.textContent = this.calculateFocusPercentage() + '%';
    }

    updateHistoryDisplay() {
        if (this.history.length === 0) {
            this.elements.historyList.innerHTML = '<div class="history-empty">No focus switches recorded yet</div>';
            return;
        }
        
        const historyHTML = this.history.map(record => `
            <div class="history-item">
                <span class="history-time">${record.formattedTime}</span>
                <span class="history-duration">Away for ${record.formattedDuration}</span>
            </div>
        `).join('');
        
        this.elements.historyList.innerHTML = historyHTML;
    }

    startSessionTimer() {
        this.sessionTimer = setInterval(() => {
            if (this.sessionStartTime) {
                const sessionDuration = Date.now() - this.sessionStartTime;
                this.elements.sessionTime.textContent = this.formatTime(sessionDuration);
                this.updateDisplay();
            }
        }, 1000);
    }

    stopSessionTimer() {
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
            this.sessionTimer = null;
        }
    }

    calculateFocusPercentage() {
        if (!this.sessionStartTime) return 100;
        
        const sessionDuration = Date.now() - this.sessionStartTime;
        const currentAwayTime = this.currentAwayStartTime ? Date.now() - this.currentAwayStartTime : 0;
        const totalAway = this.totalAwayTime + currentAwayTime;
        
        if (sessionDuration === 0) return 100;
        
        const focusTime = sessionDuration - totalAway;
        return Math.max(0, Math.round((focusTime / sessionDuration) * 100));
    }

    formatTime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
        } else {
            return `${minutes.toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
        }
    }

    saveSettings() {
        const settings = {
            soundAlert: this.elements.soundAlert.checked,
            visualAlert: this.elements.visualAlert.checked,
            recordHistory: this.elements.recordHistory.checked,
            fullscreenDetection: this.elements.fullscreenDetection.checked
        };
        
        localStorage.setItem('screenSwitchDetectorSettings', JSON.stringify(settings));
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('screenSwitchDetectorSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            this.elements.soundAlert.checked = settings.soundAlert || false;
            this.elements.visualAlert.checked = settings.visualAlert !== false;
            this.elements.recordHistory.checked = settings.recordHistory !== false;
            this.elements.fullscreenDetection.checked = settings.fullscreenDetection || false;
        }
    }
}

// Boot the app
document.addEventListener('DOMContentLoaded', () => {
    new ScreenSwitchDetector();
});
