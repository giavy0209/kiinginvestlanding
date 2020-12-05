const kifAPI = axios.create({
    baseURL: 'http://178.128.60.247:3000'
});

let registerBtn = document.querySelector('#register');
let loginBtn = document.querySelector('#login');

let routeBtnRegister = document.querySelector('.route-popup__register');
let routeBtnLogin = document.querySelector('.route-popup__login');
let routeBtnForgot = document.querySelector('.route-popup__forgot');

let formRegister = document.querySelector('.form-register');
let formLogin = document.querySelector('.form-login');
let formForgot = document.querySelector('.form-forgot');
let formAuthentication = document.querySelector('.form-authentication');

let popup = document.querySelector('#popup');
let overlay = document.querySelector('#overlay');
let closeIcon = document.querySelector('.close-icon');

let routeButtons = document.querySelectorAll('.route-popup__button');
let containerForm = document.querySelector('.container-popup__right');
let containerRouteButtons = document.querySelector('.route-popup');

let linkToLogin = document.querySelector('.link-to-login');
let linkToRegister = document.querySelector('.link-to-register');
let linkToForgot = document.querySelector('.link-to-forgot');

let RegisterFormError = [];
let RegisterForm = document.querySelector('form[name="form-register"]');
let RegisterFormLastname = RegisterForm.querySelector('#lastname');
let RegisterFormFirstname = RegisterForm.querySelector('#firstname');
let RegisterFormEmail = RegisterForm.querySelector('#email');
let RegisterFormPassword1 = RegisterForm.querySelector('#password1');
let RegisterFormPassword2 = RegisterForm.querySelector('#password2');
let RegisterFormConsent = RegisterForm.querySelector('#consent');
let getRegcodeByEmail = RegisterForm.querySelector('.get-regcode-by-email');
let RegisterFormSubmitButton = RegisterForm.querySelector('button[type="submit"]');

let LoginFormError = [];
let LoginForm = document.querySelector('form[name="form-login"]');
let LoginFormEmail = LoginForm.querySelector('#emailLogin');
let LoginFormPassword = LoginForm.querySelector('#passwordLogin');
let LoginFormRemember = LoginForm.querySelector('#rememberLogin');
let LoginFormSubmitButton = LoginForm.querySelector('button[type="submit"]');

let AuthenticationFormError = [];
let AuthenticationForm = document.querySelector('form[name="form-authentication"]');
let AuthenticationFormCode = AuthenticationForm.querySelector('#authentication-code');
let AuthenticationFormSubmitButton = AuthenticationForm.querySelector('button[type="submit"]');











// Begin Handle Register Form

function checkValidRegisterFormEmail() {
    let isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(RegisterForm.elements['email'].value);

    if (!isValid) {
        let errMes = RegisterFormEmail.parentElement.querySelector('.error-message');
        if (errMes) return;

        let p = document.createElement('p');
        p.classList.add('error-message');

        let img = document.createElement('img');
        img.src = './images/popup/exclamation.svg';
        img.alt = 'icon';

        let span = document.createElement('span');
        span.innerText = 'Địa chỉ email không hợp lệ';

        p.appendChild(img);
        p.appendChild(span);

        RegisterFormEmail.parentElement.appendChild(p);
        RegisterFormError.push('error');
    } else {
        let errMes = RegisterFormEmail.parentElement.querySelector('.error-message');
        if (!errMes) return;

        RegisterFormEmail.parentElement.removeChild(errMes);
        RegisterFormError.pop();
    }

    if (isValid) {
        getRegcodeByEmail.style.cursor = 'pointer';
        getRegcodeByEmail.style.opacity = '1';
        getRegcodeByEmail.disabled = false;
    } else {
        getRegcodeByEmail.style.cursor = 'not-allowed';
        getRegcodeByEmail.style.opacity = '.3';
        getRegcodeByEmail.disabled = true;
    }
}

function checkValidRegisterFormPassword1() {
    let isValid = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/.test(RegisterForm.elements['password1'].value);

    if (!isValid) {
        let errMes = RegisterFormPassword1.parentElement.querySelector('.error-message');
        if (errMes) return;

        let p = document.createElement('p');
        p.classList.add('error-message');

        let img = document.createElement('img');
        img.src = './images/popup/exclamation.svg';
        img.alt = 'icon';

        let span = document.createElement('span');
        span.innerText = 'Mật khẩu yêu cầu tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt';

        p.appendChild(img);
        p.appendChild(span);

        RegisterFormPassword1.parentElement.appendChild(p);
        RegisterFormError.push('error');
    } else {
        let errMes = RegisterFormPassword1.parentElement.querySelector('.error-message');
        if (!errMes) return;

        RegisterFormPassword1.parentElement.removeChild(errMes);
        RegisterFormError.pop();
    }
}

