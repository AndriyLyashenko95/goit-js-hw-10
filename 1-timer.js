import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{f as y,i as d}from"./assets/vendor-BbbuE1sJ.js";const o=document.querySelector("[data-start]");let r=null,u;o.disabled=!0;const S={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){const t=e[0];t<=new Date?(D("Please choose a date in the future"),o.disabled=!0):(r=t,o.disabled=!1)}};y("#datetime-picker",S);o.addEventListener("click",()=>{r&&p(r)});function p(e){document.querySelector("#datetime-picker").disabled=!0,o.disabled=!0;const t=e-new Date;a(t),u=setInterval(()=>{const n=e-new Date;n<=0?(clearInterval(u),b("Timer has finished!"),a(0)):a(n)},1e3)}function a(e){const{days:t,hours:n,minutes:c,seconds:i}=w(e);document.querySelector("[data-days]").textContent=s(t),document.querySelector("[data-hours]").textContent=s(n),document.querySelector("[data-minutes]").textContent=s(c),document.querySelector("[data-seconds]").textContent=s(i)}function w(e){const l=Math.floor(e/864e5),m=Math.floor(e%864e5/36e5),f=Math.floor(e%864e5%36e5/6e4),h=Math.floor(e%864e5%36e5%6e4/1e3);return{days:l,hours:m,minutes:f,seconds:h}}function s(e){return String(e).padStart(2,"0")}function D(e){d.warning({title:"Caution",message:e})}function b(e){d.success({title:"Success",message:e})}
//# sourceMappingURL=1-timer.js.map