function initSlider(el, perView = 4) {
  const scope = el.closest('.product-slider') || el.parentElement;
  const prevBtn = scope.querySelector('.swiper-btn.prev');
  const nextBtn = scope.querySelector('.swiper-btn.next');
  const dots = el.querySelector('.swiper-pagination');

  return new Swiper(el, {
    slidesPerView: perView,
    spaceBetween: 30,
    loop: false,
    slidesPerGroup: 1,
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    pagination: {
      el: dots,
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
      376: {
        slidesPerView: 3,
        slidesPerGroup: 1,
      },
      1150: {
        slidesPerView: 4,
        slidesPerGroup: 1,
      }
    },
  });
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.product-swiper').forEach((el) => {
    initSlider(el, 4);
  });
}); 


