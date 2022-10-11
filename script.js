const displayOutput = document.querySelector(".display-output");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const equalsBtn = document.querySelector(".equals");
const operationDisplay = document.querySelector(".display-operation");
const undoBtn = document.querySelector(".undo");

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

numberBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (operand1 !== "" && mode === "none") return;
    userInput += e.target.innerText;
    renderOutput(userInput);
  });
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (operand1 === "" && operand2 === "" && userInput === "") return;
    if (operand1 === "") {
      operand1 = userInput;
      userInput = "";
      mode = e.target.dataset.mode;
    } else if (operand1 !== "" && operand2 === "") {
      if (userInput === "") {
        mode = e.target.dataset.mode;
        return;
      }
      calcAndRender();
    }
  });
});

equalsBtn.addEventListener("click", () => {
  if (operand1 === "") return;
  calcAndRender();
});

function calcAndRender() {
  operand2 = userInput;
  const calc = calculate(operand1, operand2, mode);
  operation = `${operand1} ${modes[mode]} ${operand2}`;
  operand1 = calc;
  operand2 = "";
  userInput = "";
  mode = "none";
  renderOutput(operand1);
  renderOperation();
}

function renderOperation() {
  operationDisplay.innerText = operation;
}

clearBtn.addEventListener("click", () => {
  clearAll();
});

undoBtn.addEventListener("click", () => {
  if (userInput === "") return;
  userInput = userInput.slice(0, -1);
  renderOutput(userInput);
});

function clearAll() {
  operand1 = "";
  operand2 = "";
  userInput = "";
  mode = "";
  operation = "";
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
