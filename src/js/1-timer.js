import flatpickr from "flatpickr";
import iziToast from "izitoast";

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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

let userSelectedDate = null;
let timerInterval = null;

const datetimePicker = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      document.querySelector('button[data-start]').disabled = true;
    } else {
      document.querySelector('button[data-start]').disabled = false;
    }
  },
});

function startTimer() {
  const startButton = document.querySelector('button[data-start]');
  const datetimeInput = document.querySelector('#datetime-picker');
  startButton.disabled = true;
  datetimeInput.disabled = true;

  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const timeLeft = userSelectedDate - currentTime;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.querySelector('.timer').innerHTML = '<div>00:00:00:00</div>';
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  }, 1000);
}

document.querySelector('button[data-start]').addEventListener('click', startTimer);