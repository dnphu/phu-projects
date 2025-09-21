document.addEventListener('click', function(event){
    const clickdTab = event.target.closest('.tab-item-js');
    if (!clickdTab) return;

    document.querySelectorAll('.mobile-tabbar .tab-item-js')
    .forEach(tab => tab.classList.remove('is-active'));

    clickdTab.classList.toggle('is-active');
});

document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.querySelector('.popup-overlay-js');
  const modal = document.querySelector('.popup-modal-js');
  const btnClose = document.querySelector('.popup-close-js');
  const form = document.querySelector('.popup-form-js');
  if (overlay && modal && btnClose && form) {

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
  modal.addEventListener('click', (e) => {
    if (!e.target.closest('.popup-inner-js')) closePopup();
  });

    form.addEventListener('submit', function(event){
        event.preventDefault();

        closePopup();
    });
  }
});

{
  const btnIcon = document.querySelector('.login-toggle-js');
  const loginForm = document.querySelector('.login-dropdown-js');
  const mobileBtn = document.querySelector('.tab-item-js.me');
  const tabletOverlay = document.querySelector('.login-overlay-js');
  const closeLogin = document.querySelector('.login-close-js');

  if (btnIcon && loginForm && mobileBtn && closeLogin) {
    btnIcon.addEventListener('click', (e) => {
      loginForm.classList.toggle('is-open');
      tabletOverlay.classList.toggle('is-open');
    });
    
    mobileBtn.addEventListener('click', () => {
      loginForm.classList.toggle('is-open');
      tabletOverlay.classList.toggle('is-open');
    });

    closeLogin.addEventListener('click', () => {
      loginForm.classList.remove('is-open');
      tabletOverlay.classList.remove('is-open');
    });

    document.addEventListener('click', (e) => {
    if (!e.target.closest('.login-toggle-js') && 
        !e.target.closest('.login-dropdown-js') &&
        !e.target.closest('.tab-item-js.me')
      ) {
      loginForm.classList.remove('is-open');
      tabletOverlay.classList.remove('is-open');
    }
  });
}

  const btnOpen = document.querySelector('.login-dropdown-js .btn-outline');
  const btnClose = document.querySelector('.signup-close-js');
  const overlay = document.querySelector('.signup-overlay-js');
  const signupForm = document.querySelector('.signup-popup-js');

  if (btnOpen && btnClose && overlay && signupForm) {
    btnOpen.addEventListener('click', () => {
      signupForm.classList.add('is-open');
      overlay.classList.add('is-open');
      loginForm.classList.remove('is-open');
      tabletOverlay.classList.remove('is-open');
    });

    btnClose.addEventListener('click', () => {
      signupForm.classList.remove('is-open');
      overlay.classList.remove('is-open');
    });

    overlay.addEventListener('click', () => {
      signupForm.classList.remove('is-open');
      overlay.classList.remove('is-open');
    });

    mobileBtn.addEventListener('click', () => {
      signupForm.classList.remove('is-open');
    });
  }
    document.querySelectorAll('.login-form, .signup-info').forEach(form => {
      form.addEventListener('invalid', () => {
        form.classList.add('submitted');
      }, true);
    });
  }
{
  const day = document.getElementById('day');
  const month = document.getElementById('month');
  if (day && month) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December'];

    months.forEach((name, i) => {
      const opt = document.createElement('option');
      opt.value = String(i + 1);  
      opt.textContent = name;      
      month.appendChild(opt);
    });

    for (let d = 1; d <= 31; d++) {
      const opt = document.createElement('option');
      opt.value = String(d);   
      opt.textContent = String(d); 
      day.appendChild(opt);
    }
}
}
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

    document.addEventListener('click', (e) => {
    if (!e.target.closest('.tab-item-js.shop') &&
        !e.target.closest('.shop-inner')
      ) {
      closeShop();
    }
  });
});

function pad2(number) {
    return String(number).padStart(2, '0'); 
  }
function countdown (boxEl, time) {
  const H = boxEl.querySelector('.h');
  const M = boxEl.querySelector('.m');
  const S = boxEl.querySelector('.s');
  if (H && M && S) {
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
}
  const boxEl = document.querySelector('.fs-timeboxes')
  if (boxEl) {
    countdown(boxEl, 300);
  }

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
});

  if (document.querySelector('.fs-topbar-js')) {
    renderActive();
  }



