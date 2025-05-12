document.getElementById('expenseForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const res = await fetch('php/add_expense.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    loadExpenses();
    e.target.reset();
  }
});

async function loadExpenses() {
  const res = await fetch('php/get_expenses.php');
  const expenses = await res.json();

  const tbody = document.querySelector('#expenseTable tbody');
  tbody.innerHTML = '';

  expenses.forEach(exp => {
    const row = `<tr>
      <td>${exp.amount}</td>
      <td>${exp.category}</td>
      <td>${exp.expense_date}</td>
      <td>${exp.note || ''}</td>
    </tr>`;
    tbody.insertAdjacentHTML('beforeend', row);
  });
}

loadExpenses();

