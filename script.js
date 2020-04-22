
let log = console.log

let addButton = document.getElementById('add-button');
addButton.addEventListener('click', addExpense);

let deleteBtn = document.getElementById('delete-btn');
deleteBtn.addEventListener('click', deleteExpense)

let filterInput = document.getElementById('filter');
filterInput.addEventListener('change', filterExpense)

function addExpense(e) {
    log(e.type);
    e.preventDefault();
    //grab tbody 
    let tbody = document.getElementById('expense-content');

    //create tr
    let tr = tbody.insertRow(0)
    
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
    td1.innerText = getDate();

    td2.classList = 'data-description';
    td2.innerText = document.getElementById('location').value;

    td3.classList = 'data-location';
    td3.innerText = document.getElementById('description').value;

    let catagory = document.getElementById('catagory').value;
    td4.classList = `data-catagory ${catagory} all`;
    td4.innerText = `${catagory}`;

    td5.classList = 'data-amount';
    let amount = document.getElementById('amount').value;
    td5.innerText = `$${amount}`;

    //remove default row
    removeDefaultRow();

    addTotalRow();
    
    calculateTotal();

    clearField();
}

function deleteExpense (e) {
    let table = document.getElementById('table-main').getElementsByTagName('tbody')[0];
    //let rows = table.getElementsByTagName('tr');

    for (let row of table.rows) {
        if (row.firstElementChild.firstElementChild.checked === true) {
            table.removeChild(row);
            log(table.rows.length);
        }
    }

    calculateTotal();

    removeTotalRow();
}

function calculateTotal() {
    let table = document.getElementById('table-main').getElementsByTagName('tbody')[0];
    let rows = table.getElementsByTagName('tr');

    let total = 0;
    Array.from(rows).forEach((row) => {
        let amountString = row.lastElementChild.innerText;
        let amount = Number(amountString.replace(/[^0-9.-]+/g,""));
        total += amount          
    });
    document.getElementById('total').innerText = `$${total}`;
}

function addTotalRow() {
    let table = document.getElementById('table-main').getElementsByTagName('tbody')[0];
    let rows = table.getElementsByTagName('tr');

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

function clearField() {
    document.getElementById('date').value = '';
    document.getElementById('location').value = '';
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('catagory').selectedIndex = '0';
}

function removeDefaultRow() {
    let table = document.getElementById('table-main').getElementsByTagName('tbody')[0];
    log(table);
    log(typeof table);
    for (let row of table.rows) {
        if (row.classList.contains('default-row')) {
            row.remove();
        } 
    }
}

function filterExpense (e) {
    let table = document.getElementById('table-main').getElementsByTagName('tbody')[0];

    let filteredCatagory = e.target.value;

    let total = 0;
    //for loop
    for (let row of table.rows) {
        let catagoryCell = row.lastElementChild.previousElementSibling;
        let amount = Number(row.lastElementChild.innerText.replace(/[^0-9.-]+/g,""))
        if (catagoryCell.classList.contains(filteredCatagory)) {
            row.style.display = 'table-row';
            total += amount
            
        } else {
            row.style.display = 'none';
        } 
    }
    log(total);

    let totalCell = document.getElementById('total');
    totalCell.innerText = `$${total}`;

     //forEach
    // Array.from(rows).forEach(function(row) {
    //     let catagory = row.lastElementChild.previousElementSibling.innerText;
    //         if (catagory === filteredCatagory) {
    //             row.style.display = 'table-row';
    //         } else {
    //             row.style.display = 'none';
    //         }
    //     }
    // )
}    
                
function removeTotalRow() {
    let table = document.getElementById('table-main').getElementsByTagName('tbody')[0];
    let rows = table.getElementsByTagName('tr');

    if (Array.from(rows).length === 0) {
        let footer = document.getElementById('table-main').getElementsByTagName('tfoot')[0];

        footer.removeChild(footer.firstElementChild);
    }
    renderDefaultRow();
}

function renderDefaultRow() {
    let table = document.getElementById('table-main').getElementsByTagName('tbody')[0];
    let rows = table.getElementsByTagName('tr');

    if (Array.from(rows).length === 0) {
        let tbody = document.getElementById('expense-content');

        //create tr
        let tr = tbody.insertRow(0)
        tr.className = 'default-row';

        //create td
        let td0 = tr.insertCell(0);
        td0.setAttribute('colspan', '6')
        td0.className = 'default-data';
        td0.innerText = 'Add your expense here';
    }
}



