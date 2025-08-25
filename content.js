class GoogleMeetTimer {
  constructor() {
    this.startTime = null;
    this.timerElement = null;
    this.timerInterval = null;
    this.isInMeeting = false;
    
    this.init();
  }

  init() {
    this.createTimerElement();
    this.detectMeetingState();
    this.observePageChanges();
  }

  createTimerElement() {
    this.timerElement = document.createElement('div');
    this.timerElement.id = 'google-meet-timer';
    this.timerElement.innerHTML = `
      <div class="timer-content">
        <span class="timer-icon">⏱️</span>
        <span class="timer-text">00:00:00</span>
      </div>
    `;
    document.body.appendChild(this.timerElement);
  }

  detectMeetingState() {
    const checkMeetingState = () => {
      const meetingContainer = document.querySelector('[data-meeting-id]') || 
                             document.querySelector('[jscontroller][data-unresolved-meeting-id]') ||
                             document.querySelector('div[role="main"]');
      
      const isCurrentlyInMeeting = !!meetingContainer && window.location.pathname.includes('/') && 
                                  window.location.pathname.length > 1;

      if (isCurrentlyInMeeting && !this.isInMeeting) {
        this.startTimer();
      } else if (!isCurrentlyInMeeting && this.isInMeeting) {
        this.stopTimer();
      }
    };

    checkMeetingState();
    setInterval(checkMeetingState, 1000);
  }

  startTimer() {
    if (this.isInMeeting) return;
    
    this.isInMeeting = true;
    this.startTime = Date.now();
    this.timerElement.style.display = 'block';
    
    this.timerInterval = setInterval(() => {
      this.updateTimerDisplay();
    }, 1000);
    
    this.updateTimerDisplay();
  }

  stopTimer() {
    this.isInMeeting = false;
    this.timerElement.style.display = 'none';
    
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateTimerDisplay() {
    if (!this.startTime) return;

    const elapsed = Date.now() - this.startTime;
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const displayHours = hours.toString().padStart(2, '0');
    const displayMinutes = (minutes % 60).toString().padStart(2, '0');
    const displaySeconds = (seconds % 60).toString().padStart(2, '0');

    const timerText = this.timerElement.querySelector('.timer-text');
    if (timerText) {
      timerText.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;
    }
  }

  observePageChanges() {
    const observer = new MutationObserver(() => {
      this.detectMeetingState();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    window.addEventListener('popstate', () => {
      setTimeout(() => this.detectMeetingState(), 500);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new GoogleMeetTimer();
  });
} else {
  new GoogleMeetTimer();
}