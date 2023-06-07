let fund = 0;
let contributions = {};
let transactions = [];

function addContribution(name, amount, notes = '', date = new Date()) {
    if (contributions[name]) {
        contributions[name] += amount;
    } else {
        contributions[name] = amount;
    }
    fund += amount;
    addTransaction('Deposit', amount, notes, date);
}

function addExpense(description, amount, notes = '') {
    if (fund >= amount) {
        fund -= amount;
        addTransaction('Withdraw', amount, notes);
    } else {
        console.log('Insufficient funds');
    }
}

function addTransaction(type, amount, notes, date = new Date()) {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let transaction = {
        date: date.toLocaleDateString(undefined, options),
        type: type,
        amount: amount,
        balance: fund,
        notes: notes
    };
    transactions.push(transaction);
}

function displayFund() {
  let fundElement = document.getElementById("totalFund");
  fundElement.textContent = `Current Fund: $${fund}`;
}

function displayContributions() {
    let contributorList = document.getElementById("contributionList");
    contributorList.innerHTML = "";
    for (let contributor in contributions) {
      let listItem = document.createElement("li");
      listItem.textContent = `${contributor}: $${contributions[contributor]}`;
      contributorList.appendChild(listItem);
    }
  }

  function displayTransactions() {
    let transactionBody = document.getElementById('transactionBody');
    transactionBody.innerHTML = '';
    for (let transaction of transactions) {
        let row = document.createElement('tr');
        let dateCell = document.createElement('td');
        dateCell.textContent = transaction.date;
        let typeCell = document.createElement('td');
        typeCell.textContent = transaction.type;
        let amountCell = document.createElement('td');
        amountCell.textContent = `$${transaction.amount}`;
        let balanceCell = document.createElement('td');
        balanceCell.textContent = `$${transaction.balance}`;
        let notesCell = document.createElement('td');
        notesCell.textContent = transaction.notes;
        row.appendChild(dateCell);
        row.appendChild(typeCell);
        row.appendChild(amountCell);
        row.appendChild(balanceCell);
        row.appendChild(notesCell);
        transactionBody.appendChild(row);
    }
}

function updateDisplay() {
  displayFund();
  displayContributions();
  displayTransactions();
}

// Example usage:
let date = new Date(2023, 11, 7); // June 7, 2023
addContribution('John', 1000, 'Initial contribution', date);
addContribution('Jane', 2000, 'Initial contribution');
addExpense('Paint', 500, 'Paint for living room');
addExpense('roof', 1500, 'roofing');
addContribution('Jones', 2000, 'Initial contribution');
updateDisplay();
