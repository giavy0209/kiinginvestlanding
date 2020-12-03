let registerBtn = document.querySelector('#register');
let routeBtnRegister = document.querySelector('.route-popup__register');
let formRegister = document.querySelector('.form-register');

let loginBtn = document.querySelector('#login');
let routeBtnLogin = document.querySelector('.route-popup__login');
let formLogin = document.querySelector('.form-login');

let routeBtnForgot = document.querySelector('.route-popup__forgot');
let formForgot = document.querySelector('.form-forgot');

let popup = document.querySelector('#popup');
let overlay = document.querySelector('#overlay');

let routeButtons = document.querySelectorAll('.route-popup__button');
let containerForm = document.querySelector('.container-popup__right');

let RegisterForm = document.querySelector('form[name="form-register"]');




RegisterForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log(RegisterForm.elements['email'].value);

    // axios.post('{{BASE_URL}}/user', {
    //     params: {
    //         email: RegisterForm.elements['email'].value,
    //     }
    // });
})

// Add Event for 3 Route button
routeButtons.forEach(routeBtn => {
    routeBtn.addEventListener('click', () => {
        if (routeBtn.classList.contains('active')) return;

        if (routeBtn.classList.contains('route-popup__register')) {
            routeBtn.parentElement.querySelector('[class*="active"]').classList.remove('active');
            routeBtn.classList.add('active');
            containerForm.querySelector('[class*="active"]').classList.remove('active');
            formRegister.classList.add('active');
        }

        if (routeBtn.classList.contains('route-popup__login')) {
            routeBtn.parentElement.querySelector('[class*="active"]').classList.remove('active');
            routeBtn.classList.add('active');
            containerForm.querySelector('[class*="active"]').classList.remove('active');
            formLogin.classList.add('active');
        }

        if (routeBtn.classList.contains('route-popup__forgot')) {
            routeBtn.parentElement.querySelector('[class*="active"]').classList.remove('active');
            routeBtn.classList.add('active');
            containerForm.querySelector('[class*="active"]').classList.remove('active');
            formForgot.classList.add('active');
        }
    });
});

// Show popup, Active routeBtnRegister, Active the Right part of Register
registerBtn.addEventListener('click', () => {
    popup.classList.add('show');
    routeBtnRegister.classList.add('active');
    formRegister.classList.add('active');
});

// Show popup, Active routeBtnLogin, Active the Right part of Login
loginBtn.addEventListener('click', () => {
    popup.classList.add('show');
    routeBtnLogin.classList.add('active');
    formLogin.classList.add('active');
});

// Hide popup, Remove class active all Elements
overlay.addEventListener('click', () => {
    popup.classList.remove('show');
    routeBtnRegister.classList.remove('active');
    routeBtnLogin.classList.remove('active');
    routeBtnForgot.classList.remove('active');
    formRegister.classList.remove('active');
    formLogin.classList.remove('active');
    formForgot.classList.remove('active');
});