
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
  if (!form) return;

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

{
  const sidebar = document.querySelector('.account-sidebar');
  const container = document.querySelector('.account-container');
  const titleSpan = document.querySelector('.account-sidebar-btn.orders span');

  document.querySelector('.account-sidebar-btn').addEventListener('click', () => {
    container.classList.toggle('is-open');
  });

  sidebar.addEventListener('click', (e) => {
    if (e.target.closest('li')) container.classList.remove('is-open');
  });

  document.addEventListener('click', (e) => {
    const li = e.target.closest('li[data-target]');
    if (!li) return;

    const target =li.dataset.target;

    document.querySelectorAll('.account-sidebar li').forEach(el => {
      el.classList.toggle('active', el === li);
    });

    document.querySelectorAll('.account-content').forEach(section => {
      section.classList.toggle('is-hidden', section.dataset.view !== target);
    });
    titleSpan.textContent = li.textContent;
  })

  const BASE = "https://my-json-server.typicode.com/dnphu/fake-orders";
  const size = 5;

  const section = document.querySelector('[data-view="orders"]');
  const prev = section.querySelector('.order-page .prev');
  const next = section.querySelector('.order-page .next');

  const vndFormat = n =>  Number(n).toLocaleString('en-US') + '₫';
  const dateFormat = d => {
    const [year, month, day] = d.split('-');
    return `${day}/${month}/${year}`;
  }

  let currentPage = 1;
  let totalPage = 1;
  let orders = [];

  fetch(BASE + '/orders')
    .then(response => response.json())
    .then(list => {
      orders = list.sort((a, b) => new Date(b.date) - new Date(a.date));
      totalPage = Math.ceil(orders.length / size);
      render();
      createPagesBox();
      updatePager();
    })
    .catch(err => console.error(err));

  function render() {
    const sliceStart = (currentPage - 1) * size;
    const sliceEnd = sliceStart + size;
    const pageOrders = orders.slice(sliceStart, sliceEnd);
    const tbody = section.querySelector('.order-body');

    tbody.innerHTML = pageOrders.map(order => `
      <tr class="order-item" data-id="${order.id}">
        <td class="col-id">${order.id}</td>
        <td class="col-date">${dateFormat(order.date)}</td>
        <td class="col-product">${order.product}</td>
        <td class="col-total">${vndFormat(order.total)}</td>
        <td class="col-status">${order.status}</td>
      </tr>
    `).join('');
  }

  const pagesBox = document.querySelector('.order-page .pages');

  function createPagesBox() {
    
    let start, end;

    if (totalPage <= 5) {
      start = 1;
      end = totalPage;
    } else {
      start = currentPage;
      end = start + 5 - 1;

      if (end > totalPage) {
        end = totalPage;
        start = end - 5 + 1;
      }
    }

    pagesBox.innerHTML = '';
    for (let i = start; i <= end; i++) {
      const btn = document.createElement('button');
      btn.className = 'page';
      btn.textContent = i;
      if (i === currentPage) btn.classList.add('active'); 
      pagesBox.appendChild(btn);
    }
  }
  createPagesBox();

  function updatePager(){
    prev.classList.toggle('disabled', currentPage === 1);
    next.classList.toggle('disabled', currentPage === totalPage);
  }

  prev.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      render();
      createPagesBox();
      updatePager();
    }
  });
  next.addEventListener('click', () => {
    if (currentPage < totalPage) {
      currentPage++;
      render();
      createPagesBox();
      updatePager();
    }
  });
  pagesBox.addEventListener('click', (e) => {
    const btn = e.target.closest('button.page');
    if (!btn) return; 
    const page = Number(btn.textContent);
    if (page !== currentPage) {
      currentPage = page;
      render();
      createPagesBox();
      updatePager();
    } 
  });


  const switchSection = (view) => {
    document.querySelectorAll('.account-content').forEach(section => {
      section.classList.toggle('is-hidden', section.dataset.view !== view);
      updatePager();
    });
  };

  const detailsSection = document.querySelector('[data-view="order-details"]');
  const ordersTbody = document.querySelector('[data-view="orders"] .order-body');
  function showOrderDetails(id) {
    const order = orders.find(o => o.id == id);

    detailsSection.innerHTML = detailTemplate(order);
    switchSection('order-details');
  };

  function detailTemplate(o) {
  const items = o.items;
  const summary = o.summary;
  const deliver = o.shipping?.deliverOn;

  const itemsHTML = items?.map(it => `
    <tr class="row-product">
      <td class="col-product">
        <div class="product-info">
          <img src="${it.image || 'assets/icons/product.png'}" alt="Product">
          <span class="name">${it.name}</span>
        </div>
      </td>
      <td class="col-price">${vndFormat(it.price)}</td>
      <td class="col-quantity">${it.quantity}</td>
      <td class="col-discount">${vndFormat(it.discount ?? 0)}</td>
      <td class="col-subtotal">${vndFormat(it.subtotal)}</td>
    </tr>

    <tr class="col-product-mobile">
      <td>
        <div class="product-info-mobile">
          <img src="${it.image || 'assets/icons/product.png'}" alt="Product">
          <div class="info-mobile">
            <span class="name">${it.name}</span>
            <div class="price-quantity">
              <span class="price">${vndFormat(it.price)}</span>
              <span class="quantity">x ${it.quantity}</span>
            </div> 
          </div>
        </div>
      </td>
  </tr>

  `).join('');

  const popupReview = `
  <div class="popup-overlay-js review"></div>
  <div class="review-popup is-hidden">
      <div class="review-popup-header">
          <span>Review your order</span>
          <button class="review-popup-close"><img src="assets/icons/Shop/x.svg"></button>
      </div>
      <hr class="sep">
      <div class="review-popup-content">
          <div class="review-orders">
              <div class="orders-info">
                ${o.items.map(it => `
                  <div class="item-info">
                    <img src="${it.image || 'assets/icons/product.png'}">
                    <span class="name">${it.name}</span>
                  </div>
                  `).join('')}                           
              </div>
          </div>
          <div class="review-label">Please rate this product</div>
          <div class="review-stars">
              <button class="star" data-value="1">
                  <img class="star-outline" src="assets/icons/Account/star.svg">
                  <img class="star-filled" src="assets/icons/Account/star-filled.svg">
              </button>
              <button class="star" data-value="2">
                  <img class="star-outline" src="assets/icons/Account/star.svg">
                  <img class="star-filled" src="assets/icons/Account/star-filled.svg">
              </button>
              <button class="star" data-value="3">
                  <img class="star-outline" src="assets/icons/Account/star.svg">
                  <img class="star-filled" src="assets/icons/Account/star-filled.svg">
              </button>
              <button class="star" data-value="4">
                  <img class="star-outline" src="assets/icons/Account/star.svg">
                  <img class="star-filled" src="assets/icons/Account/star-filled.svg">
              </button>
              <button class="star" data-value="5">
                  <img class="star-outline" src="assets/icons/Account/star.svg">
                  <img class="star-filled" src="assets/icons/Account/star-filled.svg">
              </button>
          </div>
          <textarea class="review-text" 
              placeholder="Please share your feeling about this product"></textarea>
          <button class="btn-primary review-submit">Submit</button>
      </div>
  </div>
  <div class="review-success-popup is-hidden">
    <div class="success-inner">
        <button class="review-popup-close success-close">
          <img src="assets/icons/Shop/x.svg" alt="Close">
        </button>
        <img class="success-icon" src="assets/icons/Account/Happy star.png" alt="">
        <h6 class="success-title">Thank you for your review!</h6>
        <p class="success-desc">
          We will notify you once your reviews is verified. Your review help people having a better shopping experience.
        </p>
        <button class="btn-primary success-ok">OK</button>
    </div>
  </div>
  `;
  return `
  <div class="content content-table-detail">
    <div class="header-content">
      <div class="title">
        <h6>Order ID: #${o.id}</h6>
        <span class="status">- ${o.status}</span>
      </div>
      <div class="date">Date: ${dateFormat(o.date)}</div>
    </div>

    <div class="header-content-mobile">
      <div class="id">Order ID: #${o.id}</div>
      <div>Date: ${dateFormat(o.date)}</div>
      <div>Status: ${o.status}</div>
    </div>

    <hr class="sep">

    <div class="pro">Product info</div>
    <table class="table-detail">
      <thead>
        <tr>
          <th class="col-product">Product</th>
          <th class="col-price">Price</th>
          <th class="col-quantity">Quantity</th>
          <th class="col-discount">Discount</th>
          <th class="col-subtotal">Subtotal</th>
        </tr>
      </thead>
      <tbody class="detail-body">
        ${itemsHTML}
      </tbody>
    </table>

    <hr class="sep">

    <div class="footer-detail"> 
      <div class="review">
        <button class="btn-outline">Order again</button>
        <button class="btn-outline write-review-btn">Write review</button>
      </div>
      <div class="summary">
        <div class="row"><div class="label">Subtotal</div><div class="value">${vndFormat(summary.subtotal)}</div></div>
        <div class="row"><div class="label">Fee</div><div class="value">${vndFormat(summary.fee)}</div></div>
        <div class="row total"><div class="label">Total</div><div class="value">${vndFormat(summary.total)}</div></div>
      </div>
    </div>
  </div>

  <div class="content content-recipient">
    <div class="detail-title">Recipient Address</div>
    <hr class="sep">
    <div class="recipient">
      <div class="recipient-name">${(o.recipient?.name || '').toUpperCase()}</div>
      <div><span class="label">Address:</span> <span class="value">${o.recipient?.address || ''}</span></div>
      <div><span class="label">Phone number:</span> <span class="value">${o.recipient?.phone || ''}</span></div>
    </div>
  </div>

  <div class="order-method content-method">
    <div class="content content-shipping">
      <div class="detail-title">Shipping method</div>
      <hr class="sep">
      <div class="method">
        <div><span class="label">Deliver on:</span> <span class="value">${dateFormat(deliver)}</span></div>
        <div><span class="label">Shipping fee:</span> <span class="value">${vndFormat(o.shipping?.fee)}</span></div>
      </div>
    </div>

    <div class="content content-payment">
      <div class="detail-title">Payment method</div>
      <hr class="sep">
      <div class="method">
        <div><span class="label">${o.payment?.method || '—'}</span></div>
      </div>
    </div>
  </div>

  <button class="back-btn"><i class="fa-solid fa-angle-left"></i>Back to orders</button>
  ${popupReview}
  `;
  }
  const backBtnMobile = document.querySelector('.account-sidebar-btn.detail');
  const accountBtn = document.querySelector('.account-sidebar-btn.orders')
  const backBtn = document.querySelector('[data-view=order-details] .back-btn');

  ordersTbody.addEventListener('click', (e) => {
    const tr = e.target.closest('tr.order-item').dataset.id;
    showOrderDetails(tr);
    accountBtn.classList.add('is-hidden');
    backBtnMobile.classList.remove('is-hidden');
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.back-btn');
    if (!btn) return;
    switchSection('orders');
    accountBtn.classList.remove('is-hidden');
    backBtnMobile.classList.add('is-hidden');
  });

  detailsSection.addEventListener('click', (e) => {
    const popupReview = detailsSection.querySelector('.review-popup');
    const overlayReview = detailsSection.querySelector('.popup-overlay-js.review');
    const successReview = detailsSection.querySelector('.review-success-popup');

    if (e.target.closest('.write-review-btn')) {
      overlayReview.classList.add('is-active');
      popupReview.classList.remove('is-hidden');
    }

    if (e.target.closest('.review-popup-close') || 
    e.target == overlayReview || 
    e.target.closest('.success-ok')) {
      overlayReview.classList.remove('is-active');
      popupReview.classList.add('is-hidden');
      successReview.classList.add('is-hidden');
    }

    if (e.target.closest('.review-submit')) {
      const picked = popupReview.querySelectorAll('.review-stars .star.is-active').length;
      if (picked === 0) return;
      successReview.classList.remove('is-hidden');
      popupReview.classList.add('is-hidden');
    }
  });

  const textLabels = [
    'Very dissatisfied','Dissatisfied',"It's normal",'Satisfied','Very satisfied'
  ];
  const textHolders = [
    'Please share why this product is not good',
    "Please share why you don't like this product",
    "Please share why you don't really like this product",
    'Please share why you like this product',
    'Please share why you love this product'
  ];

  detailsSection.addEventListener('click', (e) => {
    const star = e.target.closest('.review-stars .star');
    if (!star) return;

    const n = Number(star.dataset.value);
    const root = star.closest('.review-popup');

    const reviewLabel = root.querySelector('.review-label');
    const reviewHolder = root.querySelector('.review-text');
    const stars = root.querySelectorAll('.review-stars .star');

    reviewLabel.textContent = textLabels[n - 1];
    reviewHolder.placeholder = textHolders[n - 1];
    stars.forEach((s, i) => s.classList.toggle('is-active', i < n));
  });

}
