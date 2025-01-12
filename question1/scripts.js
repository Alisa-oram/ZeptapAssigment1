// script.js

const spreadsheet = document.getElementById("spreadsheet");
const formulaInput = document.getElementById("formula-input");

let selectedCell = null;

// Initialize grid dimensions
const rows = 20;
const cols = 10;

// Initialize the grid
function initializeGrid() {
  const thead = spreadsheet.querySelector("thead tr");
  for (let c = 0; c <= cols; c++) {
    const th = document.createElement("th");
    th.textContent = c === 0 ? "" : String.fromCharCode(64 + c); // A, B, C...
    thead.appendChild(th);
  }

  const tbody = spreadsheet.querySelector("tbody");
  for (let r = 1; r <= rows; r++) {
    const tr = document.createElement("tr");
    for (let c = 0; c <= cols; c++) {
      const cell = document.createElement(c === 0 ? "th" : "td");
      if (c === 0) {
        cell.textContent = r; // Row numbers
      } else {
        cell.contentEditable = true;
        cell.addEventListener("click", () => selectCell(cell));
      }
      tr.appendChild(cell);
    }
    tbody.appendChild(tr);
  }
}

// Select a cell
function selectCell(cell) {
  if (selectedCell) {
    selectedCell.classList.remove("selected");
  }
  selectedCell = cell;
  selectedCell.classList.add("selected");
  formulaInput.value = selectedCell.textContent;
}

// Formula bar input event
formulaInput.addEventListener("input", () => {
  if (selectedCell) {
    selectedCell.textContent = formulaInput.value;
  }
});

// Toolbar actions
document.getElementById("bold").addEventListener("click", () => {
  if (selectedCell) {
    selectedCell.style.fontWeight =
      selectedCell.style.fontWeight === "bold" ? "normal" : "bold";
  }
});

document.getElementById("italic").addEventListener("click", () => {
  if (selectedCell) {
    selectedCell.style.fontStyle =
      selectedCell.style.fontStyle === "italic" ? "normal" : "italic";
  }
});

document.getElementById("font-size").addEventListener("change", (e) => {
  if (selectedCell) {
    selectedCell.style.fontSize = e.target.value + "px";
  }
});

document.getElementById("font-color").addEventListener("change", (e) => {
  if (selectedCell) {
    selectedCell.style.color = e.target.value;
  }
});

// Add/Remove rows and columns
document.getElementById("add-row").addEventListener("click", () => {
  const tbody = spreadsheet.querySelector("tbody");
  const tr = document.createElement("tr");
  for (let c = 0; c <= cols; c++) {
    const cell = document.createElement(c === 0 ? "th" : "td");
    if (c === 0) {
      cell.textContent = tbody.children.length + 1;
    } else {
      cell.contentEditable = true;
      cell.addEventListener("click", () => selectCell(cell));
    }
    tr.appendChild(cell);
  }
  tbody.appendChild(tr);
});

document.getElementById("add-column").addEventListener("click", () => {
  const thead = spreadsheet.querySelector("thead tr");
  const colIndex = thead.children.length;
  const th = document.createElement("th");
  th.textContent = String.fromCharCode(64 + colIndex);
  thead.appendChild(th);

  const tbody = spreadsheet.querySelector("tbody");
  for (const row of tbody.children) {
    const cell = document.createElement("td");
    cell.contentEditable = true;
    cell.addEventListener("click", () => selectCell(cell));
    row.appendChild(cell);
  }
});

// Initialize the spreadsheet on load
initializeGrid();
