class Clock {
  constructor() {
    // Initialize DOM elements in the constructor
    this.hours = document.getElementById('hours');
    this.minutes = document.getElementById('minutes');
    this.seconds = document.getElementById('seconds');
    this.ampm = document.getElementById('ampm');
    this.week = document.getElementById('weekday');
    this.alarmButton = document.querySelector('.alarm-button'); 

    // digits time indicator
    this.hh = document.getElementById('hh');
    this.mm = document.getElementById('mm');
    this.ss = document.getElementById('ss');

    // dot time indicator
    this.dotH = document.querySelector('.h_dot');
    this.dotM = document.querySelector('.m_dot');
    this.dotS = document.querySelector('.s_dot');

    this.days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    // Start the clock
    this.updateTime();
    setInterval(() => this.updateTime(), 1000); // Update time every second

    // Initialize event listeners
    this.initialize();

  }

  initialize() { // Method for all event listeners
    this.addAlarmListener();
  }


  // Update the time
  updateTime() {
    const date = new Date();
    this.h = date.getHours();  // Get hours in 24-hour format (0-23)
    this.m = date.getMinutes();  // Get minutes
    this.s = date.getSeconds();  // Get seconds
    this.ap = this.h >= 12 ? 'PM' : 'AM';  // For 12-hour format AM/PM
    this.wd = this.days[date.getDay()];

    this.padZero();     // Pad single-digit numbers with a 0
    this.updateUI();    // Update the user interface
    this.circular_Time_Indicators(); // Update SVG circles
    this.Dot_Time_Position_Indicators(); // Rotate the dots
  }

  // Pad numbers to ensure they have two digits
  padZero() {
    this.h = this.h < 10 ? '0' + this.h : this.h.toString();  // Ensure hour is a string and pad with zero if needed
    this.m = this.m < 10 ? '0' + this.m : this.m.toString();  // Pad minute with zero if needed
    this.s = this.s < 10 ? '0' + this.s : this.s.toString();  // Pad second with zero if needed
  }  

  // Update the user interface (HTML)
  updateUI() {
    this.hours.innerHTML = `${this.h}  <br> <span><b> Hours </b></span>`;
    this.minutes.innerHTML = `${this.m} <br> <span><b> Minutes </b></span>`;
    this.seconds.innerHTML = `${this.s} <br> <span><b> Seconds </b></span>`;
    this.ampm.innerHTML = this.ap; // You can display AM/PM for reference, but it's 24-hour time
    this.week.innerHTML = this.wd;
  }

  // Circular SVG Time Indicators (assuming based on 24-hour, 60 minutes, and 60 seconds)
  circular_Time_Indicators() {
    this.hh.style.strokeDashoffset = 440 - (440 * this.h) / 24;
    this.mm.style.strokeDashoffset = 440 - (440 * this.m) / 60;
    this.ss.style.strokeDashoffset = 440 - (440 * this.s) / 60;
  }

  // Rotating dots for hour, minute, second indicators
  Dot_Time_Position_Indicators() {
    this.dotH.style.transform = `rotate(${this.h * 15}deg)`; // 360 / 24 = 15 degrees per hour
    this.dotM.style.transform = `rotate(${this.m * 6}deg)`;  // Same for minutes (60 steps)
    this.dotS.style.transform = `rotate(${this.s * 6}deg)`;  // Same for seconds (60 steps)
  }

   //new feature Add event listener for the alarm button
   addAlarmListener() {
    if (this.alarmButton) {
      this.alarmButton.addEventListener("click", () => this.addAlarm());
    }
  }

  addAlarm(){/*
    const container = document.querySelector(".display-alarm-set");
    const formcontainer = document.createElement('div')
    formcontainer.classList.add("content");

    const form = document.createElement('form'); */
    alert('im working on it hang tight!')

  
  }
  
  // for debugging purposes 
  displayTime() {
    const formattedTime = `${this.h}:${this.m}:${this.s} ${this.ap}`;
    console.log(`Current time: ${formattedTime} on ${this.wd}`);
    }

}

const alarm = new Clock();
alarm.displayTime();

  


