import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
let userSelectedDate = null;
let interval;

btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    
    if (selectedDate <= new Date()) {
      showWarning('Please choose a date in the future');
      btn.disabled = true;  
    } else {
      userSelectedDate = selectedDate;
      btn.disabled = false;
    }
  },
};

flatpickr(input, options);

btn.addEventListener('click', () => {
  if (userSelectedDate) {
    startCountdown(userSelectedDate);
  }
});

function startCountdown(targetDate) {
  input.disabled = true; 
  btn.disabled = true; 

  const timeDifference = targetDate - new Date();
  updateTimerDisplay(timeDifference);

  interval = setInterval(() => {
    const remainingTime = targetDate - new Date();
    if (remainingTime <= 0) {
      clearInterval(interval);
      showSuccess('Timer has finished!');
      updateTimerDisplay(0);
      
      input.disabled = false; 
    } else {
      updateTimerDisplay(remainingTime);
    }
  }, 1000);
}

function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function showWarning(message) {
  iziToast.warning({
    title: 'Caution',
    message,
  });
}

function showSuccess(message) {
  iziToast.success({
    title: 'Success',
    message,
  });
}