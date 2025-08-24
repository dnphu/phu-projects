document.addEventListener('click', function(event){
    const clickdTab = event.target.closest('.tab-item-js');
    if (!clickdTab) return;
    event.preventDefault();

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
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') closePopup();
    });

    form.addEventListener('submit', function(event){
        event.preventDefault();

        closePopup();
    });
});