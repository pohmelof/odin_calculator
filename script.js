const displayOutput = document.querySelector(".display-output");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const periodBtn = document.querySelector(".period");
const clearBtn = document.querySelector(".clear");
const equalsBtn = document.querySelector(".equals");
const operationDisplay = document.querySelector(".display-operation");
const undoBtn = document.querySelector(".undo");
const maxInput = document.querySelector(".max-input");

let operand1 = "";
let operand2 = "";
let userInput = "";
let operation = "";
let mode = "none";
const modes = {
  add: "+",
  subtract: "-",
  multiply: "x",
  divide: "/",
};
const inputCodes = {
  Numpad1: 1,
  Numpad2: 2,
  Numpad3: 3,
  Numpad4: 4,
  Numpad5: 5,
  Numpad6: 6,
  Numpad7: 7,
  Numpad8: 8,
  Numpad9: 9,
  Numpad0: 0,
  NumpadDecimal: ".",
  Digit1: 1,
  Digit2: 2,
  Digit3: 3,
  Digit4: 4,
  Digit5: 5,
  Digit6: 6,
  Digit7: 7,
  Digit8: 8,
  Digit9: 9,
  Digit0: 0,
  Period: ".",
};
const operatorCodes = {
  NumpadAdd: "add",
  NumpadSubtract: "subtract",
  NumpadDivide: "divide",
  NumpadMultiply: "multiply",
};

numberBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    getUserInput(e);
  });
});

window.addEventListener("keydown", (e) => {
  if (inputCodes.hasOwnProperty(e.code)) {
    getUserInput(e);
  }
});

periodBtn.addEventListener("click", (e) => {
  if (userInput.indexOf(".") >= 0) return;
  getUserInput(e);
});

function getUserInput(e) {
  if (operand1 !== "" && mode === "none") return;
  if (userInput.length >= 12) {
    maxInput.classList.remove("hidden");
    return;
  } else {
    if (!maxInput.classList.contains("hidden")) {
      maxInput.classList.add("hidden");
    }
  }
  if (inputCodes.hasOwnProperty(e.code)) {
    userInput += inputCodes[e.code];
    renderOutput(userInput);
  } else {
    userInput += e.target.innerText;
    renderOutput(userInput);
  }
}

// operation mode func
function changeMode(e) {
  if (operatorCodes.hasOwnProperty(e.code)) {
    mode = operatorCodes[e.code];
  } else {
    mode = e.target.dataset.mode;
  }
}
function getOperation(e) {
  if (operand1 === "" && operand2 === "" && userInput === "") return;
  if (operand1 === "") {
    operand1 = userInput;
    userInput = "";
    changeMode(e);
  } else if (operand1 !== "" && operand2 === "") {
    if (userInput === "") {
      changeMode(e);
      return;
    }
    calcAndRender();
    changeMode(e);
  }
}

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    getOperation(e);
  });
});
window.addEventListener("keydown", (e) => {
  if (!operatorCodes.hasOwnProperty(e.code)) return;
  getOperation(e);
});

// equals func
function equals(e) {
  if (e.code === "NumpadEnter") {
    if (operand1 === "") return;
    if (operand1 !== "" && userInput === "") return;
    calcAndRender();
    mode = "none";
  } else if (e.target.dataset.mode === "equals") {
    if (operand1 === "") return;
    if (operand1 !== "" && userInput === "") return;
    calcAndRender();
    mode = "none";
  }
}
equalsBtn.addEventListener("click", (e) => {
  equals(e);
});

window.addEventListener("keydown", (e) => {
  if (e.code !== "NumpadEnter") return;
  equals(e);
});

function calcAndRender() {
  operand2 = userInput;
  const calc = calculate(operand1, operand2, mode);
  operation = `${operand1} ${modes[mode]} ${operand2}`;
  operand1 = calc;
  operand2 = "";
  userInput = "";
  renderOutput(operand1);
  renderOperation();
}

function renderOperation() {
  operationDisplay.innerText = operation;
}

clearBtn.addEventListener("click", () => {
  clearAll();
});

// undo func
function undo(e) {
  if (userInput === "") return;
  if (e.code === "Backspace") {
    userInput = userInput.slice(0, -1);
    renderOutput(userInput);
  } else if (e.target.dataset.mode === "undo") {
    userInput = userInput.slice(0, -1);
    renderOutput(userInput);
  }
}
undoBtn.addEventListener("click", (e) => {
  undo(e);
});
window.addEventListener("keydown", (e) => {
  undo(e);
});

function clearAll() {
  operand1 = "";
  operand2 = "";
  userInput = "";
  mode = "";
  operation = "";
  maxInput.classList.add("hidden");
  renderOperation();
  renderOutput(userInput);
}

function calculate(num1, num2, operation) {
  switch (operation) {
    case "add":
      return add(num1, num2);
    case "subtract":
      return subtract(num1, num2);
    case "divide":
      return divide(num1, num2);
    case "multiply":
      return multiply(num1, num2);
  }
}

function renderOutput(num) {
  if (typeof num === "number") {
    displayOutput.innerText = +num.toFixed(4);
  } else {
    displayOutput.innerText = num;
  }
}
function add(a, b) {
  return +a + +b;
}
function subtract(a, b) {
  return +a - +b;
}
function multiply(a, b) {
  return +a * +b;
}
function divide(a, b) {
  return +a / +b;
}

window.addEventListener("keydown", (e) => {
  console.log(e);
});
