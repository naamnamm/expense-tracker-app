
let log = console.log

let addButton = document.getElementById('add-button');

addButton.addEventListener('click', addExpense);

function addExpense(e) {
    log(e.type);
    e.preventDefault();
    //grab tbody 
    let tbody = document.getElementById('expense-content');

    //create tr
    let tr = tbody.insertRow(0)
    
    //create td
    let td1 = tr.insertCell(0);
    let td2 = tr.insertCell(1);
    let td3 = tr.insertCell(2);
    let td4 = tr.insertCell(3);
    let td5 = tr.insertCell(4);

    td1.classList = 'data-date';
    td2.classList = 'data-description';
    td3.classList = 'data-location';
    td4.classList = 'data-catagory';
    td5.classList = 'data-amount';

    //grab value from date input
    let displayDate = document.getElementsByClassName('data-date')[0];
    displayDate.innerText = getDate();

    //grab value from location input
    let locationText = document.getElementById('location').value;
    let displayLocation = document.getElementsByClassName('data-location')[0];
    displayLocation.innerText = locationText;

    //grab value from description
    let descriptionText = document.getElementById('description').value;
    let displayDescription = document.getElementsByClassName('data-description')[0];
    displayDescription.innerText = descriptionText;

    //grab value from catagory
    let descriptionCatagory = document.getElementById('catagory').value;
    let displayCatagory = document.getElementsByClassName('data-catagory')[0];
    displayCatagory.innerText = descriptionCatagory;
    displayCatagory.classList = `data-catagory ${descriptionCatagory} all`;

    //grab dollar amount
    let amount = document.getElementById('amount').value;
    let displayAmount= document.getElementsByClassName('data-amount')[0];
    displayAmount.innerText = `$ ${amount}`;

    //remove default row
    removeDefaultRow();

    addTotalRow();

    clearField();
}

function addTotalRow() {
    let table = document.getElementById('table-main').getElementsByTagName('tbody')[0];
    let rows = document.getElementById('table-main').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    log(rows)
    
    log(Array.from(rows));
    let rowArray = Array.from(rows)
    if (rowArray.length >= 1) {
        let lastRow = table.insertRow(-1);

        let lastRowTd1 = lastRow.insertCell(0);
        let lastRowTd2 = lastRow.insertCell(1);
        
        lastRowTd1.setAttribute('colspan', '4')
        lastRowTd1.innerHTML = 'Total';
        lastRowTd1.className = 'last-row';
        lastRowTd2.className = 'last-row';
    }

    //calculate total
    //if rowArray.length >= 1
    
    //grab lastRowTd2

    //grab value of lastsibling of rowArray;

    //reduce method to sum all value



    //calculateTotal(rowArray);
    
}

// function calculateTotal(rowArray) {
//     if (rowArray )

// }

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

// log(document.getElementById('expense-content').firstElementChild);
// log(document.getElementById('expense-content').nextElementSibling);
// log(document.getElementsByClassName('first-expense-row'));

// function renderTable() {

// }

//grab target input
let filterInput = document.getElementById('filter');

filterInput.addEventListener('change', filterExpense)

function filterExpense (e) {
    let table = document.getElementById('table-main').getElementsByTagName('tbody')[0];
    //let rows = table.getElementsByTagName('tr');

    let filteredCatagory = e.target.value;
    log(filteredCatagory);

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

    //for loop
    // for (let row of table.rows) {
    //     let catagory = row.lastElementChild.previousElementSibling.innerText;
        
    //     if (catagory === filteredCatagory) {
    //         row.style.display = 'table-row';

    //     } else {
    //         row.style.display = 'none';
    //     }
                
    // } 

     //for loop
     for (let row of table.rows) {
        let catagoryCell = row.lastElementChild.previousElementSibling;
        
        if (catagoryCell.classList.contains(filteredCatagory)) {
            row.style.display = 'table-row';

        } else {
            row.style.display = 'none';
        }
                
    } 
    //add catarogy with class 'catagory all'

    //if fourth child.classlist.contains(filtered)
    //display = table row.

    //else 
    //display - none

    //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_elements
    
    // if catagory === select // exit the loop >> display all rows
    //Can I use break statement?
    
}


//if add new expense > display all 
//total function > reduce method?