import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i as r}from"./assets/vendor-BbbuE1sJ.js";document.querySelector(".form").addEventListener("submit",function(t){t.preventDefault();const s=parseInt(t.target.elements.delay.value,10),i=t.target.elements.state.value;new Promise((e,o)=>{setTimeout(()=>{i==="fulfilled"?e(s):o(s)},s)}).then(e=>{r.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{r.error({title:"Error",message:`❌ Rejected promise in ${e}ms`})})});
//# sourceMappingURL=2-snackbar.js.map
