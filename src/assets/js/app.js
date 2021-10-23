document.addEventListener('DOMContentLoaded', () => {
    AOS.init();

    // Sliders
    var servicesSwiper = new Swiper(".services-slider", {
        navigation: {
            nextEl: ".services-slider-arrow-next",
            prevEl: ".services-slider-arrow-prev",
        },
    });

    var reviewsSwiper = new Swiper(".reviews-slider", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        grabCursor: true,
        breakpoints: {
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 27,
            },
          },
    });

    // Modal
    const modal = document.querySelectorAll('.modal');
    const modalBtn = document.querySelectorAll('[data-modal]');
    const modalClose = document.querySelectorAll('.modal-close');

    modalBtn.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();

            let $this = event.currentTarget;
            let modalId = $this.getAttribute('data-modal');
            let modal = document.getElementById(modalId);
            let modalDialog = modal.querySelector('.modal-dialog');

            modalDialog.addEventListener('click', event => {
                event.stopPropagation();
            });

            modal.classList.add('show');
            document.body.classList.add('no-scroll');

            setTimeout(function() {
                modalDialog.style.transform = 'none';
                modalDialog.style.opacity = '1';
            }, 1);
            
        });
    });

    modalClose.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            let currentModal = event.currentTarget.closest('.modal');

            closeModal(currentModal);
        });
    });

    modal.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            let currentModal = event.currentTarget;

            closeModal(currentModal);
        });
    });

    function closeModal(currentModal) {
        let modalDialog = currentModal.querySelector('.modal-dialog');
        modalDialog.removeAttribute('style');

        setTimeout(() => {
            currentModal.classList.remove('show');
            document.body.classList.remove('no-scroll');
        }, 200);
    }

    // Form
    let selector = document.querySelectorAll('input[type="tel"]');
    let im = new Inputmask('+7 (999) 999-99-99');
    im.mask(selector);

    let validateForms = function(selector, rules, successModal, yaGoal) {
        new window.JustValidate(selector, {
            rules: rules,
            submitHandler: function(form) {
                let formData = new FormData(form);
    
                let xhr = new XMLHttpRequest();
    
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            console.log('Отправлено');
                        }
                    }
                }
    
                xhr.open('POST', 'mail.php', true);
                xhr.send(formData);
    
                form.reset();
    
                fileInput.closest('label').querySelector('span').textContent = 'Прикрепить файл';
            }
        });
    }
    
    validateForms('.modal-form', { email: {required: true, email: true}, tel: {required: true} }, '.thanks-popup', 'send goal'); 

});