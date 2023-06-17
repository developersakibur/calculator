let inputRowsContainer = document.querySelector("#inputRowsContainer");

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
}

function addInputRow() {
	let newRow = document.createElement("div");
	newRow.className = "row input-row";
	newRow.innerHTML = `
    <div class="col-md-4"><div class="form-group"><input type="text" class="form-control name-input" placeholder="Name"></div></div>
    <div class="col-md-2"><div class="form-group"><input type="number" class="form-control quantity-input" placeholder="Quantity" min="0" ></div></div>
    <div class="col-md-2"><div class="form-group"><input type="number" class="form-control value-input" placeholder="Value" min="0" ></div></div>
    <div class="col-md-3"><div class="form-group"><input type="number" class="form-control total-output" placeholder="Total" readonly></div></div>
    <div class="btns col-md-1 d-flex align-items-center justify-content-center"><button type="button" class="btn btn-success btn-sm add-row-btn">+</button><button type="button" class="btn btn-danger btn-sm remove-row-btn">-</button></div>
  `;
	inputRowsContainer.appendChild(newRow);

	// Attach event listeners to the new row
	let newAddButton = newRow.querySelector(".add-row-btn");
	let newRemoveButton = newRow.querySelector(".remove-row-btn");
	newAddButton.addEventListener("click", handleAddButtonClick);
	newRemoveButton.addEventListener("click", removeInputRow);

	// Attach event listeners to the new row inputs
	let newNameInput = newRow.querySelector(".name-input");
	let newQuantityInput = newRow.querySelector(".quantity-input");
	let newValueInput = newRow.querySelector(".value-input");

	newNameInput.addEventListener("input", updateTotalPrice);
	newQuantityInput.addEventListener("input", updateTotalPrice);
	newValueInput.addEventListener("input", updateTotalPrice);
	newNameInput.addEventListener("input", displayOutput);
	newQuantityInput.addEventListener("input", displayOutput);
	newValueInput.addEventListener("input", displayOutput);
	newNameInput.addEventListener("input", updateAllTotal);
	newQuantityInput.addEventListener("input", updateAllTotal);
	newValueInput.addEventListener("input", updateAllTotal);

	// Enable the remove button of the first input row
	let firstRemoveButton = document.querySelector(".input-row .remove-row-btn");
	if (firstRemoveButton) {
		firstRemoveButton.disabled = false;
	}
}

function removeInputRow(event) {
	let row = event.target.closest(".input-row");
	let outputTableBody = document.getElementById("outputTableBody");

	// Check the number of input rows
	let inputRows = document.querySelectorAll(".input-row");
	if (inputRows.length === 1) {
		alert("At least one input row must be present.");
		return;
	}

	let rowId = row.dataset.rowId;
	let outputRow = document.getElementById(`outputRow-${rowId}`);

	row.parentNode.removeChild(row);

	if (outputRow) {
		outputRow.parentNode.removeChild(outputRow);
	}

	displayOutput();
	updateAllTotal();
}

function handleAddButtonClick() {
	if (validateFields()) {
		addInputRow();
	} else {
		alert("Please fill up all fields before adding a new row.");
	}
}

function validateFields() {
	let nameInputs = document.querySelectorAll(".name-input");
	let quantityInputs = document.querySelectorAll(".quantity-input");
	let valueInputs = document.querySelectorAll(".value-input");

	for (let i = 0; i < nameInputs.length; i++) {
		if (
			nameInputs[i].value === "" ||
			quantityInputs[i].value === "" ||
			valueInputs[i].value === ""
		) {
			return false;
		}
	}

	return true;
}

// Attach event listeners to existing rows
let nameInputs = document.querySelectorAll(".name-input");
let quantityInputs = document.querySelectorAll(".quantity-input");
let valueInputs = document.querySelectorAll(".value-input");