function checkValidRegisterFormPassword2() {
    let isValid = RegisterForm.elements['password1'].value === RegisterForm.elements['password2'].value;

    if (!isValid) {
        let errMes = RegisterFormPassword2.parentElement.querySelector('.error-message');
        if (errMes) return;

        let p = document.createElement('p');
        p.classList.add('error-message');

        let img = document.createElement('img');
        img.src = './images/popup/exclamation.svg';
        img.alt = 'icon';

        let span = document.createElement('span');
        span.innerText = 'Mật khẩu không trùng khớp';

        p.appendChild(img);
        p.appendChild(span);

        RegisterFormPassword2.parentElement.appendChild(p);
        RegisterFormError.push('error');
    } else {
        let errMes = RegisterFormPassword2.parentElement.querySelector('.error-message');
        if (!errMes) return;

        RegisterFormPassword2.parentElement.removeChild(errMes);
        RegisterFormError.pop();
    }
}

function checkValidRegisterForm() {
    let isValid = RegisterFormError.length === 0 && RegisterForm.elements['consent'].checked;

    if (isValid) {
        RegisterFormSubmitButton.style.cursor = 'pointer';
        RegisterFormSubmitButton.style.opacity = '1';
        RegisterFormSubmitButton.disabled = false;
    } else {
        RegisterFormSubmitButton.style.cursor = 'not-allowed';
        RegisterFormSubmitButton.style.opacity = '.3';
        RegisterFormSubmitButton.disabled = true;
    }
}

getRegcodeByEmail.addEventListener('click', () => {
    kifAPI.post('/create-register-code', { email: RegisterForm.elements['email'].value })
    .then(function (response) {
        if (response.data.status) {
            let message = RegisterForm.previousElementSibling.querySelector('.message');
            if (message) {
                RegisterForm.previousElementSibling.removeChild(message);
            }

            let p = document.createElement('p');
            p.classList.add('success-message');
            p.classList.add('message');

            let img = document.createElement('img');
            img.src = './images/popup/check.svg';
            img.alt = 'icon';

            let span = document.createElement('span');
            span.innerText = 'Lấy mã thành công! Vui lòng kiểm tra email!';

            p.appendChild(img);
            p.appendChild(span);

            RegisterForm.previousElementSibling.appendChild(p);
        } else {
            let message = RegisterForm.previousElementSibling.querySelector('.message');
            if (message) {
                RegisterForm.previousElementSibling.removeChild(message);
            }

            let p = document.createElement('p');
            p.classList.add('error-message');
            p.classList.add('message');

            let img = document.createElement('img');
            img.src = './images/popup/exclamation.svg';
            img.alt = 'icon';

            let span = document.createElement('span');
            span.innerText = 'Lấy mã thất bại! Vui lòng thử lại!';

            p.appendChild(img);
            p.appendChild(span);

            RegisterForm.previousElementSibling.appendChild(p);
        }
    })
});

RegisterFormPassword1.addEventListener('keyup', () => {
    checkValidRegisterFormPassword1();
    checkValidRegisterFormPassword2();
    checkValidRegisterForm();
});

RegisterFormPassword2.addEventListener('keyup', () => {
    checkValidRegisterFormPassword2();
    checkValidRegisterForm();
});

RegisterFormEmail.addEventListener('keyup', () => {
    checkValidRegisterFormEmail();
    checkValidRegisterForm();
});

RegisterFormConsent.addEventListener('change', () => {
    checkValidRegisterForm();
});

RegisterForm.addEventListener('submit', e => {
    e.preventDefault();

    kifAPI.post('/user', {
        email: RegisterForm.elements['email'].value,
        password: RegisterForm.elements['password1'].value,
        ref_code: RegisterForm.elements['refcode'].value,

        lastname: RegisterForm.elements['lastname'].value,
        firstname: RegisterForm.elements['firstname'].value,
        reg_code: RegisterForm.elements['regcode'].value
    })
    .then(function (response) {
        if (response.data.status) {
            let message = RegisterForm.previousElementSibling.querySelector('.message');
            if (message) {
                RegisterForm.previousElementSibling.removeChild(message);
            }

            let p = document.createElement('p');
            p.classList.add('success-message');
            p.classList.add('message');

            let img = document.createElement('img');
            img.src = './images/popup/check.svg';
            img.alt = 'icon';

            let span = document.createElement('span');
            span.innerText = 'Đăng ký thành công!';

            p.appendChild(img);
            p.appendChild(span);

            RegisterForm.previousElementSibling.appendChild(p);
            RegisterForm.reset();
            checkValidRegisterForm();
        } else {
            let message = RegisterForm.previousElementSibling.querySelector('.message');
            if (message) {
                RegisterForm.previousElementSibling.removeChild(message);
            }

            let p = document.createElement('p');
            p.classList.add('error-message');
            p.classList.add('message');

            let img = document.createElement('img');
            img.src = './images/popup/exclamation.svg';
            img.alt = 'icon';

            let span = document.createElement('span');
            span.innerText = 'Đăng ký thất bại! Vui lòng thử lại!';

            p.appendChild(img);
            p.appendChild(span);

            RegisterForm.previousElementSibling.appendChild(p);
        }
    });
});

