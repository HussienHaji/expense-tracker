const showBtn = document.getElementById("show-btn");
const modal = document.querySelector(".modal-container");
const addBtn = document.querySelector(".add");
const expenseNameInput = document.getElementById("expense-name-input");
const expenseAmountInput = document.getElementById("expense-amount-input");
const radioIncome = document.getElementById("income");
const radioExpense = document.getElementById("expense");
const transactionsContainer = document.querySelector(".transactions");
const balance = document.getElementById("balance");
const expenseAmout = document.getElementById("total-expense");
const incomeAmout = document.getElementById("total-income");

let totalIncome = 0;
let totalExpense = 0;
let totalBalanse = 0;

function showModal() {
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

function getExpense() {
  const title = expenseNameInput.value;
  const amount = parseFloat(expenseAmountInput.value);
  const isIncome = radioIncome.checked ? true : false;

  if (title.trim() === "") return;
  if (Number.isNaN(amount)) return;

  setBalance(title, amount, isIncome);
  const transiotionElem = createTransition(title, amount, isIncome);
  appendTransition(transiotionElem);
}

function setBalance(title, amount, isIncome) {
  if (isIncome) {
    totalIncome += amount;
    totalBalanse += amount;
    incomeAmout.textContent = totalIncome;
  } else {
    totalExpense += amount;
    totalBalanse -= amount;
    expenseAmout.textContent = totalExpense;
  }
  balance.textContent = totalBalanse;
  expenseNameInput.value = "";
  expenseAmountInput.value = "";
  radioIncome.checked = true;
  closeModal();
}

function createTransition(title, amount, isIncom) {
  const transition = document.createElement("div");
  transition.className = "transaction";
  transition.dataset.type = isIncom ? "income" : "expense";
  const transitionTitle = document.createElement("span");
  transitionTitle.className = "name";
  transitionTitle.textContent = title;
  const transitionAmount = document.createElement("span");
  transitionAmount.className = "amount";
  transitionAmount.textContent = `$${amount}`;
  transition.append(transitionTitle, transitionAmount);
  return transition;
}

function appendTransition(transition) {
  transactionsContainer.appendChild(transition);
}

showBtn.addEventListener("click", showModal);
modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) closeModal();
});
addBtn.addEventListener("click", getExpense);
