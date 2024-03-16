document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('paymentForm');
    const paymentList = document.getElementById('paymentList');
    const generalPaymentList = document.getElementById('generalPaymentList');
    const studentPayments = {};
    const generalPayments = {};
  
    paymentForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const studentNameInput = document.getElementById('studentName');
      const paymentAmountInput = document.getElementById('paymentAmount');
      const paymentDateInput = document.getElementById('paymentDate');
  
      const studentName = studentNameInput.value;
      const paymentAmount = parseFloat(paymentAmountInput.value);
      const paymentDate = paymentDateInput.value;
  
      if (isNaN(paymentAmount) || paymentAmount <= 0) {
        alert('Please enter a valid payment amount.');
        return;
      }
  
      // Update student-wise payment records
      if (!studentPayments[studentName]) {
        studentPayments[studentName] = {
          amount: paymentAmount,
          timesPaid: 1
        };
  
        const newRow = paymentList.insertRow();
        newRow.innerHTML = `<td>${studentName}</td><td>$${paymentAmount.toFixed(2)}</td><td>${paymentDate}</td><td>1</td>`;
      } else {
        studentPayments[studentName].amount += paymentAmount;
        studentPayments[studentName].timesPaid++;
  
        const rows = paymentList.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
          const cells = rows[i].getElementsByTagName('td');
          if (cells[0].textContent === studentName) {
            cells[1].textContent = `$${studentPayments[studentName].amount.toFixed(2)}`;
            cells[2].textContent = paymentDate;
            cells[3].textContent = studentPayments[studentName].timesPaid;
            break;
          }
        }
      }
  
      // Update general payment history
      const parsedDate = new Date(paymentDate);
      const dateKey = parsedDate.toISOString().split('T')[0];
  
      if (!generalPayments[dateKey]) {
        generalPayments[dateKey] = {};
      }
  
      if (!generalPayments[dateKey][studentName]) {
        generalPayments[dateKey][studentName] = {
          amount: paymentAmount,
          numPayments: 1
        };
  
        const newRow = generalPaymentList.insertRow();
        newRow.innerHTML = `<td>${dateKey}</td><td>${studentName}</td><td>$${paymentAmount.toFixed(2)}</td><td>1</td>`;
      } else {
        generalPayments[dateKey][studentName].amount += paymentAmount;
        generalPayments[dateKey][studentName].numPayments++;
  
        const rows = generalPaymentList.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
          const cells = rows[i].getElementsByTagName('td');
          if (cells[0].textContent === dateKey && cells[1].textContent === studentName) {
            cells[2].textContent = `$${generalPayments[dateKey][studentName].amount.toFixed(2)}`;
            cells[3].textContent = generalPayments[dateKey][studentName].numPayments;
            break;
          }
        }
      }
  
      studentNameInput.value = '';
      paymentAmountInput.value = '';
      paymentDateInput.value = '';
    });
  });
  