// End Handle Register Form



// Begin Handle Login Form

function checkValidLoginFormEmail() {
    let isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(LoginForm.elements['emailLogin'].value);

    if (!isValid) {
        let errMes = LoginFormEmail.parentElement.querySelector('.error-message');
        if (errMes) return;

        let p = document.createElement('p');
        p.classList.add('error-message');

        let img = document.createElement('img');
        img.src = './images/popup/exclamation.svg';
        img.alt = 'icon';

        let span = document.createElement('span');
        span.innerText = 'Địa chỉ email không hợp lệ';

        p.appendChild(img);
        p.appendChild(span);

        LoginFormEmail.parentElement.appendChild(p);
        LoginFormError.push('error');
    } else {
        let errMes = LoginFormEmail.parentElement.querySelector('.error-message');
        if (!errMes) return;

        LoginFormEmail.parentElement.removeChild(errMes);
        LoginFormError.pop();
    }
}

function checkValidLoginForm() {
    let isValid =
        LoginFormError.length === 0 &&
        LoginForm.elements['emailLogin'].value !== '' &&
        LoginForm.elements['passwordLogin'].value !== '';

    if (isValid) {
        LoginFormSubmitButton.style.cursor = 'pointer';
        LoginFormSubmitButton.style.opacity = '1';
        LoginFormSubmitButton.disabled = false;
    } else {
        LoginFormSubmitButton.style.cursor = 'not-allowed';
        LoginFormSubmitButton.style.opacity = '.3';
        LoginFormSubmitButton.disabled = true;
    }
}

// Invork when page load to pass value into input
(function checkLocalStorage() {
    let emailLogin = localStorage.getItem('emailLogin');
    let passwordLogin = localStorage.getItem('passwordLogin');
    if (emailLogin && passwordLogin) {
        LoginForm.elements['emailLogin'].value = emailLogin;
        LoginForm.elements['passwordLogin'].value = passwordLogin;
    }
    checkValidLoginForm();
})();

LoginFormEmail.addEventListener('keyup', () => {
    checkValidLoginFormEmail();
    checkValidLoginForm();
});

LoginFormPassword.addEventListener('keyup', () => {
    checkValidLoginForm();
});

LoginForm.addEventListener('submit', e => {
    e.preventDefault();

    let isRemember = LoginForm.elements['rememberLogin'].checked;
    if (isRemember) {
        localStorage.setItem('emailLogin', LoginForm.elements['emailLogin'].value);
        localStorage.setItem('passwordLogin', LoginForm.elements['passwordLogin'].value);
    } else {
        if (localStorage.getItem('emailLogin')) localStorage.removeItem('emailLogin');
        if (localStorage.getItem('passwordLogin')) localStorage.removeItem('passwordLogin');
    }

    kifAPI.post('/login_kif', {
        email: LoginForm.elements['emailLogin'].value,
        password: LoginForm.elements['passwordLogin'].value
    })
    .then(function (response) {
        if (response.data.status === 3) {
            containerForm.querySelector('[class*="active"]').classList.remove('active');
            formAuthentication.classList.add('active');
        }

        if (response.data.status === 1) {
            let message = LoginForm.previousElementSibling.querySelector('.message');
            if (message) {
                LoginForm.previousElementSibling.removeChild(message);
            }

            let p = document.createElement('p');
            p.classList.add('success-message');
            p.classList.add('message');

            let img = document.createElement('img');
            img.src = './images/popup/check.svg';
            img.alt = 'icon';

            let span = document.createElement('span');
            span.innerText = 'Đăng nhập thành công, sẽ chuyển sang trang Dashboard nhưng chưa có nên chưa chuyển được!';

            p.appendChild(img);
            p.appendChild(span);

            LoginForm.previousElementSibling.appendChild(p);
        }

        if (response.data.status === 0) {

            if (response.data.error.message === 'Password not match') {
                let message = LoginForm.previousElementSibling.querySelector('.message');
                if (message) {
                    LoginForm.previousElementSibling.removeChild(message);
                }

                let p = document.createElement('p');
                p.classList.add('error-message');
                p.classList.add('message');

                let img = document.createElement('img');
                img.src = './images/popup/exclamation.svg';
                img.alt = 'icon';

                let span = document.createElement('span');
                span.innerText = 'Mật khẩu không đúng! Vui lòng nhập lại!';

                p.appendChild(img);
                p.appendChild(span);

                LoginForm.previousElementSibling.appendChild(p);
            }

            if (response.data.error.message === 'Email not exist!') {
                let message = LoginForm.previousElementSibling.querySelector('.message');
                if (message) {
                    LoginForm.previousElementSibling.removeChild(message);
                }

                let p = document.createElement('p');
                p.classList.add('error-message');
                p.classList.add('message');

                let img = document.createElement('img');
                img.src = './images/popup/exclamation.svg';
                img.alt = 'icon';

                let span = document.createElement('span');
                span.innerText = 'Email không tồn tại! Vui lòng nhập lại!';

                p.appendChild(img);
                p.appendChild(span);

                LoginForm.previousElementSibling.appendChild(p);
            }
        }
    })
});

