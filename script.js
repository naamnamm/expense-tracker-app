let log = console.log

let addButton = document.getElementById('add-button');
addButton.addEventListener('click', addExpense);

let deleteBtn = document.getElementById('delete-btn');
deleteBtn.addEventListener('click', deleteExpense)

let filterInput = document.getElementById('filter');
filterInput.addEventListener('change', filterExpense)

let clearAllBtn = document.getElementById('clear-all');
clearAllBtn.addEventListener('click', clearAllExpenses);

function clearAllExpenses(e) {
    let rows = document.getElementById('expense-content').getElementsByTagName('tr');
    let response = confirm('You are about to delete all expense. Are you sure?');

    if (response === true) {
        Array.from(rows).forEach( row => row.remove())
        
        removeTotalRow();
        renderDefaultRow();
        localStorage.clear();
    } 
}

function addExpense(e) {
    e.preventDefault();

    const expense = {
        id: Date.now(),
        date: getDate(),
        description: document.getElementById('description').value,
        location: document.getElementById('location').value,
        catagory: document.getElementById('catagory').value,
        amount: document.getElementById('amount').value
    }

    if (expense.date === 'undefined NaN, NaN' || expense.catagory === 'select' || expense.amount === '') {
        return;
    }

    renderExpense(expense);

    let expenses = JSON.parse(localStorage.getItem('Expense-List')) || [];
    expenses.push(expense);
    localStorage.setItem('Expense-List', JSON.stringify(expenses));

    removeDefaultRow();

    addTotalRow();
    
    calculateTotal();

    //if filter is on - if filter doesn't match > display none
    let rows = document.getElementById('expense-content').getElementsByTagName('tr');
    let filteredCatagory = document.getElementById('filter').value;
    Array.from(rows).forEach(row => {
        if (row.lastElementChild.previousElementSibling.classList.contains(filteredCatagory)) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });

    document.querySelector('form').reset();
}

function renderExpense(expense) {
    //grab tbody 
    let tbody = document.getElementById('expense-content');

    //create tr
    let tr = tbody.insertRow(-1)
    tr.id = expense.id;

    //create td
    let td0 = tr.insertCell(0);
    let td1 = tr.insertCell(1);
    let td2 = tr.insertCell(2);
    let td3 = tr.insertCell(3);
    let td4 = tr.insertCell(4);
    let td5 = tr.insertCell(5);

    td0.classList = 'checkbox'
    let checkbox = document.createElement('input');
    checkbox.id = 'checkbox';
    checkbox.setAttribute("type", "checkbox");
    td0.appendChild(checkbox);

    td1.classList = 'data-date';
    td1.innerText = expense.date;

    td2.classList = 'data-description';
    td2.innerText = expense.description;

    td3.classList = 'data-location';
    td3.innerText = expense.location;

    td4.classList = `data-catagory ${expense.catagory} all`;
    td4.innerText = `${expense.catagory}`;

    td5.classList = 'data-amount';
    td5.innerText = `$${expense.amount}`;
}

const savedExpense = JSON.parse(localStorage.getItem('Expense-List'));
savedExpense.forEach(expense => {
    if (savedExpense.length >= 1) {
        renderExpense(expense);
    }
    removeDefaultRow();
    addTotalRow();
    calculateTotal();
});


function deleteExpense (e) {
    let rows = document.getElementById('expense-content').getElementsByTagName('tr');

    Array.from(rows).forEach( row => {
        if (row.firstElementChild.firstElementChild.checked === true) {
            row.remove();
        }
    })

    //push current id
    let arrayOfCurrentId = [];
    Array.from(rows).forEach( row => {
        arrayOfCurrentId.push(Number(row.id));
        }
    )

    let savedExpense = JSON.parse(localStorage.getItem('Expense-List'));

    let filtered = savedExpense.filter(item => (arrayOfCurrentId.indexOf(item.id) >= 0));

    localStorage.setItem('Expense-List', JSON.stringify(filtered));

    calculateTotal();

    removeTotalRow();
}

function calculateTotal() {
    let rows = document.getElementById('expense-content').getElementsByTagName('tr');
    let filteredCatagory = document.getElementById('filter').value;

    let total = 0;
    Array.from(rows).forEach((row) => {
        let amount = Number(row.lastElementChild.innerText.replace(/[^0-9.-]+/g,""))
        if (row.lastElementChild.previousElementSibling.classList.contains(filteredCatagory)) {
            total += amount; 
            }
        }        
    );
    document.getElementById('total').innerText = `$${total}`;
}

function addTotalRow() {
    let rows = document.getElementById('expense-content').getElementsByTagName('tr');

    if (Array.from(rows).length === 1) {
        let footer = document.getElementById('table-main').getElementsByTagName('tfoot')[0];
        let lastRow = footer.insertRow(0);

        let lastRowTd1 = lastRow.insertCell(0);
        let lastRowTd2 = lastRow.insertCell(1);
        
        lastRowTd1.setAttribute('colspan', '5');
        lastRowTd1.innerHTML = 'Total';
        lastRowTd1.className = 'last-row';  
        lastRowTd2.className = 'last-row';
        lastRowTd2.id = 'total';
    }
}

function getDate() {
    let date = new Date(`${document.getElementById('date').value}T00:00`);

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    
    return `${months[month]} ${day}, ${year}`
}

function removeDefaultRow() {
    let table = document.getElementById('table-main').getElementsByTagName('tbody')[0];

    for (let row of table.rows) {
        if (row.classList.contains('default-row')) {
            row.remove();
        } 
    }
}

function filterExpense (e) {
    let rows = document.getElementById('expense-content').getElementsByTagName('tr');
    let filteredCatagory = e.target.value;

    Array.from(rows).forEach( row => {
        let catagoryCell = row.lastElementChild.previousElementSibling
            if (catagoryCell.classList.contains(filteredCatagory)) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        }
    )
    calculateTotal();
}    
                
function removeTotalRow() {
    let rows = document.getElementById('expense-content').getElementsByTagName('tr');

    if (Array.from(rows).length === 0) {
        let footer = document.getElementById('table-main').getElementsByTagName('tfoot')[0];
        footer.removeChild(footer.firstElementChild);
    }
    renderDefaultRow();
}

function renderDefaultRow() {
    let rows = document.getElementById('expense-content').getElementsByTagName('tr');

    if (Array.from(rows).length === 0) {
        let tbody = document.getElementById('expense-content');

        let tr = tbody.insertRow(0)
        tr.className = 'default-row';

        let td0 = tr.insertCell(0);
        td0.setAttribute('colspan', '6')
        td0.className = 'default-data';
        td0.innerText = 'Add your expense here';
    }
}



