let entries = [];
let totalIncome = 0;
let totalExpense = 0;

document.getElementById("entryForm").addEventListener('submit', function(event){
    event.preventDefault();

    // Get values from the form
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value); // Ensure the amount is a number
    const type = document.getElementById("type").value;

    if (description && !isNaN(amount)) { // Check for valid input
        // Create Entry for storing details in array
        const entry = {
            id: Date.now(),
            description,
            amount,
            type
        };

        // Add values to the entries array
        entries.push(entry);
        updateTable();
        resetForm();
        updateSummary(); // Correct function name
    } else {
        alert("Please provide valid description and amount.");
    }
});

function updateTable(){
    const tbody = document.querySelector('#entryTable tbody');
    tbody.innerHTML = '';

    entries.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${entry.description}</td>
                       <td>${entry.amount.toFixed(2)}</td>
                       <td>${entry.type}</td>
                       <td>
                            <button onclick="editEntry(${entry.id})" id="edit">Edit</button>
                            <button onclick="deleteEntry(${entry.id})" id="delete">Delete</button>
                       </td>`;
        tbody.appendChild(row);
    });
}

function resetForm(){
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('type').value = 'income';
}

function updateSummary(){
    // Reset totalIncome and totalExpense for recalculation
    totalIncome = 0;
    totalExpense = 0;

    // Calculate total income and expenses
    entries.forEach(entry => {
        if (entry.type === 'income') {
            totalIncome += entry.amount; // Add income
        } else if (entry.type === 'expense') {
            totalExpense += entry.amount; // Add expense (positive value)
        }
    });

    // Calculate net balance
    const netBalance = totalIncome - totalExpense;

    // Update the summary section
    document.getElementById('totalIncome').innerText = `${totalIncome.toFixed(2)}`; 
    document.getElementById('totalExpense').innerText = `${totalExpense.toFixed(2)}`; 
    document.getElementById('netBalance').innerText = `${netBalance.toFixed(2)}`;
}

function deleteEntry(id){
    entries = entries.filter(entry => entry.id !== id);
    updateTable();
    updateSummary();
    resetForm();
}

function editEntry(id){
    const entry = entries.find(entry => entry.id === id);

    document.getElementById('description').value = entry.description;
    document.getElementById('amount').value = entry.amount;
    document.getElementById('type').value = entry.type;

    updateTable();
}
