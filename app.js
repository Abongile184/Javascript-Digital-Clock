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

    //for the  createAlarm() method:
    // Store references to DOM elements as instance variables
    this.modal = document.getElementById("alarmModal");
    this.clock = document.getElementById("time");
    this.alarmButton = document.querySelector(".alarm-button img");
    this.closeModal = document.querySelector(".close");
    this.selectMenu = document.querySelectorAll('select');
    this.setAlarmBtn = document.querySelector('button');
    this.displayAlarm = document.querySelector('.show-alarm-set');
    this.alarmTime = null;
    this.ringtone = new Audio('./audio/nice-wake-up-alarm.mp3'); 
    this.currentTime;
    this.alarmTriggered = false;

    // Start the clock
    this.updateTime();
    setInterval(() => this.updateTime(), 1000); // Update time every second

    // Initialize event listeners
    this.initialize();

  }

  initialize() { // Method for all event listeners
    this.addAlarmListener();
    this.addSetAlarmListener(); // For setting the alarm
  }


  // Update the time
  updateTime() {
    const date = new Date();
    this.month = date.getMonth();
    this.h = date.getHours();  // Get hours in 24-hour format (0-23)
    this.m = date.getMinutes();  // Get minutes
    this.s = date.getSeconds();  // Get seconds
    this.ap = this.h >= 12 ? 'PM' : 'AM';  // For 12-hour format AM/PM
    this.wd = this.days[date.getDay()];

    this.padZero();     // Pad single-digit numbers with a 0
    this.updateUI();    // Update the user interface
    this.circular_Time_Indicators(); // Update SVG circles
    this.Dot_Time_Position_Indicators(); // Rotate the dots
    this.currentTime = `${this.h}:${this.m} ${this.ap}`;
    
    // Check if alarm time matches and if the checkbox is checked
    if (this.alarmTime === this.currentTime && this.alarmCheckbox.checked && !this.alarmTriggered) {
      this.ringtone.play();
      this.ringtone.loop = true;
      this.alarmTriggered = true; // Prevent retriggering within the same second
      }
      
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
      this.alarmButton.addEventListener("click", () => this.createAlarm());
    }}
    
  addSetAlarmListener() {
    if (this.setAlarmBtn) {
      this.setAlarmBtn.addEventListener("click", () => this.createAlarm());}
    }

  //press alarm button
  createAlarm() {

    //A:  generate select values 
    const generate_optionValues = () => {
      for (let i = 0; i < 24; i++) {
        let hour = i < 10 ? '0' + i : i;
        let option = `<option value="${hour}">${hour}</option>`;
        this.selectMenu[0].firstElementChild.insertAdjacentHTML('afterend', option);}

      for (let i = 0; i < 60; i++) {
        let minute = i < 10 ? '0' + i : i;
        let option = `<option value="${minute}">${minute}</option>`;
        this.selectMenu[1].firstElementChild.insertAdjacentHTML('afterend', option);}

      ['AM', 'PM'].forEach(ampm => {
        let option = `<option value="${ampm}">${ampm}</option>`;
        this.selectMenu[2].firstElementChild.insertAdjacentHTML('afterend', option);
      }); 
    };

    //B: prevent alarm button from duplicating select values when button is pressed twice
    if (this.selectMenu[0].options.length === 1 && 
      this.selectMenu[1].options.length === 1 && 
      this.selectMenu[2].options.length === 1) {
        generate_optionValues();
      }
      
    //c: click the button on the model to add an alarm
    this.setAlarmBtn.onclick = () => {
      //let time = `${this.selectMenu[0].value}:${this.selectMenu[1].value} ${this.selectMenu[2].value}`;
      
      let hour = this.selectMenu[0].value; // Get selected hour
      let minute = this.selectMenu[1].value; // Get selected minute
      let ampm = this.selectMenu[2].value; // Get selected AM/PM
      
      let time = `${hour}:${minute} ${ampm}`;
    
      // Validate if all values are selected properly
      if (hour === 'Hour' || minute === 'Minute' || ampm === 'AM/PM') {
        return alert("Please, select a valid time to set an alarm!");
      }
    
      // Validate if the AM/PM selection is valid for the selected hour
      if ((ampm === "AM" && parseInt(hour) >= 12) || (ampm === "PM" && parseInt(hour) < 12)) {
        return alert("Invalid time! Please ensure AM/PM matches with the selected hour.");
      }
    

      this.alarmTime = time;

      //DOM for creating an alarm instance
      this.alarmDiv = document.createElement("div");
      this.alarmDiv.classList.add('alarm-instance');

      this.alarmCheckbox = document.createElement("input");
      this.labelCheckbox = document.createElement("label");
      this.deleteBtn = document.createElement("button");

      this.alarmCheckbox.setAttribute('type', 'checkbox');
      this.alarmCheckbox.setAttribute('id', 'toggle');
      this.alarmCheckbox.setAttribute('class', 'checkbox');

      this.deleteBtn.setAttribute('class', 'delete');
      this.deleteBtn.setAttribute('title', 'delete alarm');
      this.deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

      this.labelCheckbox.htmlFor = "toggle"; 
      this.labelCheckbox.setAttribute('class', 'switch');
      this.labelCheckbox.setAttribute('title', 'turn alarm on / off');

      //here i want this to stop the alarm sound and reinitialize the alarm using its original time allocated
      this.alarmCheckbox.onclick = () =>{
        if (this.alarmCheckbox.checked) {
          alert('Alarm has been set.');
          this.alarmTriggered = false; // Reset alarm trigger status
        } else {
          alert('Alarm is disabled.');
          this.ringtone.pause(); // Stop alarm if it's playing
          this.ringtone.currentTime = 0; // Reset the sound
          this.alarmTriggered = false; // Reset alarm trigger status
          this.alarmCheckbox.checked = false; // Uncheck the box
        }
       
      }

      //i want to delete any and all alarms added 
      this.deleteBtn.onclick = () =>{
        this.alarmDiv.remove();   // Remove alarm instance from the DOM
        this.alarmTime = null;    // Reset the alarm time so it doesn't trigger again
        this.ringtone.pause();    // Stop the alarm sound if it's playing
        this.ringtone.currentTime = 0;  // Reset the sound to the beginning
        alert('Alarm deleted');
      }

      this.alarmDiv.innerHTML = `Alarm set for: ${this.alarmTime}`;
      this.alarmDiv.style.color = "white";
      this.alarmDiv.appendChild(this.alarmCheckbox);
      this.alarmDiv.appendChild(this.labelCheckbox);
      this.alarmDiv.appendChild(this.deleteBtn);
      this.displayAlarm.appendChild(this.alarmDiv);
      
      // Reset the select elements to default values
      this.selectMenu[0].selectedIndex = 0; // Reset Hour
      this.selectMenu[1].selectedIndex = 0; // Reset Minute
      this.selectMenu[2].selectedIndex = 0; // Reset AM/PM

      //close model once an alarm has been created
      this.modal.classList.remove("show"); // Close the modal
      this.clock.classList.remove("hidden"); 
      this.clock.classList.add("visible");
      this.alarmButton.style.display = 'block'; 

   
    }
   
    //D: Alarm button click event
    this.alarmButton.onclick = () => {
      this.modal.classList.add("show");
      this.clock.classList.remove("visible");
      this.clock.classList.add("hidden");
      this.alarmButton.style.display = 'none';};
      
    // Close modal event
    this.closeModal.onclick = () => {
      this.modal.classList.remove("show");
      this.clock.classList.remove("hidden");
      this.clock.classList.add("visible");
      this.alarmButton.style.display = 'block';
      };
      
    // Handle clicking outside the modal
    window.onclick = (event) => {
      if (event.target == this.modal) {
        this.modal.classList.remove("show"); 
        this.clock.classList.remove("hidden"); 
        this.clock.classList.add("visible"); 
        this.alarmButton.style.display = 'block';
      }
    };

  }
  //this method is just for debugging and testing
  displayTime() {
    const formattedTime = `${this.h}:${this.m}:${this.s} ${this.ap}`;
    console.log(`Current time: ${formattedTime} on ${this.wd}`);
    console.log(this.setAlarmBtn);
    console.log(this.ringtone);
    console.log(this.displayAlarm);
    console.log(this.deleteBtn);
    console.log(this.currentTime);
    }

}

const alarm = new Clock();
alarm.displayTime();

  