for (let i = 0; i < nameInputs.length; i++) {
	nameInputs[i].addEventListener("input", updateTotalPrice);
	quantityInputs[i].addEventListener("input", updateTotalPrice);
	valueInputs[i].addEventListener("input", updateTotalPrice);
	nameInputs[i].addEventListener("input", displayOutput);
	quantityInputs[i].addEventListener("input", displayOutput);
	valueInputs[i].addEventListener("input", displayOutput);
	nameInputs[i].addEventListener("input", updateAllTotal);
	quantityInputs[i].addEventListener("input", updateAllTotal);
	valueInputs[i].addEventListener("input", updateAllTotal);
}

// Attach event listener to new rows in the addInputRow function
let addButton = document.querySelectorAll(".add-row-btn");
let removeButton = document.querySelectorAll(".remove-row-btn");

function initializeEventListeners() {
	let addButton = document.querySelectorAll(".add-row-btn");
	let removeButton = document.querySelectorAll(".remove-row-btn");

	for (let i = 0; i < addButton.length; i++) {
		addButton[i].addEventListener("click", handleAddButtonClick);
		removeButton[i].addEventListener("click", removeInputRow);
	}
}

initializeEventListeners();

function displayOutput() {
	let nameInputs = document.querySelectorAll(".name-input");
	let quantityInputs = document.querySelectorAll(".quantity-input");
	let valueInputs = document.querySelectorAll(".value-input");
	let totalOutputs = document.querySelectorAll(".total-output");

	let outputTableBody = document.getElementById("outputTableBody");
	outputTableBody.innerHTML = "";

	for (let i = 0; i < nameInputs.length; i++) {
		let serialNumber = i + 1;
		let name = nameInputs[i].value;
		let quantity = parseFloat(quantityInputs[i].value);
		let value = parseFloat(valueInputs[i].value);
		let total = parseFloat(totalOutputs[i].value);

		let rowId = i + 1;

		let row = document.createElement("tr");
		row.id = `outputRow-${rowId}`;
		row.innerHTML = `
      <td>${serialNumber}</td>
      <td>${name}</td>
      <td>${quantity}</td>
      <td>${value}</td>
      <td>${total}</td>
    `;

		outputTableBody.appendChild(row);
	}
}

function updateAllTotal() {
	let totalOutputs = document.querySelectorAll(".total-output");
	let allTotalOutput = document.getElementById("allTotalOutput");

	let sum = 0;
	for (let i = 0; i < totalOutputs.length; i++) {
		let total = parseFloat(totalOutputs[i].value);
		if (!isNaN(total)) {
			sum += total;
		}
	}

	allTotalOutput.textContent = sum.toFixed(2);
}

// Call updateAllTotal whenever the total outputs change
let outputTableBody = document.getElementById("outputTableBody");
outputTableBody.addEventListener("input", updateAllTotal);

function copyOutput() {
	let outputTableBody = document.getElementById("outputTableBody");
	let outputRows = outputTableBody.getElementsByTagName("tr");

	let formattedOutput = "";
	let allTotal = 0;

	for (let i = 0; i < outputRows.length; i++) {
		let serialNumber = outputRows[i].getElementsByTagName("td")[0].innerText;
		let name = outputRows[i].getElementsByTagName("td")[1].innerText;
		let quantity = outputRows[i].getElementsByTagName("td")[2].innerText;
		let value = outputRows[i].getElementsByTagName("td")[3].innerText;
		let total = outputRows[i].getElementsByTagName("td")[4].innerText;

		let outputText = `${serialNumber}. ${name} (${quantity} * ${value}) = ${total} (Taka)`;
		formattedOutput += outputText + "\n";

		// Sum up the total values
		allTotal += parseFloat(total);
	}

	// Add the "All Total" line
	formattedOutput += `All Total = ${allTotal} Taka`;

	if (formattedOutput.length > 0) {
		navigator.clipboard.writeText(formattedOutput).then(
			function() {
				alert("Output copied successfully!");
			},
			function() {
				alert("Error copying output.");
			}
		);
	} else {
		alert("Input Some Data!");
	}
	updateAllTotal();
}

document.getElementById("copyButton").addEventListener("click", copyOutput);