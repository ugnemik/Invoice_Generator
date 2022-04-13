const buttons = document.querySelectorAll("#btn");
const servicesContainer = document.getElementById("services-collection");
let servicesRequested = [];
const totalAmountEl = document.getElementById("total-amount");
const sendBtn = document.getElementById("send-btn");

function Service(service, price) {
  this.service = service;
  this.price = price;
}

buttons.forEach(listenForClick);

function listenForClick(btn) {
  btn.addEventListener("click", function () {
    let service = btn.textContent.replace(/[^A-Za-z]+/g, " ");
    let price = btn.textContent.match(/\d/g);
    price = price.join("");
    let newService = new Service(service, price);
    servicesRequested.push(newService);
    generateHtml(servicesRequested);
  });
}

function generateHtml(array) {
  servicesContainer.innerHTML = "";
  for (var i = 0; i < array.length; i++) {
    servicesContainer.innerHTML += `
    <div class="service">
    <div class="service-name">${array[i].service}</div>
    <a class="remove" onclick="remove(${i})"><i class="fa fa-trash"></i></a>
    <div class="service-price"><span class="grey-txt">£</span>${array[i].price}</div>
    </div>
    `;
  }
  // update total amount el
  totalAmountEl.textContent = "£" + calculateTotal(array);
}

//calculate total amount to pay
function calculateTotal(array) {
  let totalAmount = 0;
  for (var i = 0; i < array.length; i++) {
    let number = parseInt(array[i].price);
    totalAmount += number;
  }
  if (totalAmount > 0) {
    totalAmountEl.classList.add("active");
  } else {
    totalAmountEl.classList.remove("active");
  }
  return totalAmount;
}
// reset form
sendBtn.addEventListener("click", function () {
  document.getElementById("notes").value = "";
  servicesRequested = [];
  generateHtml(servicesRequested);
});

// remove service from array and dom
function remove(index) {
  servicesRequested.splice(index, 1);
  generateHtml(servicesRequested);
}