// End Handle Login Form



// Begin Handle Authentication Form

function checkValidAuthenticationForm() {
    let isValid =
        AuthenticationFormError.length === 0 &&
        AuthenticationFormCode !== '';

    if (isValid) {
        AuthenticationFormSubmitButton.style.cursor = 'pointer';
        AuthenticationFormSubmitButton.style.opacity = '1';
        AuthenticationFormSubmitButton.disabled = false;
    } else {
        AuthenticationFormSubmitButton.style.cursor = 'not-allowed';
        AuthenticationFormSubmitButton.style.opacity = '.3';
        AuthenticationFormSubmitButton.disabled = true;
    }
}

AuthenticationFormCode.addEventListener('keyup', () => {
    checkValidAuthenticationForm();
});

AuthenticationForm.addEventListener('submit', e => {
    e.preventDefault();

    kifAPI.post('/login_kif', {
        email: LoginForm.elements['emailLogin'].value,
        password: LoginForm.elements['passwordLogin'].value,
        code_2fa: AuthenticationForm.elements['authentication-code'].value
    })
    .then(function (response) {
        if (response.data.status === 1) {
            let message = AuthenticationForm.previousElementSibling.querySelector('.message');
            if (message) {
                AuthenticationForm.previousElementSibling.removeChild(message);
            }

            let p = document.createElement('p');
            p.classList.add('success-message');
            p.classList.add('message');

            let img = document.createElement('img');
            img.src = './images/popup/check.svg';
            img.alt = 'icon';

            let span = document.createElement('span');
            span.innerText = 'Đăng nhập thành công, sẽ chuyển sang trang Dashboard nhưng chưa có nên chưa chuyển được!';

            p.appendChild(img);
            p.appendChild(span);

            AuthenticationForm.previousElementSibling.appendChild(p);
        }

        if (response.data.status === 4) {
            let message = AuthenticationForm.previousElementSibling.querySelector('.message');
            if (message) {
                AuthenticationForm.previousElementSibling.removeChild(message);
            }

            let p = document.createElement('p');
            p.classList.add('error-message');
            p.classList.add('message');

            let img = document.createElement('img');
            img.src = './images/popup/exclamation.svg';
            img.alt = 'icon';

            let span = document.createElement('span');
            span.innerText = 'Mã xác minh không đúng! Vui lòng nhập lại!';

            p.appendChild(img);
            p.appendChild(span);

            AuthenticationForm.previousElementSibling.appendChild(p);
        }
    })
});

// End Handle Authentication Form















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

// Add Event for Link to Login
linkToLogin.addEventListener('click', () => {
    containerRouteButtons.querySelector('[class*="active"]').classList.remove('active');
    routeBtnLogin.classList.add('active');
    containerForm.querySelector('[class*="active"]').classList.remove('active');
    formLogin.classList.add('active');
});

// Add Event for Link to Register
linkToRegister.addEventListener('click', () => {
    containerRouteButtons.querySelector('[class*="active"]').classList.remove('active');
    routeBtnRegister.classList.add('active');
    containerForm.querySelector('[class*="active"]').classList.remove('active');
    formRegister.classList.add('active');
});

// Add Event for Link to Forgot
linkToForgot.addEventListener('click', () => {
    containerRouteButtons.querySelector('[class*="active"]').classList.remove('active');
    routeBtnForgot.classList.add('active');
    containerForm.querySelector('[class*="active"]').classList.remove('active');
    formForgot.classList.add('active');
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
function hidePopup() {
    popup.classList.remove('show');
    routeBtnRegister.classList.remove('active');
    routeBtnLogin.classList.remove('active');
    routeBtnForgot.classList.remove('active');
    formRegister.classList.remove('active');
    formLogin.classList.remove('active');
    formForgot.classList.remove('active');
}
overlay.addEventListener('click', hidePopup);
closeIcon.addEventListener('click', hidePopup);