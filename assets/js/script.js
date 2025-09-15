document.addEventListener('click', function(event){
    const clickdTab = event.target.closest('.tab-item-js');
    if (!clickdTab) return;

    document.querySelectorAll('.mobile-tabbar .tab-item-js')
    .forEach(tab => tab.classList.remove('is-active'));

    clickdTab.classList.add('is-active');
});

document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.popup-overlay-js');
    const modal = document.querySelector('.popup-modal-js');
    const btnClose = document.querySelector('.popup-close-js');
    const form = document.querySelector('.popup-form-js');

    function openPopup() {
        overlay.classList.add('is-open');
        modal.classList.add('is-open')
        document.body.classList.add('modal-open')
    }

    function closePopup() {
        overlay.classList.remove('is-open')
        modal.classList.remove('is-open')
        document.body.classList.remove('modal-open')
    }

    openPopup();

    btnClose.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);

    form.addEventListener('submit', function(event){
        event.preventDefault();

        closePopup();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.shop-overlay-js');
    const shopsheet = document.querySelector('.shop-inner');
    const btnClose = document.querySelector('.shop-close-js');
    const btnIcon = document.querySelector('.tab-item-js.shop');

    function btnShop() {
      overlay.classList.toggle('is-open');
      shopsheet.classList.toggle('is-open');
    }

    function closeShop() {
      overlay.classList.remove('is-open');
      shopsheet.classList.remove('is-open');
    }

    btnIcon.addEventListener('click', btnShop);
    btnClose.addEventListener('click', closeShop);
    overlay.addEventListener('click', closeShop);
});

function pad2(number) {
    return String(number).padStart(2, '0'); 
  }
function countdown (boxEl, time) {
  const H = boxEl.querySelector('.h');
  const M = boxEl.querySelector('.m');
  const S = boxEl.querySelector('.s');

  function tick() {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    H.textContent = pad2(hours);
    M.textContent = pad2(minutes);
    S.textContent = pad2(seconds);

    time--;

    if (time < 0 ) {
      clearInterval(Start);
    }
  }
  tick();
  const Start = setInterval(tick, 1000);
}
  const boxEl = document.querySelector('.fs-timeboxes')
  countdown(boxEl, 300);

function createProductCard(product) {
  const productCard = document.createElement('div');
  productCard.className = 'product-card';
  productCard.dataset.total = product.total;
  productCard.dataset.sold = product.sold;

  productCard.innerHTML = `
    <img src= "${product.image}" alt="Product photo">
    <div class="badge">
      <span class="percent">${product.badgePercent}</span>
      <span class="text">GIẢM</span>
    </div>
    <div class="fs-product-info">
      <p class="product-name">${product.name}</p>
      <div class="product-prices">
        <span class="original-price">${product.originalPrice}</span>
        <span class="discounted-price">${product.discountPrice}</span>
      </div>
    </div>
    <div class="meter">
        <span class="bar"><b></b></span>
        
    <button class="product-btn">Mua ngay</button>   
    </div> 
    `;
    
    const barEl = productCard.querySelector('.bar b');
    const percent = (product.sold / product.total) * 100;
    barEl.style.width = percent + '%';

    return productCard;
}

function renderProducts(gridId, items) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = '';
  items.forEach(product => grid.appendChild(createProductCard(product)));
}

const getActiveTime = () =>
  document.querySelector('.fs-time-btn-js.is-active').dataset.time;

const getActiveCat = () =>
  document.querySelector('.cat-tab-js.is-active').dataset.tab;

const setActive = (selector, btn) => {
  document.querySelectorAll(selector).forEach(button => button.classList.remove('is-active'));
  btn.classList.add('is-active');
};

function renderActive() {
  const time = getActiveTime();
  const cat = getActiveCat();
  const list = products[time][cat];
  renderProducts('grid-' + cat, list);
}

document.addEventListener('click', (el) => {
  const btn = el.target.closest('.fs-time-btn-js');
  if (!btn) return;
  document.querySelectorAll('.fs-time-btn-js').forEach(button => 
    button.classList.remove('is-active')
  );
  btn.classList.add('is-active');
  renderActive();
})

document.addEventListener('click', (el) => {
  const btn = el.target.closest('.cat-tab-js');
  if (!btn) return;
  document.querySelectorAll('.cat-tab-js').forEach(button =>
    button.classList.remove('is-active')
  );
  btn.classList.add('is-active');

  const key = btn.getAttribute('data-tab');
  document.querySelectorAll('.fs-panel-js').forEach(list => 
    list.classList.toggle('is-active', list.getAttribute('data-tab') === key)
  );

  renderActive();
})

renderActive();




