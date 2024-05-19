const buyBtns = document.querySelectorAll('.js-buy-ticket')
const modal = document.querySelector('.js-modal')
const modalContainer = document.querySelector('.js-modal-container')
const modalClose = document.querySelector('.js-modal-close')
const itemsInput = document.getElementsByClassName('modal--ticket--input')
const buyTicketBtn = document.getElementById('buy-tickets')
function showBuyTickets() {
    modal.classList.add('open')
    modal.style.animation = `modalFadeIn ease 1s`
}
function hideBuyTickets() {
    modal.style.animation = `modalFadeOut ease 1s`;
    for (var i = 0; i < itemsInput.length; i++) {
        itemsInput[i].value = null;
    }
    setTimeout(() => {
        modal.classList.remove('open');
        modal.style.animation = null
    }, 1000);
}

//ngưng load lại trang khi đang nhập
window.addEventListener('beforeunload', e => {
    for (var i = 0; i < itemsInput.length; i++) {
        if (itemsInput[i].value !== '') {
            e.preventDefault()
        }
    }
})

for (const buyBtn of buyBtns) {
    buyBtn.addEventListener('click', showBuyTickets)
}
modalClose.addEventListener('click', hideBuyTickets)
modal.addEventListener('click', hideBuyTickets)
modalContainer.addEventListener('click', function (event) {
    event.stopPropagation();
})

var header = document.getElementById('header')
var mobileMenu = document.getElementById('mobile-menu')
var headerHeight = header.clientHeight

// đóng/mở header mobile
mobileMenu.onclick = function () {
    var isClosed = header.clientHeight === headerHeight
    if (isClosed) {
        header.style.height = 'auto';
    } else {
        header.style.height = null
    }
}
//tự động đóng khi chọn menu
var menuItems = document.querySelectorAll('#nav li a[href*="#"]')
for (var i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];

    // console.log(menuItem.nextElementSibling)
    menuItem.onclick = function (event) {
        var isParentMenu = this.nextElementSibling && this.nextElementSibling.classList.contains('subnav')
        if (isParentMenu) {
            event.preventDefault()
        } else {
            header.style.height = null
        }
    }
}

function toast({
    title = '',
    message = '',
    type = 'info',
    duration = 3000
}) {
    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement('div');

        // Auto remove toast
        const autoRemove = setTimeout(() => {
            main.removeChild(toast)
        }, duration + 1000);

        // Remove toast when clicked
        toast.onclick = (e) => {
            if (e.target.closest('#toast')) {
                clearTimeout(autoRemove);
                e.target.style.animation = `slideOutLeft ease 1s`
                setTimeout(() => {
                    main.removeChild(toast);
                }, 1000)
            }
        }

        const icons = {
            success: 'fas fa-check-circle',
            info: 'fas fa-check-circle',
            warning: 'fas fa-exclamation-circle',
            error: 'fas fa-exclamation-circle',
        }
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2)
        toast.classList.add('toast', `toast--${type}`);
        // toast.style.animation = `slideInLeft ease .6s, slideFadeOut linear 1s ${delay}s forwards`
        toast.style.animation = `slideInLeft ease 1.5s, slideOutLeft ease 1.5s ${delay}s forwards`
        toast.innerHTML = `
                    <div class="toast__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="toast__body">
                        <h3 class="toast__title">${title}</h3>
                        <p class="toast__msg">${message}</p>
                    </div>
                    <div class="toast__close">
                        <i class="fas fa-times"></i>
                    </div>
                    `;
        main.appendChild(toast);
    }
}

function showSuccessToast() {
    toast({
        title: 'Thành công!',
        message: 'Bạn đã đăng ký đặt vé ca nhạc thành công',
        type: 'success',
        duration: 3000
    });
    hideBuyTickets()
};

function showErrorToast() {
    toast({
        title: 'Thất bại!',
        message: 'Có lỗi xảy ra, vui lòng liên hệ quản trị viên',
        type: 'error',
        duration: 3000
    });
};

function buyTicket(e) {
    for (var i = 0; i < itemsInput.length; i++) {
        if (itemsInput[i].value == '') {
            // e.preventDefault()
        } else {
            showSuccessToast()
        }
    }
}


// const contentAnimationMember = document.getElementsByClassName('member-item')
// const contentAnimationAboutText = document.getElementsByClassName('about-text')

// window.onscroll = function () {
//     for (var i = 0; i < contentAnimationAboutText.length; i++) {
//         contentAnimationAboutText[i].classList.add('modalFadeIn')
//     }

//     if (window.pageYOffset >= 327) {
//         // console.log(window.pageYOffset);
//         for (var i = 0; i < contentAnimationMember.length; i++) {
//             contentAnimationMember[i].classList.add('member-item--animation')
//         }
//     }
//     console.log(window.pageYOffset);
// }

const contentAnimationMemberList = document.querySelector('.members-list')
const contentAnimationMember = document.getElementsByClassName('member-item')
const contentAnimationAboutText = document.querySelector('.about-text')
const contentAnimationsectionHeading = document.querySelector('.section-heading')

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about-text')) {
                contentAnimationAboutText.classList.add('modalFadeIn')
            }
            if (entry.target.classList.contains('members-list')) {
                for (var i = 0; i < contentAnimationMember.length; i++) {
                    contentAnimationMember[i].classList.add('member-item--animation')
                }
            }
            if (entry.target.classList.contains('section-heading')) {
                for (var i = 0; i < contentAnimationsectionHeading.length; i++) {
                    contentAnimationsectionHeading[i].classList.add('member-item--animation')
                }
            }
        }
    });
});

observer.observe(contentAnimationAboutText);
observer.observe(contentAnimationMemberList);
observer.observe(contentAnimationsectionHeading);
