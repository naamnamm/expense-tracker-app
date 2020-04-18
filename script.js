
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

    //grab dollar amount
    let amount = document.getElementById('amount').value;
    let displayAmount= document.getElementsByClassName('data-amount')[0];
    displayAmount.innerText = '$' + amount;

    //remove default row
    removeDefaultRow();

    clearField();
}

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

log(document.getElementById('expense-content').firstElementChild);
log(document.getElementById('expense-content').nextElementSibling);
log(document.getElementsByClassName('first-expense-row'));

// function renderTable() {

// }

//grab target input
let filterInput = document.getElementById('filter');

filterInput.addEventListener('change', filterExpense)

function filterExpense (e) {
    let table = document.getElementById('table-main').getElementsByTagName('tbody')[0];
    //let rows = table.getElementsByTagName('tr');

    let filteredCatagory = e.target.value;

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
    for (let row of table.rows) {
        let catagory = row.lastElementChild.previousElementSibling.innerText;
        if (catagory === filteredCatagory) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
                
    } 

}


    
