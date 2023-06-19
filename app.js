function firstInputEvent(){let t=document.querySelectorAll(".name-input"),e=document.querySelectorAll(".quantity-input"),n=document.querySelectorAll(".value-input"),l=document.querySelectorAll(".add-row-btn"),o=document.querySelectorAll(".remove-row-btn");[t,e,n].forEach((function(t){t.forEach((function(t){t.addEventListener("input",updateTotalPrice)}))})),l[0].addEventListener("click",addInputRow),o[0].addEventListener("click",removeInputRow)}function updateTotalPrice(){let t=document.querySelectorAll(".name-input"),e=document.querySelectorAll(".quantity-input"),n=document.querySelectorAll(".value-input"),l=document.querySelectorAll(".total-output");for(let o=0;o<t.length;o++){let t=parseFloat(e[o].value),u=parseFloat(n[o].value),a=isNaN(t)||isNaN(u)?0:t*u;l[o].value=a.toFixed(2)}displayOutput()}function addInputRow(){let t=document.querySelector("#inputRowsContainer"),e=document.createElement("div");e.className="row input-row",e.innerHTML='\n\t<div class="name-box"><input type="text" class="name-input" placeholder="Name"></div>\n\t<div class="quantity-box"><input type="number" class="quantity-input" placeholder="Pice" min="0"> </div>\n\t<div class="value-box"><input type="number" class="value-input" placeholder="Value" min="0"></div>\n\t<div class="total-box"><input type="number" class="total-output" placeholder="Total" readonly></div>\n\t<div class="btn-box">\n\t  <button type="button" class="add-row-btn">+</button>\n\t  <button type="button" class="remove-row-btn">-</button>\n\t</div>\n\t',t.appendChild(e);let n=e.querySelector(".add-row-btn"),l=e.querySelector(".remove-row-btn");n.addEventListener("click",addInputRow),l.addEventListener("click",removeInputRow),e.querySelectorAll(".name-input, .quantity-input, .value-input").forEach((function(t){t.addEventListener("input",updateTotalPrice)})),updateTotalPrice()}function removeInputRow(t){let e=t.target.closest(".input-row");document.getElementById("outputTableBody");if(1===document.querySelectorAll(".input-row").length)return;let n=e.dataset.rowId,l=document.getElementById(`outputRow-${n}`);e.parentNode.removeChild(e),l&&l.parentNode.removeChild(l),updateTotalPrice()}function displayOutput(){let t=document.querySelectorAll(".name-input"),e=document.querySelectorAll(".quantity-input"),n=document.querySelectorAll(".value-input"),l=document.querySelectorAll(".total-output"),o=document.getElementById("outputTableBody"),u=document.getElementById("allTotalOutput");o.innerHTML="";let a=0;for(let d=0;d<t.length;d++){let r=d+1,c=t[d].value,i=parseFloat(e[d].value),p=parseFloat(n[d].value),m=parseFloat(l[d].value),s=m.toFixed(2);1!=r&&2!=r&&3!=r&&4!=r&&5!=r&&6!=r&&7!=r&&8!=r&&9!=r||(r="0"+r),""==c&&(c="Name"),isNaN(i)&&(i=0),isNaN(p)&&(p=0),isNaN(s)||(a+=m);let y=d+1,v=document.createElement("tr");v.id=`outputRow-${y}`,v.innerHTML=`\n\t\t<td>${r}</td>\n\t\t<td>${c}</td>\n\t\t<td>${i}</td>\n\t\t<td>${p}</td>\n\t\t<td>${s}</td>\n\t  `,o.appendChild(v),u.textContent=a.toFixed(2);let T=document.getElementById("copyButton");T.innerHTML="Copy Output",T.style.backgroundColor="#dc3545"}}function copyOutput(){let t=document.getElementById("outputTableBody").getElementsByTagName("tr"),e="",n=0,l=0,o=0,u=0;for(let a=0;a<t.length;a++){let d=t[a].getElementsByTagName("td")[0].innerText,r=t[a].getElementsByTagName("td")[1].innerText,c=t[a].getElementsByTagName("td")[2].innerText,i=t[a].getElementsByTagName("td")[3].innerText,p=t[a].getElementsByTagName("td")[4].innerText;e+=`${d}. ${r} (${c} x ${i}) = ${p} Taka.`+"\n",n+=parseFloat(c),l+=parseFloat(i),u+=parseFloat(p),o=u/n,isNaN(o)&&(o=0)}if(e+=`\nTotal Quantity = ${n.toFixed(2)} Pice.\nAverage Value = ${o.toFixed(2)} Taka.\nTotal Value = ${u.toFixed(2)} Taka.`,e.length>0){let t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t);let n=document.getElementById("copyButton");n.innerHTML="Copy Success",n.style.backgroundColor="#28a745"}else alert("Input Some Data!")}firstInputEvent(),updateTotalPrice(),document.getElementById("copyButton").addEventListener("click",copyOutput);