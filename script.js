
let log = console.log

let addButton = document.getElementById('add-button');

addButton.addEventListener('click', addExpense);

let isChecked = false;

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
    checkbox.addEventListener('click', (e) => {
        isChecked = checkbox.checked;
        log(isChecked)
        }
    );

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

    clearField();
}

let deleteBtn = document.getElementById('delete-btn');

deleteBtn.addEventListener('click', deleteExpense)

function deleteExpense (e) {
    let table = document.getElementById('table-main').getElementsByTagName('tbody')[0];
    //et rows = table.getElementsByTagName('tr');
    //loop over all row
    for (let row of table.rows) {
        if (row.firstElementChild.firstElementChild.checked === true) {
            log(row.rowIndex);
            table.deleteRow(row.rowIndex);
        }
    }
    //if any row has checkbox.checked
    //delete the entire row
}

function addTotalRow() {
    let table = document.getElementById('table-main').getElementsByTagName('tbody')[0];
    let rows = table.getElementsByTagName('tr');

    log(rows)
    
    // insert total row
    log(Array.from(rows));
    
    let rowArray = Array.from(rows)
    let amountArray = []
    rowArray.forEach(function (row) {
        //push amount [20, 30] 
        let amountString = row.lastElementChild.innerText;
        let amount = Number(amountString.replace(/[^0-9.-]+/g,""));
        amountArray.push(amount);           
        log(amountArray);
    });
    
    //if amountArray.length > 1 - pop last index
    // if (amountArray.length > 1) {
    //     amountArray.pop();
    //     log(amountArray);
    // }

    //reduce it to total cell
    let total = amountArray.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0)

    log(total);

    if (rowArray.length === 1) {
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

    //grab lastRowTd2
    let totalCell = document.getElementById('total');
    totalCell.innerText = `$${total}`;
    
    //calculate total
    // grab amount
    // let amount = rowArray.lastElemen
    // let amountString = rowArray.lastElementChild.innerText;
    // let amount = parseFloat(amountString);
    // log(amount);
    //if rowArray.length >= 1

    // for (let row of table.rows) {
    //     if (row.length === 1)  {
    //         let lastRow = table.insertRow(-1);

    //         let lastRowTd1 = lastRow.insertCell(0);
    //         let lastRowTd2 = lastRow.insertCell(1);
        
    //         lastRowTd1.setAttribute('colspan', '4');
    //         lastRowTd1.innerHTML = 'Total';
    //         lastRowTd1.className = 'last-row';  
    //         lastRowTd2.className = 'last-row'; 
    //     }
    
}

//grab target checkbox


function getDate() {
    let date = new Date(document.getElementById('date').value);
    
    let formatter = new Intl.DateTimeFormat('en-us', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    });

    //to fix this!!!
    var dateString = formatter.formatToParts(date).map(({type, value}) => { 
        switch (type) {
          case 'dayPeriod': return `<b>${value}</b>`; 
          default : return value; 
        } 
      }).reduce((string, part) => string + part);

    return dateString;
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

//grab target input
let filterInput = document.getElementById('filter');

filterInput.addEventListener('change', filterExpense)

function filterExpense (e) {
    let table = document.getElementById('table-main').getElementsByTagName('tbody')[0];

    let filteredCatagory = e.target.value;
    log(filteredCatagory);

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
                
   



