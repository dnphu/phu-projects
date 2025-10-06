
document.addEventListener('click', (e) => {
  const row = e.target.closest('.acc-row');

  if (e.target.classList.contains('btn-edit')) {
    const form = row.querySelector('.edit');
    const rowEdit  = row.querySelector('.row-edit');
    form.classList.toggle('is-hidden');
    rowEdit.classList.toggle('is-hidden');
  }

  if (e.target.classList.contains('cancel-btn')) {
    const form = row.querySelector('.edit');
    const rowEdit  = row.querySelector('.row-edit');
    rowEdit.classList.toggle('is-hidden');
    form.classList.add('is-hidden');
  }
});

document.addEventListener('submit', (e) => {
  const form = e.target.closest('.acc-row .edit');

  if (!form.checkValidity()) return; 
  e.preventDefault();

  const row   = form.closest('.acc-row');
  const text  = row.querySelector('.text');
  const field = row.dataset.field;


  if (field === 'name') {
    const first = form.querySelector('.first-input').value.trim();
    const last  = form.querySelector('.last-input').value.trim();
    text.textContent = `${first} ${last}`.trim() || '—';
  } else if (field === 'email') {
    const email = form.querySelector('.email-input').value.trim();
    text.textContent = email || '—';
  } else if (field === 'password') {
    const pass = form.querySelector('.password-input').value.trim();
    if (pass) text.textContent = '********';
  }

  const rowEdit  = row.querySelector('.row-edit');
  rowEdit.classList.toggle('is-hidden');
  form.classList.add('is-hidden');
});
