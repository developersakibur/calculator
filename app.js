// Attach event listener to first fields and button
function firstInputEvent() {
  let nameInputs = document.querySelectorAll(".name-input");
  let quantityInputs = document.querySelectorAll(".quantity-input");
  let valueInputs = document.querySelectorAll(".value-input");
  let addButton = document.querySelectorAll(".add-row-btn");
  let removeButton = document.querySelectorAll(".remove-row-btn");

  [nameInputs, quantityInputs, valueInputs].forEach(function (inputList) {
    inputList.forEach(function (input) {
      input.addEventListener("input", updateTotalPrice);
    });
  });

  addButton[0].addEventListener("click", addInputRow);
  removeButton[0].addEventListener("click", removeInputRow);
}
firstInputEvent();

//all rows total field output
function updateTotalPrice() {
  let nameInputs = document.querySelectorAll(".name-input");
  let quantityInputs = document.querySelectorAll(".quantity-input");
  let valueInputs = document.querySelectorAll(".value-input");
  let totalOutputs = document.querySelectorAll(".total-output");

  for (let i = 0; i < nameInputs.length; i++) {
    let quantity = parseFloat(quantityInputs[i].value);
    let value = parseFloat(valueInputs[i].value);
    let total = isNaN(quantity) || isNaN(value) ? 0 : quantity * value;

    totalOutputs[i].value = total.toFixed(2);
  }
  displayOutput();
}
updateTotalPrice();

//add nrw input row
function addInputRow() {
  let inputRowsContainer = document.querySelector("#inputRowsContainer");
  let newRow = document.createElement("div");
  newRow.className = "row input-row";
  newRow.innerHTML = `
	<div class="name-box"><input type="text" class="name-input" placeholder="Name"></div>
	<div class="quantity-box"><input type="number" class="quantity-input" placeholder="Pice" min="0"> </div>
	<div class="value-box"><input type="number" class="value-input" placeholder="Value" min="0"></div>
	<div class="total-box"><input type="number" class="total-output" placeholder="Total" readonly></div>
	<div class="btn-box">
	  <button type="button" class="add-row-btn">+</button>
	  <button type="button" class="remove-row-btn">-</button>
	</div>
	`;
  inputRowsContainer.appendChild(newRow);

  // attach event listeners to the new button
  let newAddButton = newRow.querySelector(".add-row-btn");
  let newRemoveButton = newRow.querySelector(".remove-row-btn");
  newAddButton.addEventListener("click", addInputRow);
  newRemoveButton.addEventListener("click", removeInputRow);

  // attach event listeners to the new field
  let inputElements = newRow.querySelectorAll(
    ".name-input, .quantity-input, .value-input"
  );
  inputElements.forEach(function (input) {
    input.addEventListener("input", updateTotalPrice);
  });
  updateTotalPrice();
}

//remove input row
function removeInputRow(event) {
  let row = event.target.closest(".input-row");
  let outputTableBody = document.getElementById("outputTableBody");

  // Check the number of input rows
  let inputRows = document.querySelectorAll(".input-row");
  if (inputRows.length === 1) {
    return;
  }

  let rowId = row.dataset.rowId;
  let outputRow = document.getElementById(`outputRow-${rowId}`);

  row.parentNode.removeChild(row);

  if (outputRow) {
    outputRow.parentNode.removeChild(outputRow);
  }
  updateTotalPrice();
}

function displayOutput() {
  let nameInputs = document.querySelectorAll(".name-input");
  let quantityInputs = document.querySelectorAll(".quantity-input");
  let valueInputs = document.querySelectorAll(".value-input");
  let totalOutputs = document.querySelectorAll(".total-output");
  let outputTableBody = document.getElementById("outputTableBody");
  let allTotalOutput = document.getElementById("allTotalOutput");

  outputTableBody.innerHTML = "";
  let sum = 0;
  for (let i = 0; i < nameInputs.length; i++) {
    let serialNumber = i + 1;
    let name = nameInputs[i].value;
    let quantity = parseFloat(quantityInputs[i].value);
    let value = parseFloat(valueInputs[i].value);
    let total = parseFloat(totalOutputs[i].value);
    let dottotal = total.toFixed(2);

    if (
      serialNumber == 1 ||
      serialNumber == 2 ||
      serialNumber == 3 ||
      serialNumber == 4 ||
      serialNumber == 5 ||
      serialNumber == 6 ||
      serialNumber == 7 ||
      serialNumber == 8 ||
      serialNumber == 9
    ) {
      serialNumber = "0" + serialNumber;
    }
    if (name == "") {
      name = "Name";
    }
    if (isNaN(quantity)) {
      quantity = 0;
    }
    if (isNaN(value)) {
      value = 0;
    }
    if (!isNaN(total)) {
      sum += total;
    }

    let rowId = i + 1;
    let row = document.createElement("tr");

    row.id = `outputRow-${rowId}`;
    row.innerHTML = `
		<td>${serialNumber}</td>
		<td>${name}</td>
		<td>${quantity}</td>
		<td>${value}</td>
		<td>${dottotal}</td>
	  `;

    outputTableBody.appendChild(row);
    allTotalOutput.textContent = sum.toFixed(2);

    let copyButton = document.getElementById("copyButton");
    copyButton.innerHTML = "Copy Output";
    copyButton.style.backgroundColor = "#dc3545";
  }
}

function copyOutput() {
  let outputTableBody = document.getElementById("outputTableBody");
  let outputRows = outputTableBody.getElementsByTagName("tr");

  let formattedOutput = "";
  let allPice = 0;
  let allValue = 0;
  let mainValue = 0;
  let allTotal = 0;

  for (let i = 0; i < outputRows.length; i++) {
    let serialNumber = outputRows[i].getElementsByTagName("td")[0].innerText;
    let name = outputRows[i].getElementsByTagName("td")[1].innerText;
    let quantity = outputRows[i].getElementsByTagName("td")[2].innerText;
    let value = outputRows[i].getElementsByTagName("td")[3].innerText;
    let total = outputRows[i].getElementsByTagName("td")[4].innerText;

    let outputText = `${serialNumber}. ${name} (${quantity} x ${value}) = ${total} Taka.`;
    formattedOutput += outputText + "\n";

    // Sum up the total values
    allPice += parseFloat(quantity);
    allValue += parseFloat(value);
    allTotal += parseFloat(total);
    mainValue = allTotal / allPice;

    if (isNaN(mainValue)) {
      mainValue = 0;
    }
  }

  // Add the "All Total" line
  formattedOutput += `\nTotal Quantity = ${allPice.toFixed(
    2
  )} Pice.\nAverage Value = ${mainValue.toFixed(
    2
  )} Taka.\nTotal Value = ${allTotal.toFixed(2)} Taka.`;

  if (formattedOutput.length > 0) {
    // Create a temporary textarea element
    let tempTextarea = document.createElement("textarea");
    tempTextarea.value = formattedOutput;

    // Append the textarea to the document body
    document.body.appendChild(tempTextarea);

    // Programmatically select and copy the text
    tempTextarea.select();
    document.execCommand("copy");

    // Remove the temporary textarea
    document.body.removeChild(tempTextarea);
    let copyButton = document.getElementById("copyButton");
    copyButton.innerHTML = "Copy Success";
    copyButton.style.backgroundColor = "#28a745";
  } else {
    alert("Input Some Data!");
  }
}

document.getElementById("copyButton").addEventListener("click", copyOutput);
