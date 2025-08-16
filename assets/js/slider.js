function initSlider(selector, perView = 4) {
    return new Swiper(selector, {
        slidesPerView: perView,
        spaceBetween: 30,
        loop: false,
        slidesPerGroup: 1,
        navigation: { 
            nextEl: '.swiper-btn.next',
            prevEl: '.swiper-btn.prev',
        },
    });
}
document.addEventListener('DOMContentLoaded', () => {
    initSlider('.product-swiper', 4);
});

