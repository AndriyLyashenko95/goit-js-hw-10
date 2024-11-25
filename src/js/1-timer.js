import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btn = document.querySelector('[data-start]');
let userSelectedDate = null;
let interval;

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

flatpickr('#datetime-picker', options);

checkDateValidity();

btn.addEventListener('click', () => {
  if (userSelectedDate) {
    startCountdown(userSelectedDate);
  }
});

function checkDateValidity() {
  const currentDate = new Date();
  const datetimeInput = document.querySelector('#datetime-picker').value;
  
  if (datetimeInput && new Date(datetimeInput) <= currentDate) {
    showWarning('Please choose a date in the future');
    btn.disabled = true;
  } else {
    btn.disabled = false;
  }
}

function startCountdown(targetDate) {
  const timeDifference = targetDate - new Date();
  updateTimerDisplay(timeDifference);

  btn.disabled = true;
  interval = setInterval(() => {
    const remainingTime = targetDate - new Date();
    if (remainingTime <= 0) {
      clearInterval(interval);
      showSuccess('Timer has finished!');
    } else {
      updateTimerDisplay(remainingTime);
    }
  }, 1000);
}

function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  const timerString = `${addLeadingZero(days)}:${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
  document.querySelector('.timer').textContent = timerString;
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