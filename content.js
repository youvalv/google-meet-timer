class GoogleMeetTimer {
  constructor() {
    this.startTime = null;
    this.timerElement = null;
    this.timerInterval = null;
    this.isInMeeting = false;
    this.isDragging = false;
    this.dragOffset = { x: 0, y: 0 };
    
    this.init();
  }

  init() {
    this.createTimerElement();
    this.setupDragFunctionality();
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

  setupDragFunctionality() {
    let startX, startY, initialX, initialY;

    this.timerElement.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // Only left mouse button
      
      this.isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      
      // Get current position
      const rect = this.timerElement.getBoundingClientRect();
      initialX = rect.left;
      initialY = rect.top;
      
      // Prevent text selection during drag
      e.preventDefault();
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      
      e.preventDefault();
      
      // Calculate new position
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      const newX = initialX + deltaX;
      const newY = initialY + deltaY;
      
      // Set position using left/top instead of transform
      this.timerElement.style.transform = 'none';
      this.timerElement.style.left = `${newX}px`;
      this.timerElement.style.top = `${newY}px`;
    });

    document.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        document.body.style.userSelect = '';
      }
    });

    // Handle touch events for mobile
    this.timerElement.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return;
      
      const touch = e.touches[0];
      this.isDragging = true;
      startX = touch.clientX;
      startY = touch.clientY;
      
      const rect = this.timerElement.getBoundingClientRect();
      initialX = rect.left;
      initialY = rect.top;
      
      e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      
      e.preventDefault();
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      
      const newX = initialX + deltaX;
      const newY = initialY + deltaY;
      
      this.timerElement.style.transform = 'none';
      this.timerElement.style.left = `${newX}px`;
      this.timerElement.style.top = `${newY}px`;
    });

    document.addEventListener('touchend', () => {
      this.isDragging = false;
    });
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