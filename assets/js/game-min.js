const myModule=(()=>{'use strict';let a=[];const b=["C","D","H","S"],c=["A","J","Q","K"],d=document.querySelector("#btn-new-game"),e=document.querySelector("#btn-get-card"),f=document.querySelector("#btn-stop-game"),g=document.querySelectorAll(".card-div"),h=document.querySelectorAll("small");let i=[];const j=(b=2)=>{a=k(),i=Array(b).fill(0),h.forEach((a,b)=>{a.textContent=0,g[b].innerHTML=""}),e.disabled=!1,f.disabled=!1},k=()=>{let a=[];for(let c=2;10>=c;c++)for(let d of b)a.push(`${c}${d}`);for(let d of b)for(let b of c)a.push(`${b}${d}`);return _.shuffle(a)},l=()=>{if(0===a.length)throw"No hay cartas en el deck";return a.pop()},m=a=>{const b=a.slice(0,-1);return isNaN(b)?"A"===b?11:10:parseInt(b)},n=(a,b)=>(i[b]+=m(a),h[b].textContent=i[b],i[b]),o=(a,b)=>{const c=document.createElement("img");c.src=`./assets/img/cartas/${a}.png`,c.classList.add("card"),g[b].appendChild(c)},p=()=>{const[a,b]=i;setTimeout(()=>{b===a?Swal.fire("All lose"):21<a?Swal.fire("Computer wins"):21<b?Swal.fire("Player1 wins"):Swal.fire("Computer wins")},1e3)},q=a=>{let b=0;do{const c=l();if(b=n(c,i.length-1),o(c,i.length-1),21<a)break}while(b<a&&21>=a);p()};return e.addEventListener("click",()=>{const a=l(),b=n(a,0);o(a,0),21<b?(Swal.fire("Player1 lost"),e.disabled=!0,f.disabled=!0,q(b)):21===b&&(Swal.fire("Player1 wins"),e.disabled=!0,f.disabled=!0,q(b))}),f.addEventListener("click",()=>{e.disabled=!0,f.disabled=!0,q(i[0])}),d.addEventListener("click",()=>{j()}),{initGame:j}})();